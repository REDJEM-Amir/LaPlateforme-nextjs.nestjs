import { Controller, Get, Req, UseGuards, HttpStatus, Body, Post } from '@nestjs/common';
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
  @Post('api/stats/modifyStats')
  async modifyStats(@Body() body: Record<string, any>, @Req() req) {
    const { basePoints, isWin } = body;
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
      return this.statsService.modifyStats(email, basePoints, isWin);
    }
  }
}