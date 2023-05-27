import { CampoFormKey } from "@/utils/global";
import * as yup from "yup";
import VakuModel, {
  IEmptyObject,
  IFormBuilder,
  ISchemaValidation,
  IVakuModel,
  IValidationSchema,
} from "../Vaku";
import { Division } from "../division/Disvision";
export class Gerencia
  extends VakuModel
  implements
    ISchemaValidation,
    IEmptyObject,
    IFormBuilder,
    IVakuModel,
    IValidationSchema
{
  divisiones: Division[];
  isEliminado: boolean;
  cantUsuarios: number;
  cantDivisiones: number;
  cantDocumentos: number;

  getValidationSchema() {
    return yup.object().shape({
      // id: yup.string().required(),
      nombre: yup.string().required(),
    });
  }
  getEmptyObject() {
    return {
      id: "",
      nombre: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      cantUsuarios: 0,
      cantDivisiones: 0,
      cantDocumentos: 0,
      isEliminado: false,
    };
  }
  getFormBuilder() {
    return {
      // id: {
      //   display: "id",
      //   tipo: CampoFormKey.TEXT,
      //   field: "id",
      //   required: false,
      // },
      nombre: {
        display: "Nombre Gerencia",
        tipo: CampoFormKey.TEXT,
        field: "nombre",
        required: true,
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
