import VakuModel from "../Vaku";
import { MetaData } from "./MetaData";

export interface Equipo extends VakuModel {
  categoria: string;
  identificador: string;
  isEliminado: boolean;
  isServicio: boolean;
  marca: string;
  metadata: MetaData[];
  modelo: string;
  tipo: string;
  numeroInterno: string;
}
