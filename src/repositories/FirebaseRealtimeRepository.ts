import VakuModel from "@/models/Vaku";
import { database } from "@/services/config";
import { cleanObject } from "@/utils/global";
import { DataSnapshot, get, Query, ref, set, update } from "firebase/database";
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

  async getAll(factory: new () => T): Promise<T[]> {
    const snapshot = await get(this.query);
    const values: T[] = [];

    snapshot.forEach((child: DataSnapshot) => {
      const value = new factory();

      Object.assign(value, child.val());
      values.push(value);
    });
    return values;
  }

  async getAllById(id: string, factory: new () => T): Promise<T[]> {
    console.log(this.getDataReference(id).toString());
    const snapshot = await get(this.getDataReference(id));
    const values: T[] = [];

    snapshot.forEach((child: DataSnapshot) => {
      const value = new factory();

      Object.assign(value, child.val());
      values.push(value);
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
      let cleanObj = cleanObject({ ...item, id: idNotNull });

      await set(this.getDataReference(idNotNull), cleanObj);
    } else {
      let cleanObj = cleanObject(item);
      await set(this.getDataReference(id), cleanObj);
    }
  }

  async update(id: string, item: T): Promise<void> {
    let cleanObj = cleanObject({ ...item });
    await update(this.getDataReference(id), cleanObj);
  }

  async updateObj(id: string, item: any): Promise<void> {
    let cleanObj = cleanObject({ ...item });
    await update(this.getDataReference(id), cleanObj);
  }

  async delete(id: string): Promise<void> {
    await set(this.getDataReference(id), null);
  }

  async getQuery(factory: new () => T, _query: any): Promise<T[]> {
    const snapshot = await get(this.query);
    const values: T[] = [];

    snapshot.forEach((child: DataSnapshot) => {
      const value = new factory();

      Object.assign(value, child.val());
      values.push(value);
    });
    return values;
  }
}
