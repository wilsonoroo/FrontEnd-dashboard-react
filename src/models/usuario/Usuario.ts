import { CampoFormKey, TypeField } from "@/utils/global";
import * as yup from "yup";
import VakuModel from "../Vaku";
import { Cuadrilla } from "../cuadrilla/Cuadrilla";
import { Dispositivos } from "../dispositivo/Dispositivo";
import { Fotografia } from "../fotografia/Fotografia";
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
  permisos: any;
  rol: Rol;
  rut: string;
  sexo: string;
  turno: string;
  enrolamiento: Enrolamiento;

  getValidationSchema() {
    return yup.object().shape({
      email: yup.string().required(),
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

  getFormBuilder(options: any = {}) {
    return {
      displayName: {
        display: "Nombre de usuario",
        tipo: CampoFormKey.TEXT,
        field: "displayName",
        required: true,
        orden: 1,
      },
      rut: {
        display: "RUT",
        tipo: CampoFormKey.TEXT,
        field: "rut",
        required: true,
        orden: 2,
      },
      sexo: {
        display: "Sexo",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "sexo",
        required: true,
        options: options.sexo,
        single: true,
        orden: 3,
      },
      email: {
        display: "Correo electrónico",
        tipo: CampoFormKey.TEXT,
        field: "email",
        required: true,
        orden: 4,
      },

      areaCargo: {
        display: "Área Cargo",
        tipo: CampoFormKey.TEXT,
        field: "areaCargo",
        required: true,
        orden: 5,
      },
      cargo: {
        display: "Cargo",
        tipo: CampoFormKey.TEXT,
        field: "cargo",
        required: true,
        orden: 6,
      },

      rol: {
        display: "Rol",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "rol",
        required: true,
        options: options.rol,
        orden: 8,
      },
      turno: {
        display: "Turno",
        tipo: CampoFormKey.CREATE_SELECT,
        field: "turno",
        required: true,
        options: options.turno,
        orden: 9,
      },
      fechaVencimientoLicencia: {
        display: "Fecha de Vencimiento de Licencia",
        tipo: CampoFormKey.FECHA_NATIVO,
        field: "fechaVencimientoLicencia",
        required: true,
        orden: 10,
      },

      licencia: {
        display: "Licencia",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "licencia",
        required: true,
        isMulti: true,
        options: options.licencia,
        orden: 11,
      },
      permisos: {
        display: "Permisos",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "permisos",
        required: true,
        options: options.permisos,
        orden: 12,
        isMulti: true,
        typeField: TypeField.Object,
        transform: (value: any) => {
          console.log(
            "🚀 ~ file: Usuario.ts:172 ~ UsuarioVaku ~ getFormBuilder ~ any:",
            value
          );
          return value.map((item: any) => {
            return {
              codigo: item.value,
              displayName: item.label,
              id: item.value,
            };
          });
        },
        single: false,
      },

      isActive: {
        display: "Usuario activo",
        tipo: CampoFormKey.SWITCH,
        field: "isActive",
        required: true,

        orden: 13,
      },
    };
  }
}
