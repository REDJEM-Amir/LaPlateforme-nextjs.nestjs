import { Body, Controller, Get, Post, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { StatsService } from '../service/stats.service';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';

@Controller('api/stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('/findStats')
  findStats(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
        return this.statsService.findStats();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/addPoints')
  addPoints(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
        return this.statsService.addPoints(email);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/removePoints')
  removePoints(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
        return this.statsService.removePoints(email);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/incrementWins')
  incrementWins(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
        return this.statsService.incrementWins(email);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/incrementLosses')
  incrementLosses(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
        return this.statsService.incrementLosses(email);
    }
  }
}