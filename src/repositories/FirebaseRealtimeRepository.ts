import VakuModel from "@/models/Vaku";
import { database } from "@/services/config";
import { DataSnapshot, get, Query, ref, set } from "firebase/database";
import { v4 as uuid } from "uuid";
import { IRepository } from "./IRepository";

export class FirebaseRealtimeRepository<T extends VakuModel>
  implements IRepository<T>
{
  private query: Query;
  path: string;

  constructor(private databaseRef: string) {
    this.path = databaseRef;
    this.query = ref(database, this.databaseRef);
  }

  private getDataReference(path: string) {
    return ref(database, `${this.path}/${path}`);
  }

  async getAll(): Promise<T[]> {
    const snapshot = await get(this.query);
    const values: T[] = [];
    snapshot.forEach((child: DataSnapshot) => {
      values.push(child.val() as T);
    });
    return values;
  }

  async get(id: string): Promise<T | null> {
    const snapshot = await get(this.getDataReference(id));
    return snapshot.exists() ? (snapshot.val() as T) : null;
  }

  async add(id: string | null, item: T): Promise<void> {
    if (id === null) {
      const idNotNull = uuid();

      const aud = { ...item, id: idNotNull };

      console.log(
        "🚀 ~ file: FirebaseRealtimeRepository.ts:41 ~ add ~ aud:",
        aud
      );
      await set(this.getDataReference(idNotNull), { ...item, id: idNotNull });
    } else {
      await set(this.getDataReference(id), item);
    }
  }

  async update(id: string, item: T): Promise<void> {
    await set(this.getDataReference(id), item);
  }

  async delete(id: string): Promise<void> {
    await set(this.getDataReference(id), null);
  }
}
