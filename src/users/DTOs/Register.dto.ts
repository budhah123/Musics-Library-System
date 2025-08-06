import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @ApiProperty({ example: 'Hemraj Budha' })
  @IsNotEmpty()
  FullName: string;

   @ApiProperty({ example: 'hemraj@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePassword123' })
  @MinLength(6)
  password: string;

}
