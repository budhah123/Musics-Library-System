import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://ijrlcsoxbgnmnikemioq.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqcmxjc294YmdubW5pa2VtaW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzODY1MDQsImV4cCI6MjA2OTk2MjUwNH0.8LIl1sLJp7EB3dIxY9rs9NktqdLZcOEIUfvD4FY6yx0',
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
