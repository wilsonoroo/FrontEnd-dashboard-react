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
import { UsuarioVaku } from "../usuario/Usuario";
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
  responsable: UsuarioVaku[] | UsuarioVaku | null;
  ubicacion: string;

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
      ubicacion: "",
      createdAt: new Date(),
      updatedAt: new Date(),

      isEliminado: false,
    };
  }

  setEmptyObject(): void {
    this.id = "";
    this.nombre = "";
    this.isEliminado = false;
    this.divisiones = [];
    this.responsable = null;
    this.ubicacion = "";
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
        orden: 1,
      },

      responsable: {
        display: "Responsable",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "responsable",
        required: true,
        options: options.responsable,
        orden: 2,
      },
      ubicacion: {
        display: "Ubicacion",
        tipo: CampoFormKey.TEXT,
        field: "ubicacion",
        required: true,
        orden: 3,
      },
      isEliminado: {
        display: "Esta elminada?",
        tipo: CampoFormKey.CHECKBOX,
        field: "isEliminado",
        required: true,
        orden: 4,
      },
    };
  }
}
