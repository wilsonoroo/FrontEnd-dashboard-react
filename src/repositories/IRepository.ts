export interface IRepository<T> {
  get(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  add(id: string | null, item: T): Promise<void>;
  update(id: string, item: T): Promise<void>;
  delete(id: string): Promise<void>;
}
