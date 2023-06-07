import { CampoFormKey } from "@/utils/global";
import * as yup from "yup";
import VakuModel, { IFormBuilder } from "../Vaku";

export class Vehiculo extends VakuModel implements IFormBuilder {
  fechaVencimiento: string | Date;
  isEliminado: boolean;
  isServicio: boolean;
  kilometraje: string;
  marca: string;
  modelo: string;
  numeroInterno: string;
  patente: string;
  proximaMantencion: string | Date;
  tipo: string;
  tipoVehiculo: string;
  ultimaMantencion: string | Date;

  getValidationSchema() {
    return yup.object().shape({
      patente: yup.string().required(),
    });
  }

  getEmptyObject() {
    return {
      id: "",
      nombre: "",
      isEliminado: false,
      isServicio: true,
      kilometraje: "",
      marca: "",
      modelo: "",
      numeroInterno: "",
      patente: "",
      fechaVencimiento: new Date().toISOString(),
      proximaMantencion: new Date().toISOString(),
      ultimaMantencion: new Date().toISOString(),
      tipo: "",
      tipoVehiculo: "",
    };
  }
  getFormBuilder(options: any = {}) {
    return {
      numeroInterno: {
        display: "Número Interno",
        tipo: CampoFormKey.TEXT_V2,
        field: "numeroInterno",
        required: true,
        orden: 1,
        uppercase: true,
        // mask: [/^[A-Z]/, /^[A-Z]/, "-", /^[1-9]$/, /^[1-9]$/],
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
        display: "Categoria de Vehículo",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "tipoVehiculo",
        placeholder: "Seleccione un tipo de vehículo",
        required: true,
        options: options.tipoVehiculo,
        orden: 5,
        single: true,
      },
      tipo: {
        display: "Tipo de vehículo",
        tipo: CampoFormKey.CREATE_SELECT,
        field: "tipo",
        options: options.tipo,
        required: true,
        orden: 6,
        single: true,
      },

      patente: {
        display: "Patente",
        tipo: CampoFormKey.TEXT_V2,
        mask: [
          /^[A-Za-z]/,
          /^[A-Za-z]/,
          "-",
          /^[A-Za-z]/,
          /^[A-Za-z]/,
          "-",
          /^[1-9]$/,
          /^[1-9]$/,
        ], //"aa-aa-99",
        uppercase: true,
        field: "patente",
        required: true,
        orden: 7,
      },
      proximaMantencion: {
        display: "Próxima Mantención",
        tipo: CampoFormKey.FECHA_CUSTOM,
        field: "proximaMantencion",
        required: true,
        orden: 8,
      },

      ultimaMantencion: {
        display: "Última Mantención",
        tipo: CampoFormKey.FECHA_CUSTOM,
        field: "ultimaMantencion",
        required: true,
        orden: 9,
      },
      fechaVencimiento: {
        display: "Vencimiento revisión técnica",
        tipo: CampoFormKey.FECHA_CUSTOM,
        field: "fechaVencimiento",
        required: true,
        orden: 10,
      },

      isEliminado: {
        display: "Dado de baja",
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
