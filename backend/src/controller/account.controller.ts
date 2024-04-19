import { Body, Controller, Get, Post, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';

@Controller('api/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('/signup')
  initializeUsername(@Body() body: Record<string, any>, @Req() req) {
    const { username } = body;
    const email = req.user.email;
    if (email === undefined || email === null) {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
    } else {
      return this.accountService.initializeUsername(email, username);
    }
  }
}