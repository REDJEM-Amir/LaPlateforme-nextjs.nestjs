import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { Users } from './entities/users.entity';
import { WallOfFame } from './entities/wall_of_fame.entity';
import { Mots } from './entities/mots.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        Users,
        WallOfFame,
        Mots
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([WallOfFame]),
    TypeOrmModule.forFeature([Mots]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}