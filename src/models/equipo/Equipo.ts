import { MetaData } from "./MetaData";

export interface Equipo {
  categoria: string;
  id: string;
  identificador: string;
  isEliminado: boolean;
  isServicio: boolean;
  marca: string;
  metadata: MetaData[];
  modelo: string;
  tipo: string;
}
