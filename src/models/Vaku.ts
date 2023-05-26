import { CampoFormKey } from "@/utils/global";
import * as yup from "yup";

interface IVakuModel {
  readonly value: string;
  readonly label: string;
  id: string;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ISchemaValidation {
  getValidationSchema(): any;
}

export default class VakuModel implements IVakuModel, ISchemaValidation {
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

  getValidationSchema() {
    return yup.object().shape({
      id: yup.string().required(),
      nombre: yup.string().required(),
    });
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
