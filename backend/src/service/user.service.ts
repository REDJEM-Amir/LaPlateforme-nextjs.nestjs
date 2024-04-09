import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async firstConnection(email: string) {
    const searchAccount = this.usersRepository.findOne({ where: { email } });
    if (!searchAccount) {
      this.usersRepository.save({ email });
      return { status: 200, message: 'Nouvelle utilisateur ajouter en base'}
    }
  }
}