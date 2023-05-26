import FormikReactSelectClientes from "@/components/select/SelectClientes";
import { Checkbox, FormLabel, Input } from "@chakra-ui/react";
// import { DatePicker } from "chakra-ui-date-input";
import { Field } from "formik";

export interface CampoForm {
  display: string;
  field?: string;
  tipo: CampoFormKey;
  placeholder?: string;
  value?: any;
  options?: any[];
  isMulti?: boolean;
  onChangeValue?: (newValue: any) => void;
}

export enum CampoFormKey {
  FECHA = "fecha",
  FECHA_NATIVO = "fecha_nativo",
  TEXT = "text",
  LIST = "lista",
  CHECKBOX = "checkbox",
  DROPDOWN = "dropdown",
}

export default {};

const generateInputField = (item: CampoForm, type: string) => (
  <>
    <FormLabel htmlFor={item.field}>{item.display}</FormLabel>
    <Field
      as={Input}
      id={item.field}
      name={item.field}
      type={type}
      placeholder={`Ingresa ${item.display}`}
    />
  </>
);

const generateCheckboxField = (item: CampoForm) => (
  <>
    <Field as={Checkbox} id={item.field} name={item.field} colorScheme="orange">
      {item.display}
    </Field>
  </>
);

export function getItemForm(item: CampoForm) {
  switch (item.tipo) {
    case CampoFormKey.FECHA:
    case CampoFormKey.FECHA_NATIVO:
      return generateInputField(item, "date");
    case CampoFormKey.TEXT:
      return generateInputField(item, "text");
    case CampoFormKey.DROPDOWN:
      return (
        <>
          <FormLabel htmlFor={item.field}>{item.display}</FormLabel>

          <FormikReactSelectClientes
            nombre="cliente"
            id={item.field}
            name={item.field}
            isMulti={item?.isMulti}
            options={item?.options}
            onChangeValue={item.onChangeValue}
            placeholder={item.placeholder}
          />
        </>
      );
    case CampoFormKey.CHECKBOX:
      return generateCheckboxField(item);
  }
}
