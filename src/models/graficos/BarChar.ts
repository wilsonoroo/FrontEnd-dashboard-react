import { CampoFormKey } from "@/utils/global";
import * as yup from "yup";
import VakuModel, { IFormBuilder } from "../Vaku";


export class BarC extends VakuModel implements IFormBuilder {
  desde: string | Date;
  hasta: string | Date;
  filtro: string;

  constructor() {
    super();
    this.desde = new Date().toISOString();
    this.hasta = new Date().toISOString();
    this.filtro = "";
  }
  getValidationSchema() {
    return yup.object().shape({});
  }

  getEmptyObject() {
    return {
      desde: new Date().toISOString(),
      hasta: new Date().toISOString(),
      filtro: "",
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
        filtro: {
            display: "Filtro",
            tipo: CampoFormKey.DROPDOWN_V2,
            field: "filtro",
            required: true,
            options: options.filtro,
            single: true,
            orden: 3,
        },
    };
  }
}
