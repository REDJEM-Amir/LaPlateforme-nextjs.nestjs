import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from 'src/entities/account.entity';
import { Stats } from 'src/entities/stats.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    @InjectRepository(Stats)
    private statsRepository: Repository<Stats>,
  ) { }

  async initializeUsername(email: string, username: string): Promise<any> {
    const searchAccount = await this.accountsRepository.findOne({ where: { email } });
    if (!searchAccount) {
      const newAccount = this.accountsRepository.create({ email, username });
      await this.accountsRepository.save(newAccount);

      const newStats = this.statsRepository.create({ account: newAccount });
      await this.statsRepository.save(newStats);
      return { status: 200, message: 'Un joueur est arrivé' };
    } else {
      return { status: 400, message: 'Compte existant' };
    }
  }
}