import { CampoFormKey } from "@/utils/global";
import * as yup from "yup";
import VakuModel, { IFormBuilder } from "../Vaku";
import { MetaData } from "./MetaData";

export class Equipo extends VakuModel implements IFormBuilder {
  categoria: string;
  identificador: string;
  isEliminado: boolean;
  isServicio: boolean;
  marca: string;
  metadata: MetaData[];
  modelo: string;
  tipo: string;
  divisiones: [{ id: number; displayName: string }];
  // numeroInterno: string;

  constructor() {
    super();
    this.categoria = "";
    this.identificador = "";
    this.isEliminado = false;
    this.isServicio = false;
    this.marca = "";
    this.metadata = [];
    this.modelo = "";
    this.tipo = "";

    // this.numeroInterno = "";
  }
  getValidationSchema() {
    return yup.object().shape({});
  }

  getEmptyObject() {
    return {
      id: "",
      categoria: "",
      identificador: "",
      isEliminado: "",
      isServicio: "",
      marca: "",
      metadata: "",
      modelo: "",
      tipo: "",
    };
  }
  getFormBuilder(options: any = {}) {
    return {
      identificador: {
        display: "Identificador",
        tipo: CampoFormKey.TEXT,
        field: "identificador",
        required: true,
        orden: 1,
      },
      marca: {
        display: "Marca",
        tipo: CampoFormKey.TEXT,
        field: "marca",
        required: true,
        orden: 1,
      },
      modelo: {
        display: "Modelo",
        tipo: CampoFormKey.TEXT,
        field: "modelo",
        required: true,
        orden: 1,
      },
      tipo: {
        display: "Tipo",
        tipo: CampoFormKey.TEXT,
        field: "tipo",
        required: true,
        orden: 1,
      },

      isActive: {
        display: "Usuario activo",
        tipo: CampoFormKey.SWITCH,
        field: "isActive",
        required: true,

        orden: 12,
      },
    };
  }
}
