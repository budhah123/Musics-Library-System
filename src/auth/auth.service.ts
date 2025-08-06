import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/Users.entity';
import { LoginDto } from 'src/users/DTOs/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid Credentials!');
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

  if (!user) {
    throw new UnauthorizedException('Invalid Credentials');
  }

  if (!dto.password || !user.password) {
    throw new UnauthorizedException('Invalid Credentials');
  }

  const isMatch = await bcrypt.compare(dto.password, user.password);

  if (!isMatch) {
    throw new UnauthorizedException('Invalid Credentials');
  }
  
    const payload = {
      email: user.email,
      sub: {
        fullName: user.FullName,
        id: user.id,
      },
    };
    return {
      
      user: {
        id: user.id,
        FullName: user.FullName,
        email: user.email,
      },
      accessTokens: this.jwtService.sign(payload)
    };
  }
}
