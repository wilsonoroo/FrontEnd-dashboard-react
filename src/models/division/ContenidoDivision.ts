import VakuModel from "../Vaku";
import { DocumentoVaku } from "../documento/Documento";

import { UsuarioVaku } from "../usuario/Usuario";
import { Vehiculo } from "../vehiculo/Vehiculo";

export interface ContenidoDivision extends VakuModel {
  vehiculo: Vehiculo;
  usuarios: UsuarioVaku;
  usuarioRespuesta: [DocumentoVaku];

  logs: [UsuarioVaku];
  documentos: DocumentoVaku;
  correlativo: {
    numeral: string;
    prefijo: string;
  };
}
