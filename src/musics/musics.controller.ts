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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Musics')
@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  // @UseGuards(JwtGuard)
  @Post('')
  @ApiOperation({ summary: 'Create new music' })
  @ApiResponse({ status: 201, description: 'Music created successfully' })
  async createMusics(@Body() dto: createMusicsDTO) {
    return this.musicsService.create(dto);
  }

  @UseGuards(JwtGuard)
  @Get('')
  @ApiOperation({ summary: 'Get all musics' })
  @ApiResponse({ status: 200, description: 'List of musics returned' })
  @ApiBearerAuth()
  async getAllMusics() {
    return await this.musicsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete music by ID' })
  @ApiResponse({ status: 200, description: 'Music deleted successfully' })
  async deleteUser(@Param('id') id: string) {
    return await this.musicsService.deleteMusics(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
   @ApiBearerAuth()
  @ApiOperation({ summary: 'Update music by ID' })
  @ApiResponse({ status: 200, description: 'Music updated successfully' })
  async update(@Param('id') id: string, @Body() dto: UpdateMusicsDTO) {
    return this.musicsService.update(id, dto);
  }

  @UseGuards(JwtGuard)
   @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.musicsService.findOne(id);
  }
}
