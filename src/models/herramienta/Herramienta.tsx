import { CampoFormKey } from "@/utils/global";
import * as yup from "yup";
// import { MetaData } from "./MetaData";
import VakuModel, { IFormBuilder } from "../Vaku";

export class Herramienta extends VakuModel implements IFormBuilder {
  categoria: string;
  identificador: string;
  isEliminado: boolean;
  isServicio: boolean;
  marca: string;
  metadata: string;
  modelo: string;
  tipo: string;
  // numeroInterno: string;

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
