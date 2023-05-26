import VakuModel from "../Vaku";
import { Cuadrilla } from "../cuadrilla/Cuadrilla";
import { Dispositivos } from "../dispositivo/Dispositivo";
import { Fotografia } from "../fotografia/Fotografia";
import { Permisos } from "../permisos/Permisos";
import { Rol } from "../rol/Rol";

export interface UsuarioVaku extends VakuModel {
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
}
