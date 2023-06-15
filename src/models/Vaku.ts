import { CampoFormKey } from "@/utils/global";
import { Timestamp } from "firebase/firestore";

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

export interface ITransformObject {
  transformObject(object: any): void;
}

export default abstract class VakuModel
  implements
    IVakuModel,
    ISchemaValidation,
    IEmptyObject,
    IFormBuilder,
    IValidationSchema,
    ITransformObject
{
  transformObject() {
    return this;
  }
  id: string;
  nombre: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;

  get value(): string {
    return this.id;
  }
  get label(): string {
    return this.displayName;
  }

  abstract getValidationSchema(): any;
  abstract getFormBuilder(options?: any): any;
  abstract getEmptyObject(): any;
}

export class BaseModel extends VakuModel implements ITransformObject {
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
