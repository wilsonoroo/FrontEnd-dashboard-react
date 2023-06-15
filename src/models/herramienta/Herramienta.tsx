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
    return yup.object().shape({
    });
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
     
    };
  }
}
