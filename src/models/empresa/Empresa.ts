import { UsuarioVaku } from "@/model/user";
import VakuModel from "../Vaku";

class Empresa extends VakuModel {
  encargado: UsuarioVaku;
  cantUsuarios: number;
  cantGerencia: number;
  cantDivisiones: number;
  cantDocumentos: number;
  usuarios: UsuarioVaku[];
}
