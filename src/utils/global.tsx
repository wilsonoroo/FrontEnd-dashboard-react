import FormikReactSelectClientes from "@/components/select/SelectClientes";
import VakuModel from "@/models/Vaku";
import {
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
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
  single?: boolean;
  onChangeValue?: (newValue: any) => void;
}

export enum CampoFormKey {
  FECHA = "fecha",
  FECHA_NATIVO = "fecha_nativo",
  TEXT = "text",
  LIST = "lista",
  CHECKBOX = "checkbox",
  DROPDOWN = "dropdown",
  NUMBER = "number",
  EMAIL = "email",
  SWITCH = "switch",
}

export default {};

const generateInputField = (
  item: CampoForm,
  type: string,
  setFieldValue: {
    (field: string, value: any, shouldValidate?: boolean): void;
  }
) => (
  <>
    <FormLabel htmlFor={item.field}>{item.display}</FormLabel>
    <Field
      as={Input}
      id={item.field}
      name={item.field}
      type={type}
      onChange={
        type === "date"
          ? (event: any) => {
              const newDate = new Date(event.target.value);
              setFieldValue(item.field, newDate.toISOString().slice(0, 10));
            }
          : (event: any) => {
              setFieldValue(item.field, event.target.value);
            }
      }
      placeholder={`Ingresa ${item.display}`}
    />
  </>
);

const generateInputNumberFiels = (
  item: CampoForm,
  setFieldValue: {
    (field: string, value: any, shouldValidate?: boolean): void;
  }
) => {
  return (
    <>
      <FormLabel htmlFor={item.field}>{item.display}</FormLabel>
      <NumberInput id={item.field} name={item.field}>
        <NumberInputField
          id={item.field}
          name={item.field}
          placeholder={`Ingresa ${item.display}`}
          onChange={(v) => {
            setFieldValue(item.field, v.target.value);
          }}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
};

const generateCheckboxField = (item: CampoForm) => (
  <>
    <Field as={Checkbox} id={item.field} name={item.field} colorScheme="orange">
      {item.display}
    </Field>
  </>
);

const generateSwitchField = (item: CampoForm) => (
  <>
    <FormControl as={SimpleGrid} columns={{ base: 2, lg: 2 }}>
      <FormLabel htmlFor={item.field}>{item.display}</FormLabel>
      <Switch id={item.field} name={item.field} />
    </FormControl>
  </>
);

export class GenericCreator<T> {
  public create(c: new () => T): T {
    return new c();
  }
}

export function cleanObject<T>(obj: T): Partial<T> {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  return Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => {
        const cleanedValue = cleanObject(value);
        return [key, cleanedValue];
      })
      .filter(([_, value]) => value !== undefined)
  ) as Partial<T>;
}

export function getItemForm<T extends VakuModel>(
  item: CampoForm,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
) {
  if (item) {
    switch (item.tipo) {
      case CampoFormKey.FECHA:
      case CampoFormKey.FECHA_NATIVO:
        return generateInputField(item, "date", setFieldValue);
      case CampoFormKey.TEXT:
        return generateInputField(item, "text", setFieldValue);
      case CampoFormKey.NUMBER:
        return generateInputNumberFiels(item, setFieldValue);
      case CampoFormKey.DROPDOWN:
        return (
          <>
            <FormLabel htmlFor={item.field}>{item.display}</FormLabel>

            <FormikReactSelectClientes<T>
              nombre={item.field}
              id={item.field}
              name={item.field}
              isMulti={item?.isMulti}
              options={item?.options}
              onChangeValue={item.onChangeValue}
              placeholder={item.placeholder}
              single={item?.single}
              user={undefined}
            />
          </>
        );
      case CampoFormKey.CHECKBOX:
        return generateCheckboxField(item);
      case CampoFormKey.SWITCH:
        return generateSwitchField(item);
    }
  }
}
