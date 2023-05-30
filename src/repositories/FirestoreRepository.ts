import { firestoreDB as db } from "@/services/config"; // Asume que tienes la inicialización de firebase en este archivo
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { IRepository } from "./IRepository";

export class FirestoreRepository<T> implements IRepository<T> {
  autogenerateUID: boolean;
  constructor(private readonly collectionPath: string) {}

  async get(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionPath, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  }

  async getAll(): Promise<T[]> {
    const collectionRef = collection(db, this.collectionPath);
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  async add(id: string, item: T): Promise<void> {
    if (id !== null) {
      const collectionRef = collection(db, this.collectionPath);
      await addDoc(collectionRef, item);
    } else {
      const docRef = doc(db, this.collectionPath, id);
      await setDoc(docRef, item);
    }
  }

  async update(id: string, item: T): Promise<void> {
    const docRef = doc(db, this.collectionPath, id);
    await setDoc(docRef, item);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionPath, id);
    await deleteDoc(docRef);
  }
}
