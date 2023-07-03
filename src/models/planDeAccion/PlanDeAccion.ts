import * as yup from "yup";
import VakuModel, { IFormBuilder } from "../Vaku";

export class PlanDeAccion extends VakuModel implements IFormBuilder {
  accionSugerida: string;
  autor: string;
  documento: string;
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
  responsable: string;

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
