import VakuModel from "../Vaku";
import { TipoDivision } from "../tiposDivision/TipoDivision";
import { ContenidoDivision } from "./ContenidoDivision";

export interface Division extends VakuModel {
  tipoDivision: TipoDivision;
  contenido:ContenidoDivision;

  readonly tipo: string;
}
