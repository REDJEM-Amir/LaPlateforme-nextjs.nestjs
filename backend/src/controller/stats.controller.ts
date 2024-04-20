import { Controller, Get, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { StatsService } from '../service/stats.service';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';

@Controller()
export class StatsController {
  constructor(private readonly statsService: StatsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/stats/findAllStatsByPlayer')
  findAllStatsByPlayer(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
        return this.statsService.findAllStatsByPlayer(email);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/stats/findStats')
  findStats(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
        return this.statsService.findStats();
    }
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('api/stats/addPoints')
  addPoints(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
        return this.statsService.addPoints(email);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/stats/removePoints')
  removePoints(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
        return this.statsService.removePoints(email);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/stats/incrementWins')
  incrementWins(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
        return this.statsService.incrementWins(email);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/stats/incrementLosses')
  incrementLosses(@Req() req) {
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
        return this.statsService.incrementLosses(email);
    }
  }
}