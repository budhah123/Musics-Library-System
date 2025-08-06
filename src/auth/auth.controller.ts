import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from 'src/users/DTOs/Register.dto';
import { LoginDto } from 'src/users/DTOs/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,  
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: RegisterDTO) {
    return this.userService.Register(dto);
  }
}
