import { IsOptional, IsString } from 'class-validator';

export class UpdateMusicsDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  artist?: string;

  @IsOptional()
  @IsString()
  genre?: string;
}
