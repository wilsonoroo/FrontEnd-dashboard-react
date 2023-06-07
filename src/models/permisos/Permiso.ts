import VakuModel from "../Vaku";

export class Permiso extends VakuModel {
  codigo: string;

  getValidationSchema() {
    throw new Error("Method not implemented.");
  }
  getFormBuilder(options?: any) {
    throw new Error("Method not implemented.", options);
  }
  getEmptyObject() {
    throw new Error("Method not implemented.");
  }

  get value(): string {
    return this.codigo;
  }
  get label(): string {
    return this.displayName;
  }
}
