import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'Echoes of Silence' })
  title: string;

  @IsString()
  @Length(1, 100)
  @ApiProperty({ example: 'Aarav Gautam' })
  artist: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  @ApiProperty({ example: 'Instrumental' })
  genre?: string;

  @IsString()
  @ApiProperty({ example: 'https://example.com/image.jpeg' })
  url: string;
}
