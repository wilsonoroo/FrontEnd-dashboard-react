import * as yup from "yup";
import VakuModel, { IFormBuilder } from "../Vaku";
import { DocumentoVaku } from "../documento/Documento";
import { UsuarioVaku } from "../usuario/Usuario";

export class PlanDeAccion extends VakuModel implements IFormBuilder {
  accionSugerida: string;
  autor: UsuarioVaku;
  documento: DocumentoVaku;
  estado: string;
  fechaCompromiso: string | Date;
  fechaCreacion: string | Date;
  pdf: {
    id: string;
    name: string;
    size: number;
    token: string;
    url: string;
  };
  responsable: UsuarioVaku;

  getValidationSchema() {
    return yup.object().shape({});
  }

  getEmptyObject() {
    return {
      id: "",
      accionSugerida: "",
      autor: "",
      documento: "",
      estado: "",
      fechaCompromiso: new Date().toISOString(),
      fechaCreacion: new Date().toISOString(),
      pdf: {
        id: "",
        name: "",
        size: 0,
        token: "",
        url: "",
      },
      responsable: "",
    };
  }
  getFormBuilder(_options: any = {}) {
    return {};
  }
}
