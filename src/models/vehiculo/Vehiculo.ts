import { CampoFormKey } from "@/utils/global";
import * as yup from "yup";
import VakuModel, { IFormBuilder } from "../Vaku";

export class Vehiculo extends VakuModel implements IFormBuilder {
  fechaVencimiento: string;
  isEliminado: boolean;
  isServicio: boolean;
  kilometraje: string;
  marca: string;
  modelo: string;
  numeroInterno: string;
  patente: string;
  proximaMantencion: Date;
  tipo: string;
  tipoVehiculo: string;
  ultimaMantencion: Date;

  getValidationSchema() {
    return yup.object().shape({
      patente: yup.string().required(),
    });
  }
  getEmptyObject() {
    return {
      id: "",
      nombre: "",
      fechaVencimiento: "",
      isEliminado: false,
      isServicio: true,
      kilometraje: "",
      marca: "",
      modelo: "",
      numeroInterno: "",
      patente: "",
      proximaMantencion: "",
      tipo: "",
      tipoVehiculo: "",
      ultimaMantencion: "",
    };
  }
  getFormBuilder(options: any = {}) {
    console.log(options);
    return {
      numeroInterno: {
        display: "Número Interno",
        tipo: CampoFormKey.TEXT,
        field: "numeroInterno",
        required: true,
        orden: 1,
      },

      kilometraje: {
        display: "Kilometraje",
        tipo: "number",
        field: CampoFormKey.NUMBER,
        required: true,
        orden: 2,
      },
      marca: {
        display: "Marca",
        tipo: CampoFormKey.TEXT,
        field: "marca",
        required: true,
        orden: 3,
      },
      modelo: {
        display: "Modelo",
        tipo: CampoFormKey.TEXT,
        field: "modelo",
        required: true,
        orden: 4,
      },
      tipoVehiculo: {
        display: "Tipo de Vehículo",
        tipo: CampoFormKey.DROPDOWN,
        field: "tipoVehiculo",
        required: true,
        options: options.tipoVehiculo,
        orden: 5,
        single: true,
      },
      tipo: {
        display: "Tipo",
        tipo: CampoFormKey.TEXT,
        field: "tipo",
        required: true,
        orden: 6,
      },

      patente: {
        display: "Patente",
        tipo: CampoFormKey.TEXT,
        field: "patente",
        required: true,
        orden: 7,
      },
      proximaMantencion: {
        display: "Próxima Mantención",
        tipo: CampoFormKey.TEXT,
        field: "proximaMantencion",
        required: true,
        orden: 8,
      },

      ultimaMantencion: {
        display: "Última Mantención",
        tipo: CampoFormKey.FECHA_NATIVO,
        field: "ultimaMantencion",
        required: true,
        orden: 9,
      },
      fechaVencimiento: {
        display: "Fecha de Vencimiento",
        tipo: CampoFormKey.FECHA_NATIVO,
        field: "fechaVencimiento",
        required: true,
        orden: 10,
      },

      isEliminado: {
        display: "Esta Eliminado",
        tipo: CampoFormKey.SWITCH,
        field: "isEliminado",
        orden: 11,
      },
      isServicio: {
        display: "Esta en Servicio",
        tipo: CampoFormKey.SWITCH,
        field: "isServicio",
        orden: 12,
      },
    };
  }
}
