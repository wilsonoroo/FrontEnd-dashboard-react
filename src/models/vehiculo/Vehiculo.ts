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
  proximaMantencion: string;
  tipo: string;
  tipoVehiculo: string;
  ultimaMantencion: string;

  getValidationSchema() {
    return yup.object().shape({
      nombre: yup.string().required(),
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
  getFormBuilder(options?: any) {
    return {
      fechaVencimiento: {
        display: "Fecha de Vencimiento",
        tipo: CampoFormKey.FECHA_NATIVO,
        field: "fechaVencimiento",
        required: true,
      },
      isEliminado: {
        display: "Eliminado",
        tipo: CampoFormKey.CHECKBOX,
        field: "isEliminado",
      },
      isServicio: {
        display: "Servicio",
        tipo: CampoFormKey.CHECKBOX,
        field: "isServicio",
      },
      kilometraje: {
        display: "Kilometraje",
        tipo: "number",
        field: CampoFormKey.NUMBER,
        required: true,
      },
      marca: {
        display: "Marca",
        tipo: CampoFormKey.TEXT,
        field: "marca",
        required: true,
      },
      modelo: {
        display: "Modelo",
        tipo: CampoFormKey.TEXT,
        field: "modelo",
        required: true,
      },
      numeroInterno: {
        display: "Número Interno",
        tipo: CampoFormKey.TEXT,
        field: "numeroInterno",
        required: true,
      },
      patente: {
        display: "Patente",
        tipo: CampoFormKey.TEXT,
        field: "patente",
        required: true,
      },
      proximaMantencion: {
        display: "Próxima Mantención",
        tipo: CampoFormKey.TEXT,
        field: "proximaMantencion",
        required: true,
      },
      tipo: {
        display: "Tipo",
        tipo: CampoFormKey.TEXT,
        field: "tipo",
        required: true,
      },
      tipoVehiculo: {
        display: "Tipo de Vehículo",
        tipo: CampoFormKey.TEXT,
        field: "tipoVehiculo",
        required: true,
      },
      ultimaMantencion: {
        display: "Última Mantención",
        tipo: CampoFormKey.FECHA_NATIVO,
        field: "ultimaMantencion",
        required: true,
      },
    };
  }
}
