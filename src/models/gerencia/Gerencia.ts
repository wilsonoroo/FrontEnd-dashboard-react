import { CampoFormKey } from "@/utils/global";
import * as yup from "yup";
import VakuModel, {
  IEmptyObject,
  IFormBuilder,
  ISchemaValidation,
  IVakuModel,
  IValidationSchema,
} from "../Vaku";

import { Divisiones } from "../division/Disvision";
import { AuthUser } from "../usuario/AuthUser";
export class Gerencia
  extends VakuModel
  implements
    ISchemaValidation,
    IEmptyObject,
    IFormBuilder,
    IVakuModel,
    IValidationSchema
{
  divisiones: Divisiones[];
  isEliminado: boolean;
  cantUsuarios: number;
  cantDivisiones: number;
  cantDocumentos: number;
  responsable: AuthUser[] | AuthUser | null;
  

  getValidationSchema() {
    return yup.object().shape({
      nombre: yup.string().required(),
    });
  }
  getEmptyObject() {
    return {
      id: "",
      nombre: "",
      responsable: new AuthUser(),
      createdAt: new Date(),
      updatedAt: new Date(),
      cantUsuarios: 0,
      cantDivisiones: 0,
      cantDocumentos: 0,
      isEliminado: false,
    };
  }
  getFormBuilder(options?: any) {
    return {
      id: {
        display: "id",
        tipo: CampoFormKey.TEXT,
        field: "id",
        required: true,
      },
      nombre: {
        display: "Nombre Gerencia",
        tipo: CampoFormKey.TEXT,
        field: "nombre",
        required: true,
      },
      responsable: {
        display: "Responsable",
        tipo: CampoFormKey.DROPDOWN,
        field: "responsable",
        required: true,
        options: options.responsable,
      },
      isEliminado: {
        display: "Esta elminada?",
        tipo: CampoFormKey.CHECKBOX,
        field: "isEliminado",
        required: true,
      },
      cantDocumentos: {
        display: "Cantidad de Documentos",
        tipo: CampoFormKey.NUMBER,
        field: "cantDocumentos",
        required: true,
      },
      cantDivisiones: {
        display: "Cantidad de divisiones",
        tipo: CampoFormKey.NUMBER,
        field: "cantDivisiones",
        required: true,
      },

      cantUsuarios: {
        display: "Cantidad de Usuarios",
        tipo: CampoFormKey.NUMBER,
        field: "cantUsuarios",
        required: true,
      },
    };
  }
 
}
