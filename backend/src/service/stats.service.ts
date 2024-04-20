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

  async findStats(): Promise<any[]> {
    return this.statsRepository
      .createQueryBuilder("stats")
      .leftJoinAndSelect("stats.account", "account")
      .select(["account.username", "stats.score", "stats.difficulty"])
      .getMany();
  }

  async addPoints(email: string, basePoints: number = 55) {
    const stats = await this.statsRepository.findOne({ where: { account: { email } } });
    if (stats) {
      const pointsToAdd = this.calculatePoints(basePoints, stats.difficulty, true);
      stats.score += pointsToAdd;
      this.updateDifficulty(stats);
      await this.statsRepository.save(stats);
    }
  }

  async removePoints(email: string, basePoints: number = 75) {
    const stats = await this.statsRepository.findOne({ where: { account: { email } } });
    if (stats) {
      const pointsToRemove = this.calculatePoints(basePoints, stats.difficulty, false);
      stats.score = Math.max(0, stats.score - pointsToRemove);
      this.updateDifficulty(stats);
      await this.statsRepository.save(stats);
    }
  }

  async updateDifficulty(stats: Stats) {
    const difficulties = await this.difficultyRepository.find({ order: { score: 'ASC' } });
    const currentDifficulty = difficulties.find(difficulty => stats.score >= difficulty.score);
    if (currentDifficulty && stats.difficulty !== currentDifficulty.difficultyName) {
      stats.difficulty = currentDifficulty.difficultyName;
    }
  }

  async incrementWins(email: string) {
    const stats = await this.statsRepository.findOne({ where: { account: { email } } });
    if (stats) {
      stats.wins += 1;
      await this.statsRepository.save(stats);
    }
  }

  async incrementLosses(email: string) {
    const stats = await this.statsRepository.findOne({ where: { account: { email } } });
    if (stats) {
      stats.losses += 1;
      await this.statsRepository.save(stats);
    }
  }

  calculatePoints(basePoints: number, difficulty: string, isAdding: boolean): number {
    let factor = 1;
    switch (difficulty) {
      case 'Novice':
        factor = 1.0;
        break;
      case 'Lexicographe':
        factor = 1.2;
        break;
      case 'Maître des Mots':
        factor = 1.5;
        break;
      case 'Virtuose du Vocabulaire':
        factor = 2.0;
        break;
      default:
        factor = 1.0;
    }
    if (!isAdding) {
      factor *= 1.5;
    }
    return Math.round(basePoints * factor);
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
      let account = await this.accountRepository.findOne({
        where: { username: data.username }
      });

      if (!account) {
        account = this.accountRepository.create({ username: data.username, email: `${data.username}@example.com` });
        await this.accountRepository.save(account);
      }

      let stats = await this.statsRepository.findOne({
        where: { account: account }
      });

      if (stats) {
        stats.score = data.score;
        stats.wins = data.wins;
        stats.losses = data.losses;
        stats.difficulty = data.difficulty;
      } else {
        stats = this.statsRepository.create({
          account: account,
          score: data.score,
          wins: data.wins,
          losses: data.losses,
          difficulty: data.difficulty
        });
      }

      await this.statsRepository.save(stats);
    }
  }
}
