import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  FullName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

}
