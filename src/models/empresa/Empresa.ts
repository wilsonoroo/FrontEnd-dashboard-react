import VakuModel, {
  IEmptyObject,
  IFormBuilder,
  ISchemaValidation,
  IVakuModel,
  IValidationSchema,
} from "../Vaku";

import * as yup from "yup";
import { Divisiones } from "../division/Disvision";
import { DocumentoVaku } from "../documento/Documento";
import { Equipo } from "../equipo/Equipo";
import { Gerencia } from "../gerencia/Gerencia";
import { UsuarioVaku } from "../usuario/Usuario";

export class Empresa
  extends VakuModel
  implements
    ISchemaValidation,
    IEmptyObject,
    IFormBuilder,
    IVakuModel,
    IValidationSchema
{
  encargado: unknown | UsuarioVaku;
  cantUsuarios: number;
  cantDivisiones: number;
  cantDocumentos: number;
  usuarios: UsuarioVaku[] | null;
  url: string | null;
  configContenido: string;
  isActive: boolean;
  repositorioVersion: number;
  versionDataBase: number;

  // colleciones
  divisiones: Divisiones[];
  documentosGlobales: DocumentoVaku[];
  gerencias: Gerencia[];
  equipos: Equipo[];
  getValidationSchema() {
    return yup.object().shape({
      // id: yup.string().required(),
      nombre: yup.string().required(),
    });
  }
  override getEmptyObject() {
    return {
      id: "",
      nombre: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      cantUsuarios: 0,
      cantDivisiones: 0,
      cantDocumentos: 0,
    };
  }
  override getFormBuilder() {
    return {
      // id: {
      //   display: "id",
      //   tipo: CampoFormKey.TEXT,
      //   field: "id",
      //   required: false,
      // },
      // nombre: {
      //   display: "Nombre Gerencia",
      //   tipo: CampoFormKey.TEXT,
      //   field: "nombre",
      //   required: true,
      // },
      // cantDocumentos: {
      //   display: "Cantidad de Documentos",
      //   tipo: CampoFormKey.NUMBER,
      //   field: "cantDocumentos",
      //   required: true,
      // },
      // cantDivisiones: {
      //   display: "Cantidad de divisiones",
      //   tipo: CampoFormKey.NUMBER,
      //   field: "cantDivisiones",
      //   required: true,
      // },
      // cantUsuarios: {
      //   display: "Cantidad de Usuarios",
      //   tipo: CampoFormKey.NUMBER,
      //   field: "cantUsuarios",
      //   required: true,
      // },
    };
  }

  get value(): string {
    return this.id;
  }
  get label(): string {
    return this.nombre;
  }
}
