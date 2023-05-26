import VakuModel from "../Vaku";

export interface Vehiculo extends VakuModel {
  fechaVencimiento: string;
  isEliminado: boolean;
  isServicio: boolean;
  kilometraje: string;
  marca: string;
  modelo: string;
  numeroInterno: string;
  patente: string;
  proximaMantencion: string;
  tipo: string;
  tipoVehiculo: string;
  ultimaMantencion: string;
}
