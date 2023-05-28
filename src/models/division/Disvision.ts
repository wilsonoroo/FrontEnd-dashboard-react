import VakuModel from "../Vaku";
import { TipoDivision } from "../tiposDivision/TipoDivision";
import { ContenidoDivision } from "./ContenidoDivision";

export class Divisiones extends VakuModel {
  getValidationSchema() {
    throw new Error("Method not implemented.");
  }
  getFormBuilder(options?: any) {
    throw new Error("Method not implemented.");
  }
  getEmptyObject() {
    throw new Error("Method not implemented.");
  }
  tipoDivision: TipoDivision;
  contenido: ContenidoDivision;

  readonly tipo: string;
}
