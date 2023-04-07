import { firebaseConfig } from 'configs/firebase.config';
import * as dotenv from 'dotenv';
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

dotenv.config();

initializeApp({
  credential: cert(firebaseConfig as ServiceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

const bucket = getStorage().bucket();

export { bucket };
