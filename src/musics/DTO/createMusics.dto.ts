import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Column } from 'typeorm';

export class createMusicsDTO {
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(1, 100)
  artist: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  genre?: string;

  @IsString()
  url: string;
}
