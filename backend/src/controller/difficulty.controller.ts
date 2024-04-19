import { Controller, Get, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';
import { DifficultyService } from 'src/service/difficulty.service';

@Controller('api/difficulty')
export class DifficultyController {
  constructor(private readonly difficultyService: DifficultyService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('/find')
  difficultySummary(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
      return this.difficultyService.difficultySummary();
    }
  }
}