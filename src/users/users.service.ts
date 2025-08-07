import { Injectable } from '@nestjs/common';

import { RegisterDTO } from './DTOs/Register.dto';
import * as bcrypt from 'bcrypt';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class UsersService {
  constructor( private readonly firebaseService: FirebaseService) {}

async Register(registerDTO: RegisterDTO) {
  const db = this.firebaseService.getFireStore();

  const hashedPassword = await bcrypt.hash(registerDTO.password, 10);

  const userRef = db.collection('users').doc();
  await userRef.set({
    ...registerDTO,
    password: hashedPassword, 
  });

  return { id: userRef.id, ...registerDTO };
}


  async findByEmail(email: string): Promise<any> {
  const db = this.firebaseService.getFireStore();
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('email', '==', email).limit(1).get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
  };
}

  async findAll(){
    const db = this.firebaseService.getFireStore();
    const snapshot = await db.collection('users').get();
    return snapshot.docs.map(doc => ({id:doc.id,...doc.data()}));
  }

  async deleteUser(id: string): Promise<void> {
    const db = this.firebaseService.getFireStore();
    const userRef = db.collection('users').doc(id);
    try {
      await userRef.delete();
    } catch(error) {
      throw new Error(error.message);
    }
}
}
