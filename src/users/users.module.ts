import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
   imports: [SupabaseModule, FirebaseModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
