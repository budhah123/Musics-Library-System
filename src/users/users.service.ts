import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { RegisterDTO } from './DTOs/Register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async Register(registerDTO: RegisterDTO){
    const hashed = await bcrypt.hash(registerDTO.password, 10);
    const { data, error } = await this.supabaseService.getClient()
      .from('Users')
      .insert([{ ...registerDTO, password: hashed }])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async findByEmail(email: string){
    const { data, error } = await this.supabaseService.getClient()
      .from('Users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
      throw new Error(error.message);
    }
    return data;
  }

  async findAll(): Promise<any[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('Users')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async deleteUser(id: string): Promise<void> {
    const { error } = await this.supabaseService.getClient()
      .from('Users')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }
}
