import { CampoFormKey } from "@/utils/global";

export interface IVakuModel {
  readonly value: string;
  readonly label: string;
  id: string;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISchemaValidation {
  getValidationSchema(): any;
}

export interface IFormBuilder {
  getFormBuilder(): any;
}
export interface IEmptyObject {
  getEmptyObject(): any;
}
export interface IValidationSchema {
  getValidationSchema(): any;
}

export default abstract class VakuModel
  implements
    IVakuModel,
    ISchemaValidation,
    IEmptyObject,
    IFormBuilder,
    IValidationSchema
{
  id: string;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;

  get value(): string {
    return this.id;
  }
  get label(): string {
    return this.nombre;
  }

  abstract getValidationSchema(): any;
  abstract getFormBuilder(): any;
  abstract getEmptyObject(): any;
}

export class BaseModel extends VakuModel {
  getValidationSchema() {
    throw new Error("Method not implemented.");
  }

  getFormBuilder() {
    return {
      id: {
        display: "id",
        tipo: CampoFormKey.TEXT,
        field: "id",
        required: true,
      },
      nombre: {
        display: "Numero OT",
        tipo: CampoFormKey.TEXT,
        field: "nombre",
        required: true,
      },
    };
  }
  getEmptyObject() {
    return {
      id: "",
      nombre: "",
    };
  }
}