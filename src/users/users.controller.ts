import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDTO } from './DTOs/Register.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(@Body() dto: RegisterDTO) {
    return await this.userService.Register(dto);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id:string) {
    await this.userService.deleteUser(id);
    return { message: `User with id ${id} deleted successfully.` };
  }
}
