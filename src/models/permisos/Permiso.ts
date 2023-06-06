import VakuModel from "../Vaku";

export class Permiso extends VakuModel {
  getValidationSchema() {
    throw new Error("Method not implemented.");
  }
  getFormBuilder(options?: any) {
    throw new Error("Method not implemented.", options);
  }
  getEmptyObject() {
    throw new Error("Method not implemented.");
  }
  codigo: string;
  displayName: string;

  get value(): string {
    return this.codigo;
  }
  get label(): string {
    return this.displayName;
  }
}
