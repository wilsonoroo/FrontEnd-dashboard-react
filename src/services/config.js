
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import { getAdmin } from "firebase-admin";


/* import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import 'firebase/storage';
import 'firebase/database'; */

console.log(import.meta.env.VITE_FIREBASE_API_KEY)
const app = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY, //"AIzaSyBKvNIQKpOThmINmnSROq6xiR8k0rkwTuo",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,//"vaku-dev.firebaseapp.com",
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,//"https://vaku-dev-default-rtdb.firebaseio.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,//"vaku-dev",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,//"vaku-dev.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,//"539106730769",
    appId: import.meta.env.VITE_FIREBASE_APP_ID// "1:539106730769:web:68b82567c0b5e2140862b0"
});
export const auth = getAuth(app);


export const database = getDatabase(app);
export const storage = getStorage(app);
export const firestoreDB = getFirestore(app);
export const firebaseTimeStamp = firestoreDB.Timestamp
/*export const database = firebase.database()
export const functions = firebase.functions();
export const storage = firebase.storage();
export const firestoreTimestamp = firebase.firestore.Timestamp;
export const auth = firebase.auth(); */

export default app;