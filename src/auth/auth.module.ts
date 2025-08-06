import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './Strategies/local-strategy';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/Users.entity';
import { JwtStrategy } from './Strategies/jwt-strategy';
import { SupabaseModule } from 'src/supabase/supabase.module';
@Module({
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    SupabaseModule,
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: {
        expiresIn: '3600s',
      },
    }),
  ],
})
export class AuthModule {}
