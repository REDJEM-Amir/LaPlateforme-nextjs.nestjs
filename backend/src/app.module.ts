import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { AccountController } from './controller/account.controller';
import { StatsController } from './controller/stats.controller';

import { AccountService } from './service/account.service';
import { StatsService } from './service/stats.service';

import { Account } from './entities/account.entity';
import { Stats } from './entities/stats.entity';
import { Difficulty } from './entities/difficulty.entity';
import { DifficultyController } from './controller/difficulty.controller';
import { DifficultyService } from './service/difficulty.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        Account,
        Stats,
        Difficulty
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([Stats]),
    TypeOrmModule.forFeature([Difficulty]),
  ],
  controllers: [
    AccountController,
    StatsController,
    DifficultyController,
  ],
  providers: [
    AccountService,
    StatsService,
    DifficultyService,
  ],
})
export class AppModule {}