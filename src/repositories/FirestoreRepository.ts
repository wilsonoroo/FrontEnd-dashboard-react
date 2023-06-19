import VakuModel from "@/models/Vaku";
import { firestoreDB as db } from "@/services/config"; // Asume que tienes la inicialización de firebase en este archivo
import { instanceToPlain } from "class-transformer";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import removeUndefinedObjects from "remove-undefined-objects";
import { IRepository } from "./IRepository";

export class FirestoreRepository<T extends VakuModel>
  implements IRepository<T>
{
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

    return snapshot.docs.map((doc) => {
      const value = doc.data() as T;
      value.id = doc.id;
      return value;
    });
  }
  async getAllObject(factory: new () => T): Promise<T[]> {
    const collectionRef = collection(db, this.collectionPath);
    const snapshot = await getDocs(collectionRef);
    const values: T[] = [];

    snapshot.forEach((doc) => {
      const value = new factory();
      value.id = doc.id;
      Object.assign(value, doc.data());
      values.push(value);
    });

    return values;
  }

  async add(id: string, item: T): Promise<void> {
    console.log(id);
    console.log(item);
    if (id === null) {
      const collectionRef = collection(db, this.collectionPath);
      await addDoc(
        collectionRef,
        removeUndefinedObjects(instanceToPlain(item))
      );
    } else {
      const docRef = doc(db, this.collectionPath, id);
      console.log(
        "🚀 ~ file: FirestoreRepository.ts:62 ~ add ~ docRef:",
        docRef
      );

      console.log(removeUndefinedObjects(instanceToPlain(item)));
      await setDoc(docRef, removeUndefinedObjects(instanceToPlain(item)));
    }
  }

  async update(id: string, item: T): Promise<void> {
    const docRef = doc(db, this.collectionPath, id);
    await setDoc(docRef, removeUndefinedObjects(instanceToPlain(item)));
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionPath, id);
    await deleteDoc(docRef);
  }
}
