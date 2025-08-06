import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { createMusicsDTO } from './DTO/createMusics.dto';
import { MusicsService } from './musics.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateMusicsDTO } from './DTO/updateMusics.dto';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @UseGuards(JwtGuard)
  @Post('')
  async createMusics(@Body() dto: createMusicsDTO) {
    return this.musicsService.create(dto);
  }

  // @UseGuards(JwtGuard)
  @Get('')
  async getAllMusics() {
    return await this.musicsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.musicsService.deleteMusics(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMusicsDTO) {
    return this.musicsService.update(id, dto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.musicsService.findOne(id);
  }
}
