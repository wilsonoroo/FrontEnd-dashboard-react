import { CampoFormKey, TypeField, transformedObject } from "@/utils/global";
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

  dispositivos: Dispositivos[];
  email: string;
  empresa: string;
  empresaId: string;
  fechaVencimientoLicencia: string | Date;
  fotografia: Fotografia;
  isActive: boolean;
  isEliminado: boolean;
  licencia: string;
  licencias: [];
  notificacionDocumentos: number;
  notificacionMisDocumentos: number;
  notificacionMisSeguimientosDePlanes: number;
  notificacionSeguimientosDePlanes: number;
  permisos: any;
  newPermisos: any;
  rol: Rol;
  rut: string;
  sexo: string;
  turno: string;
  enrolamiento: Enrolamiento;
  divisiones: [
    { id: number, displayName: string },
  ];

  constructor() {
    super();
    this.areaCargo = "";
    this.cargo = "";
    this.codigo = "";
    this.cuadrilla = [];
    this.dispositivos = [];
    this.email = "";
    this.empresa = "";
    this.empresaId = "";
    this.fechaVencimientoLicencia = new Date().toISOString();
    this.isActive = true;
    this.isEliminado = false;
    this.licencia = "";
    this.licencias = [];
    this.notificacionDocumentos = 0;
    this.notificacionMisDocumentos = 0;
    this.notificacionMisSeguimientosDePlanes = 0;
    this.notificacionSeguimientosDePlanes = 0;
    this.permisos = [];
    this.rut = "";
    this.sexo = "";
    this.turno = "";
    this.newPermisos = [];
  }

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
      fechaVencimientoLicencia: new Date().toISOString(),
      fotografia: {},
      isActive: true,
      isEliminado: false,
      licencias: [],
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
      newPermisos: [],
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
      fechaVencimientoLicencia: {
        display: "Fecha de Vencimiento de Licencia de Conducir",
        tipo: CampoFormKey.FECHA_CUSTOM,
        field: "fechaVencimientoLicencia",
        required: true,
        orden: 7,
      },

      turno: {
        display: "Turno",
        tipo: CampoFormKey.CREATE_SELECT,
        field: "turno",
        required: true,
        options: options.turno,
        orden: 8,
        single: true,
      },

      licencias: {
        display: "Licencias",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "licencias",
        required: true,
        isMulti: true,
        options: options.licencia,
        orden: 9,
        typeField: TypeField.Object,
        transform: (value: any) => {
          let permisos = transformedObject(value, "value");
          return permisos;
        },
        seccion: "Licencias",
      },
      rol: {
        display: "Rol",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "rol",
        required: true,
        options: options.rol,
        orden: 10,
      },
      permisos: {
        display: "Permisos",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "permisos",
        required: true,
        options: options.permisos,
        orden: 11,
        isMulti: true,
        typeField: TypeField.Object,
        transform: (value: any) => {
          console.log(
            "🚀 ~ file: Usuario.ts:172 ~ UsuarioVaku ~ getFormBuilder ~ any:",
            value
          );
          let permisos = transformedObject(value, "value");
          console.log(
            "🚀 ~ file: Usuario.ts:174 ~ UsuarioVaku ~ permisos ~ permisos:",
            permisos
          );
          return permisos;
        },
        single: false,
      },
      // newPermisos: {
      //   display: "Permisos",
      //   tipo: CampoFormKey.PERMISOS,
      //   field: "permisos",
      //   required: true,
      //   options: options.permisos,
      //   orden: 11,
      //   isMulti: true,
      //   typeField: TypeField.Object,
      //   transform: (value: any) => {
      //     let permisos = transformedObject(value, "value");

      //     return permisos;
      //   },
      //   single: false,
      // },

      isActive: {
        display: "Usuario activo",
        tipo: CampoFormKey.SWITCH,
        field: "isActive",
        required: true,

        orden: 12,
      },
    };
  }
}
