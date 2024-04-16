import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/firstConnection')
  firstConnection(@Req() req) {
    const account = req.user.email;
    return this.userService.firstConnection(account);
  }
}