import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stats } from 'src/entities/stats.entity';
import { Difficulty } from 'src/entities/difficulty.entity';
import { Account } from 'src/entities/account.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stats)
    private statsRepository: Repository<Stats>,
    @InjectRepository(Difficulty)
    private difficultyRepository: Repository<Difficulty>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>
  ) { }

  async findAllStatsByPlayer(email: string): Promise<any[]> {
    return this.statsRepository
      .createQueryBuilder("stats")
      .leftJoinAndSelect("stats.account", "account")
      .where("account.email = :email", { email })
      .select([
        "stats.id",
        "stats.score",
        "stats.wins",
        "stats.losses",
        "stats.difficulty",
        "account.username"
      ])
      .getMany();
  }

  async findStats(): Promise<any[]> {
    return this.statsRepository
      .createQueryBuilder("stats")
      .leftJoinAndSelect("stats.account", "account")
      .select(["account.username", "stats.score", "stats.difficulty"])
      .orderBy("stats.score", "DESC")
      .getMany();
  }

  async modifyStats(email: string, basePoints: number, isWin: boolean) {
    const stats = await this.statsRepository.findOne({ where: { account: { email } } });
    if (stats) {
      const factor = this.calculateFactor(stats.difficulty, isWin);
      const pointsChange = Math.round(basePoints * factor);
      stats.score += isWin ? pointsChange : -Math.min(stats.score, pointsChange);
      stats.wins += isWin ? 1 : 0;
      stats.losses += isWin ? 0 : 1;
      this.updateDifficulty(stats);
      await this.statsRepository.save(stats);
    }
  }

  calculateFactor(difficulty: string, isWin: boolean): number {
    const factors = {
      'Novice': 1.0,
      'Lexicographe': 1.2,
      'Maître des Mots': 1.5,
      'Virtuose du Vocabulaire': 2.0
    };
    let factor = factors[difficulty] || 1.0;
    if (!isWin) {
      factor *= 1.5;
    }
    return factor;
  }

  async updateDifficulty(stats: Stats) {
    const difficulties = await this.difficultyRepository.find({ order: { score: 'ASC' } });
    const currentDifficulty = difficulties.find(difficulty => stats.score >= difficulty.score);
    if (currentDifficulty && stats.difficulty !== currentDifficulty.difficultyName) {
      stats.difficulty = currentDifficulty.difficultyName;
    }
  }

  async seed() {
    const statsData = [
      { username: 'Desmond', score: 4260, wins: 100, losses: 30, difficulty: 'Maître des Mots' },
      { username: 'Rossetti', score: 200, wins: 54, losses: 88, difficulty: 'Novice' },
      { username: 'Twigg', score: 975, wins: 120, losses: 40, difficulty: 'Lexicographe' },
      { username: 'Elwell', score: 5890, wins: 300, losses: 160, difficulty: 'Maître des Mots' },
      { username: 'Tijerina', score: 1290, wins: 180, losses: 100, difficulty: 'Lexicographe' },
      { username: 'Congdon', score: 60, wins: 3, losses: 3, difficulty: 'Novice' },
    ];

    for (const data of statsData) {
      let account = await this.accountRepository.findOne({ where: { username: data.username } });
      if (!account) {
        account = this.accountRepository.create({ username: data.username, email: `${data.username}@example.com` });
        await this.accountRepository.save(account);
      }

      let stats = await this.statsRepository.findOne({ where: { account: account } });
      if (!stats) {
        stats = this.statsRepository.create({
          account: account,
          score: data.score,
          wins: data.wins,
          losses: data.losses,
          difficulty: data.difficulty
        });
      } else {
        stats.score = data.score;
        stats.wins = data.wins;
        stats.losses = data.losses;
        stats.difficulty = data.difficulty;
      }
      await this.statsRepository.save(stats);
    }
  }
}
