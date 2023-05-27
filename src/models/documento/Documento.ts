import VakuModel from "../Vaku";
import { Checklist } from "../checkList/CheckList";

export interface Documento extends VakuModel {
  estado: string;
  fechaCreacion: string;
  fechaSubida: string;

  isPlanDeAccion: boolean;
  checklist: Checklist;
}
