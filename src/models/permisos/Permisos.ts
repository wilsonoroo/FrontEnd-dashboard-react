import { Permiso } from "./Permiso";

export interface Permisos {
  administrador: Permiso;
  creador_checklist: Permiso;
  creador_is: Permiso;
  planificador: Permiso;
  responsable: Permiso;
  validador: Permiso;
}
