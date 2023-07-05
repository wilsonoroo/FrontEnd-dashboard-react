import * as yup from "yup";
import VakuModel, { IFormBuilder } from "../Vaku";
import { Cuadrilla } from "../cuadrilla/Cuadrilla";
import { Rol } from "../rol/Rol";

export class Utils extends VakuModel implements IFormBuilder {
  cuadrillas: Cuadrilla[];
  usuarios: Rol[];
  vehiculos: CategoriaVehiculo[];

  getValidationSchema() {
    return yup.object().shape({
      patente: yup.string().required(),
    });
  }
  getEmptyObject() {}
  getFormBuilder(options: any = {}) {}
}

export class CategoriaVehiculo extends VakuModel {
  codigo: string;

  tiposVehiculo: TiposDeVehiculo[];

  getValidationSchema() {
    throw new Error("Method not implemented.");
  }
  getFormBuilder(options?: any) {
    throw new Error("Method not implemented.", options);
  }
  getEmptyObject() {
    throw new Error("Method not implemented.");
  }
}

export class TiposDeVehiculo extends VakuModel {
  codigo: string;

  getValidationSchema() {
    throw new Error("Method not implemented.");
  }
  getFormBuilder(options?: any) {
    throw new Error("Method not implemented.", options);
  }
  getEmptyObject() {
    throw new Error("Method not implemented.");
  }
}
