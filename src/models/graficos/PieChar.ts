import { CampoFormKey } from "@/utils/global";
import * as yup from "yup";
import VakuModel, { IFormBuilder } from "../Vaku";


export class PieC extends VakuModel implements IFormBuilder {
  desde: string | Date;
  hasta: string | Date;
  filtroDocumento: string;
  filtroDivision: string;


  constructor() {
    super();
    this.desde = new Date().toISOString();
    this.hasta = new Date().toISOString();
    this.filtroDocumento = "";
    this.filtroDivision = "";
  }
  getValidationSchema() {
    return yup.object().shape({});
  }

  getEmptyObject() {
    return {
      desde: new Date().toISOString(),
      hasta: new Date().toISOString(),
      filtroDocumento: "",
      filtroDivision: "",
    };
  }
  getFormBuilder(options: any = {}) {
    return {
        desde: {
            display: "Desde",
            tipo: CampoFormKey.FECHA_CUSTOM,
            field: "desde",
            required: true,
            orden: 1,
        },
        hasta: {
            display: "Hasta",
            tipo: CampoFormKey.FECHA_CUSTOM,
            field: "hasta",
            required: true,
            orden: 2,
        },
        // filtroDocumento: {
        //   display: "Filtro por documento",
        //   tipo: CampoFormKey.DROPDOWN_V2,
        //   field: "filtroDocumento",
        //   required: true,
        //   options: options.filtroDocumento,
        //   single: true,
        //   orden: 3,
        // },
        filtroDivision: {
          display: "Filtro por division",
          tipo: CampoFormKey.DROPDOWN_V2,
          field: "filtroDivision",
          required: true,
          options: options.filtroDivision,
          single: true,
          orden: 3,
        },
    };
  }
}
