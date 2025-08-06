import { Injectable, NotFoundException } from '@nestjs/common';
import { createMusicsDTO } from './DTO/createMusics.dto';
import { UpdateMusicsDTO } from './DTO/updateMusics.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class MusicsService {
  constructor(
    private readonly supabaseService: SupabaseService

  ) {}

  async findAll() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('musics')
      .select('*');

    if (error) throw error;
    return data;
    
  }

  async create(dto: createMusicsDTO) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('musics')
      .insert([dto]);

    if (error) throw error;
    return data;
    
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService
    .getClient()
    .from('musics')
    .select('*')
    .eq('id', id)
    .single(); // 

  if (error) throw error;
  return data;
  }

  async deleteMusics(id: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('musics')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return data;
  }

  async update(id: string, dto:UpdateMusicsDTO) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('musics')
      .update(dto)
      .eq('id', id);

    if (error) throw error;
    return data;
    
    
  }
}
