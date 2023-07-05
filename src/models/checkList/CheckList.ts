import VakuModel from "../Vaku";
import { Configuracion } from "./Configuracion";

export interface IChecklist extends VakuModel {
  abreviatura: string;
  categoria: string;
  configuracion: Configuracion;
  descripcion: string;
  empresa: string;
  faena: string;
  id: string;
  instruccion: string;
  metadata: {
    fechaRevision: string;
    revision: string;
    urlImagen: string;
  };
  nombre: string;
  tag: string;
  tipo: string;
}

export class Checklist implements IChecklist {
  abreviatura: string;
  categoria: string;
  displayName: string;
  configuracion: Configuracion;
  descripcion: string;
  empresa: string;
  faena: string;
  id: string;
  instruccion: string;
  metadata: { fechaRevision: string; revision: string; urlImagen: string };
  nombre: string;
  tag: string;
  tipo: string;
  static tipo: string;
  transformObject(): this {
    throw new Error("Method not implemented.");
  }
  createdAt: Date;
  updatedAt: Date;
  get value(): string {
    throw new Error("Method not implemented.");
  }
  get label(): string {
    throw new Error("Method not implemented.");
  }
  getValidationSchema() {
    throw new Error("Method not implemented.");
  }
  getFormBuilder(_options?: any) {
    throw new Error("Method not implemented.");
  }
  getEmptyObject() {
    throw new Error("Method not implemented.");
  }
}
