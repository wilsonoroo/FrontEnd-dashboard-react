import { CampoFormKey } from "@/utils/global";
import * as yup from "yup";
import VakuModel, {
  IEmptyObject,
  IFormBuilder,
  ISchemaValidation,
  IVakuModel,
  IValidationSchema,
} from "../Vaku";
import { TipoDivision } from "../tiposDivision/TipoDivision";
import { ContenidoDivision } from "./ContenidoDivision";

export class Divisiones
  extends VakuModel
  implements
    ISchemaValidation,
    IEmptyObject,
    IFormBuilder,
    IVakuModel,
    IValidationSchema
{
  getValidationSchema() {
    return yup.object().shape({
      nombre: yup.string().required(),
    });
  }
  getFormBuilder(options?: any) {
    return {
      nombre: {
        display: "Nombre",
        tipo: CampoFormKey.TEXT,
        field: "nombre",
        required: true,
      },
      tipoDivision: {
        display: "Tipo de Disvision",
        tipo: CampoFormKey.DROPDOWN,
        field: "tipoDivision",
        required: true,
        options: options.tipoDivision,
      },
    };
  }

  getEmptyObject() {
    return {
      id: "",
      nombre: "",
      tipoDivision: "",
    };
  }
  tipoDivision: TipoDivision | string;
  contenido: ContenidoDivision;

  readonly tipo: string;
}
