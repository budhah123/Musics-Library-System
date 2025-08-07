import { Injectable } from '@nestjs/common';

import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService {
  private firebaseapp: admin.app.App;

  constructor() {
    const serviceAccountPath = path.resolve(__dirname,"../../config/musics-system-firebase-adminsdk-fbsvc-9e3366db51.json");

    this.firebaseapp = admin.initializeApp({
      credential: admin.credential.cert(require(serviceAccountPath)),
      databaseURL : 'https://musics-system-default-rtdb.firebaseio.com/',
    });
  }
  getFireStore() {
    return admin.firestore(this.firebaseapp);
  
  }
  getRealtimeDB() {
    return admin.database(this.firebaseapp);
  }

}
