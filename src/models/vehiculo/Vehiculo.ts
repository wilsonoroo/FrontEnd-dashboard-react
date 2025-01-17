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
  divisiones: [{ id: number; displayName: string }];
  // isAsignado: boolean;

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
      divisiones: "",
    };
  }

  setEmptyObject(): void {
    this.id = "";
    this.nombre = "";
    this.isEliminado = false;
    this.isServicio = true;
    this.kilometraje = "";
    this.marca = "";
    this.modelo = "";
    this.numeroInterno = "";
    this.patente = "";
    this.fechaVencimiento = new Date().toISOString();
    this.proximaMantencion = new Date().toISOString();
    this.ultimaMantencion = new Date().toISOString();
    this.tipo = "";
    this.tipoVehiculo = "";
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
        display: "Kilometraje ",
        tipo: CampoFormKey.NUMBER,
        field: "kilometraje",
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
      tipo: {
        display: "Categoria de Vehículo",
        placeholder: "Seleccione la categoria de vehículo",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "tipo",
        options: options.tipo,
        required: true,
        orden: 5,
        single: true,
      },
      tipoVehiculo: {
        display: "Tipo de vehículo",
        placeholder: "Seleccione un tipo de vehículo",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "tipoVehiculo",
        required: true,
        options: options.tipoVehiculo,
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
