import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async signUp(email: string, username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = this.usersRepository.create({ email, username, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  async signIn(email: string, password: string): Promise<{ email: string, username: string }> {
    const user = await this.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    return { email: user.email, username: user.username };
  }
}