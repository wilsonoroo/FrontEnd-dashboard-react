import VakuModel from "../Vaku";
import { Documento } from "../documento/Documento";
import { UsuarioVaku } from "../usuario/Usuario";
import { Vehiculo } from "../vehiculo/Vehiculo";

export interface ContenidoDivision extends VakuModel {
  vehiculo: Vehiculo;
  usuarios: UsuarioVaku;
  usuarioRespuesta: [Documento];

  logs: [UsuarioVaku];
  documentos: Documento;
  correlativo: {
    numeral: string;
    prefijo: string;
  };
}
