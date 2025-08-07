import { Injectable, NotFoundException } from '@nestjs/common';
import { createMusicsDTO } from './DTO/createMusics.dto';
import { UpdateMusicsDTO } from './DTO/updateMusics.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class MusicsService {
  constructor(
    private readonly firebaseService: FirebaseService

  ) {}

  async findAll() {
   const db = this.firebaseService.getFireStore();
   const snapshot = await db.collection('musics').get();

   return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
   }));
    
  }

  async create(dto: createMusicsDTO) {
    const db = this.firebaseService.getFireStore();
    const docRef = db.collection('musics').doc();
    await docRef.set(dto);
    return {
      id: docRef.id,
      ...dto
    }
  }

  async findOne(id: string) {
    const db = this.firebaseService.getFireStore();
    const doc = await db.collection('musics').doc(id).get();
    if(!doc.exists) {
      throw new NotFoundException(`musics with ${id} not found`);
    }
    return {
      id: doc.id,
      ...doc.data()
    }
  }

  async deleteMusics(id: string) {
    const db = this.firebaseService.getFireStore();
    const docRef = db.collection('musics').doc(id);
    const doc = await docRef.get();
    if(!doc.exists) {
      throw new NotFoundException(`musics with ${id} not found`);
    }
    await docRef.delete();
    return {
      message: `music with ${id} deleted successfully`
    }
  }

  async update(id: string, dto:UpdateMusicsDTO) {
    const db = this.firebaseService.getFireStore();
    const docRef = db.collection('musics').doc(id);

    const doc = await docRef.get();
    if(!doc.exists) {
      throw new NotFoundException(`music with ${id} not found`);
    }
    await docRef.update(dto as any);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
    
  }
}
