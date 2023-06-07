import * as yup from "yup";
import VakuModel from "../Vaku";
import { Checklist } from "../checkList/CheckList";
import { UsuarioVaku } from "../usuario/Usuario";

export class DocumentoVaku extends VakuModel {
  division?: string;
  correlativo: string;
  fechaValidacion: string;
  pdf: {
    id: string;
    name: string;
    size: number;
    token: string;
    url: string;
  };
  cuadrilla: {
    integrantes: {
      [key: string]: UsuarioVaku;
    };
  };
  emisor: UsuarioVaku;
  empresaid?: string;
  gerencia?: string;
  estado: string;
  fechaCreacion: string;
  fechaSubida: string;
  isPlanDeAccion: boolean;
  validadoPor: UsuarioVaku;

  checklist: Checklist;

  getValidationSchema() {
    return yup.object().shape({
      nombre: yup.string().required(),
    });
  }
  getEmptyObject() {
    return {
      id: "",
      nombre: "",
      division: "",
      correlativo: "",
      fechaValidacion: "",
      pdf: {
        id: "",
        name: "",
        size: 0,
        token: "",
        url: "",
      },
      emisor: new UsuarioVaku(),
      empresaid: "",
      gerencia: "",
      estado: "",
      fechaCreacion: "",
      fechaSubida: "",
      isPlanDeAccion: false,
      validadoPor: new UsuarioVaku(),
    };
  }
  getFormBuilder({}) {
    return {};
  }
}
