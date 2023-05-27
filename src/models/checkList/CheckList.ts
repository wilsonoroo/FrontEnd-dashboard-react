import { Configuracion } from "./Configuracion";

export interface Checklist {
  abreviatura: string;
  categoria: string;
  configuracion: Configuracion;
  descripcion: string;
  empresa: string;
  faena: string;
  id: string;
  instruccion: string;
  metadata: {
    fechaRevision: string;
    revision: string;
    urlImagen: string;
  };
  nombre: string;
  tag: string;
  tipo: string;
}
