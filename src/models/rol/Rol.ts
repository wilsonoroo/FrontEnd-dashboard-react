import VakuModel from "../Vaku";
import { Permiso } from "../permisos/Permiso";

export class Rol extends VakuModel {
  getValidationSchema() {
    throw new Error("Method not implemented.");
  }
  getFormBuilder(options?: any) {
    throw new Error("Method not implemented.", options);
  }
  getEmptyObject() {
    throw new Error("Method not implemented.");
  }
  displayName: string;
  permisos: Permiso[];

  get value(): string {
    return this.id;
  }
  get label(): string {
    return this.displayName;
  }
}
