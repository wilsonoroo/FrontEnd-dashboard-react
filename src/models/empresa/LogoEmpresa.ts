import VakuModel from "../Vaku";

export class LogoEmpressa extends VakuModel {
  getValidationSchema() {
    throw new Error("Method not implemented.");
  }
  getFormBuilder(options?: any) {
    throw new Error("Method not implemented.");
  }
  getEmptyObject() {
    throw new Error("Method not implemented.");
  }
  logo: string;
}
