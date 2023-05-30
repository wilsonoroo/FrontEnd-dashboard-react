import { CampoFormKey } from "@/utils/global";
import * as yup from "yup";
import VakuModel from "../Vaku";
import { Cuadrilla } from "../cuadrilla/Cuadrilla";
import { Dispositivos } from "../dispositivo/Dispositivo";
import { Fotografia } from "../fotografia/Fotografia";
import { Permisos } from "../permisos/Permisos";
import { Rol } from "../rol/Rol";
import { Enrolamiento } from "./Enrolamiento";

export class UsuarioVaku extends VakuModel {
  areaCargo: string;
  cargo: string;
  codigo: string;
  cuadrilla: Cuadrilla[];
  displayName: string;
  dispositivos: Dispositivos[];
  email: string;
  empresa: string;
  empresaId: string;
  fechaVencimientoLicencia: string;
  fotografia: Fotografia;
  isActive: boolean;
  isEliminado: boolean;
  licencia: string;
  notificacionDocumentos: number;
  notificacionMisDocumentos: number;
  notificacionMisSeguimientosDePlanes: number;
  notificacionSeguimientosDePlanes: number;
  permisos: Permisos[];
  rol: Rol;
  rut: string;
  sexo: string;
  turno: string;
  enrolamiento: Enrolamiento;

  getValidationSchema() {
    return yup.object().shape({
      nombre: yup.string().required(),
    });
  }

  getEmptyObject(): any {
    return {
      id: "",
      areaCargo: "",
      cargo: "",
      codigo: "",
      cuadrilla: [],
      displayName: "",
      dispositivos: [],
      email: "",
      empresa: "",
      empresaId: "",
      fechaVencimientoLicencia: "",
      fotografia: {},
      isActive: false,
      isEliminado: false,
      licencia: "",
      notificacionDocumentos: 0,
      notificacionMisDocumentos: 0,
      notificacionMisSeguimientosDePlanes: 0,
      notificacionSeguimientosDePlanes: 0,
      permisos: [],
      rol: {},
      rut: "",
      sexo: "",
      turno: "",
      enrolamiento: {},
    };
  }

  getFormBuilder(): any {
    return {
      areaCargo: {
        display: "Área Cargo",
        tipo: CampoFormKey.TEXT,
        field: "areaCargo",
        required: true,
      },
      cargo: {
        display: "Cargo",
        tipo: CampoFormKey.TEXT,
        field: "cargo",
        required: true,
      },
      codigo: {
        display: "Código",
        tipo: CampoFormKey.TEXT,
        field: "codigo",
        required: true,
      },

      displayName: {
        display: "Nombre de usuario",
        tipo: CampoFormKey.TEXT,
        field: "displayName",
        required: true,
      },

      email: {
        display: "Correo electrónico",
        tipo: CampoFormKey.TEXT,
        field: "email",
        required: true,
      },

      fechaVencimientoLicencia: {
        display: "Fecha de Vencimiento de Licencia",
        tipo: CampoFormKey.FECHA_NATIVO,
        field: "fechaVencimientoLicencia",
        required: true,
      },

      isActive: {
        display: "Activo",
        tipo: CampoFormKey.CHECKBOX,
        field: "isActive",
        required: true,
      },
      isEliminado: {
        display: "Eliminado",
        tipo: CampoFormKey.CHECKBOX,
        field: "isEliminado",
        required: true,
      },
      licencia: {
        display: "Licencia",
        tipo: CampoFormKey.DROPDOWN,
        field: "licencia",
        required: true,
      },

      permisos: {
        display: "Permisos",
        tipo: CampoFormKey.DROPDOWN,
        field: "permisos",
        required: true,
        options: [], // Agrega las opciones correspondientes
      },
      rol: {
        display: "Rol",
        tipo: CampoFormKey.DROPDOWN,
        field: "rol",
        required: true,
        options: [], // Agrega las opciones correspondientes
      },
      rut: {
        display: "RUT",
        tipo: CampoFormKey.TEXT,
        field: "rut",
        required: true,
      },
      sexo: {
        display: "Sexo",
        tipo: CampoFormKey.DROPDOWN,
        field: "sexo",
        required: true,
        options: [], // Agrega las opciones correspondientes
      },
      turno: {
        display: "Turno",
        tipo: CampoFormKey.DROPDOWN,
        field: "turno",
        required: true,
        options: [], // Agrega las opciones correspondientes
      },
    };
  }
}
