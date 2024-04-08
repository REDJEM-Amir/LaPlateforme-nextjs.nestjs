import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/api/user/signUp')
  async signup(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.signUp(email, username, password);
    const { password: _, ...result } = user;
    return result;  
  }

  @Post('/api/user/signIn')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.signIn(email, password);
  }
}