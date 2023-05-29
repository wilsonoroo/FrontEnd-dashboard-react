import VakuModel from "../Vaku";

export class AuthUser extends VakuModel {
  getValidationSchema() {
    throw new Error("Method not implemented.");
  }
  getFormBuilder() {
    throw new Error("Method not implemented.");
  }
  getEmptyObject() {
    throw new Error("Method not implemented.");
  }
  email: string;
  empresaId: string;

  get value(): string {
    return this.id;
  }
  get label(): string {
    return this.email;
  }
}
