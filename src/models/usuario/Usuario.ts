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
  isSuperAdmin: boolean;
  isAdmin: boolean;

  dispositivos: Dispositivos[];
  email: string;
  empresa: string;
  empresaId: string;
  empresaIdGlobal: string;
  empresaIdV1: string;
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
  permisosWeb: any;
  newPermisos: any;
  rol: Rol;
  rut: string;
  sexo: string;
  turno: string;
  enrolamiento: Enrolamiento;
  divisiones: [{ id: number; displayName: string }];
  tipo: string;
  // isSuperAdmin: boolean;

  constructor() {
    super();
    this.areaCargo = "";
    this.isSuperAdmin = false;
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
    this.isSuperAdmin = false;
    this.permisosWeb = [];
    this.tipo = "";
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
      isSuperAdmin: false,
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
      permisosWeb: [],
      tipo: "",
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
      cargo: {
        display: "Cargo",
        tipo: CampoFormKey.TEXT,
        field: "cargo",
        required: true,
        orden: 5,
      },
      turno: {
        display: "Turno",
        tipo: CampoFormKey.CREATE_SELECT,
        field: "turno",
        required: true,
        options: options.turno,
        orden: 6,
        single: true,
      },
      licencias: {
        display: "Licencias",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "licencias",
        required: true,
        isMulti: true,
        options: options.licencia,
        orden: 7,
        typeField: TypeField.Object,
        transform: (value: any) => {
          console.log(
            "🚀 ~ file: Usuario.ts:179 ~ UsuarioVaku ~ getFormBuilder ~ value:",
            value
          );
          let permisos = transformedObject(value, "nombre");
          console.log(
            "🚀 ~ file: Usuario.ts:175 ~ UsuarioVaku ~ getFormBuilder ~ permisos:",
            permisos
          );
          return permisos;
        },
      },

      fechaVencimientoLicencia: {
        display: "Fecha de Vencimiento de Licencia de Conducir",
        tipo: CampoFormKey.FECHA_CUSTOM,
        field: "fechaVencimientoLicencia",
        required: true,
        orden: 8,
      },

      rol: {
        display: "Rol",
        tipo: CampoFormKey.DROPDOWN_V2,
        field: "rol",
        required: true,
        options: options.rol,
        isMulti: false,
        orden: 9,
        transform: (value: any) => {
          console.log(
            "🚀 ~ file: Usuario.ts:179 ~ UsuarioVaku ~ getFormBuilder ~ value:",
            value
          );
          let permisos = transformedObject(value, "nombre");
          console.log(
            "🚀 ~ file: Usuario.ts:175 ~ UsuarioVaku ~ getFormBuilder ~ permisos:",
            permisos
          );
          return permisos;
        },
      },
      isActive: {
        display: "Usuario activo",
        tipo: CampoFormKey.SWITCH,
        field: "isActive",
        required: true,

        orden: 10,
      },
      permisosWeb: {
        display: "Permisos web",
        tipo: CampoFormKey.PERMISOS,
        field: "permisosWeb",
        required: true,
        options: options.permisos,
        orden: 11,
        isMulti: false,

        single: true,
      },
      permisos: {
        display: "Permisos",
        tipo: CampoFormKey.PERMISOS_MOVIL,
        field: "permisos",
        required: true,
        options: options.permisos,
        orden: 12,
        isMulti: false,
        typeField: TypeField.Object,
        transform: (value: any) => {
          console.log(
            "🚀 ~ file: Usuario.ts:234 ~ UsuarioVaku ~ getFormBuilder ~ value:",
            value
          );
          let result: any[] = [];
          let validador: boolean[] = [];
          let mapping = value.map((permiso: any) => {
            if (permiso.permisos["crear"]) {
              result.push(permiso);
            }
            if (permiso.permisos["validar"]) {
              validador.push(permiso);
            }
          });
          console.log(
            "🚀 ~ file: Usuario.ts:240 ~ UsuarioVaku ~ mapping ~ mapping:",
            validador.some((permiso: any) => permiso)
          );
          if (validador.some((permiso: any) => permiso)) {
            result.push({
              codigo: "validador",
              displayName: "Validador",
              id: "validador",
            });
          }

          var obj = result.reduce(function (acc, cur) {
            acc[cur.id] = cur;
            return acc;
          }, {});
          return obj;
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
    };
  }
}
