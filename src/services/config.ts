import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import {
  Firestore,
  Timestamp,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

console.log(import.meta.env.VITE_FIREBASE_API_KEY);

const app: FirebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

export const auth: Auth = getAuth(app);
export const database: Database = getDatabase(app);
export const storage: FirebaseStorage = getStorage(app);
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});
export const firestoreDB: Firestore = getFirestore(app);
export const firebaseTimeStamp: typeof Timestamp = Timestamp;

export default app;
