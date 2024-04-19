import { Body, Controller, Get, Post, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';
import { DifficultyService } from 'src/service/difficulty.service';

@Controller('api/difficulty')
export class DifficultyController {
  constructor(private readonly difficultyService: DifficultyService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('/find')
  firstConnection(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
      return this.difficultyService.difficultySummary();
    }
  }
}