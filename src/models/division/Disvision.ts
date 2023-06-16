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
import { UsuarioVaku } from "../usuario/Usuario";
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
      id: {
        display: "id",
        tipo: CampoFormKey.TEXT,
        field: "id",
        required: true,
      },
      nombre: {
        display: "Nombre",
        tipo: CampoFormKey.TEXT,
        field: "nombre",
        required: true,
      },
      responsable: {
        display: "Responsable",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "responsable",
        required: true,
        options: options.responsable,
        orden: 2,
      },
      codigo: {
        display: "Codigo",
        tipo: CampoFormKey.TEXT,
        field: "codigo",
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
      codigo: "",
    };
  }

  setEmptyObject(): void {
    this.id = "";
    this.nombre = "";
    this.tipoDivision = "";
    this.codigo = null;
  }
  tipoDivision: TipoDivision | string;
  contenido: ContenidoDivision;
  codigo: string;
  responsable: UsuarioVaku[] | UsuarioVaku | null;

  readonly tipo: string;
}
