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
import InputMask from "react-input-mask";

import { CreatableSelect, Select as SelectCH } from "chakra-react-select";

export enum TypeField {
  Object = "object",
  Array = "array",
}
export interface CampoForm {
  display: string;
  field?: string;
  tipo: CampoFormKey;
  placeholder?: string;
  value?: any;
  options?: any[];
  isMulti?: boolean;
  single?: boolean;
  typeField?: TypeField;
  transform?: (value: any) => any;
  onChangeValue?: (newValue: any) => void;
  mask?: null | string;
}

export enum CampoFormKey {
  FECHA = "fecha",
  FECHA_NATIVO = "fecha_nativo",
  TEXT = "text",
  TEXT_V2 = "textV2",
  LIST = "lista",
  CHECKBOX = "checkbox",
  DROPDOWN = "dropdown",
  DROPDOWN_V2 = "dropdown_v2",
  CREATE_SELECT = "create_select",
  NUMBER = "number",
  EMAIL = "email",
  SWITCH = "switch",
}

export default {};

const generateInputFieldText = (
  item: CampoForm,
  type: string,
  setFieldValue: {
    (field: string, value: any, shouldValidate?: boolean): void;
  },
  mask?: null | string
) => {
  return (
    <>
      <FormLabel htmlFor={item.field}>{item.display}</FormLabel>

      <Field
        id={item.field}
        name={item.field}
        mask={mask}
        type={type}
        item={item}
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
        placeholder="Ingresa tu número de teléfono"
        component={MaskedInput}
      />
    </>
  );
};

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
              console.log(event.target.value);
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
      case CampoFormKey.TEXT_V2:
        return generateInputFieldText(item, "text", setFieldValue, item.mask);
      case CampoFormKey.NUMBER:
        return generateInputNumberFiels(item, setFieldValue);
      case CampoFormKey.DROPDOWN_V2:
        return (
          <>
            <FormLabel htmlFor={item.field}>{item.display}</FormLabel>
            <SelectCH
              isMulti={item?.isMulti}
              id={item.field}
              name={item.field}
              selectedOptionStyle="check"
              onChange={(v) => {
                console.log(v, typeof item!.onChangeValue);
                if (typeof item.onChangeValue !== "undefined") {
                  if (!item.single) {
                    item.onChangeValue(v);
                  } else {
                    item.onChangeValue(v.label);
                  }
                }
                console.log(!item.single);
                if (!item.single) {
                  if (
                    typeof item.typeField === "undefined" ||
                    !(item.typeField === TypeField.Object)
                  ) {
                    setFieldValue(item.field, v);
                  } else {
                    const finalValue =
                      typeof item.transform === "undefined"
                        ? v
                        : item.transform(v);
                    //transformedObject
                    console.log(
                      "🚀 ~ file: global.tsx:228 ~ finalValue:",
                      finalValue
                    );
                    setFieldValue(item.field, finalValue);
                  }
                } else {
                  console.log(v.label);
                  setFieldValue(item.field, v.label);
                }
              }}
              colorScheme="green"
              options={item?.options}
              placeholder={item.placeholder}
            />
          </>
        );
      case CampoFormKey.CREATE_SELECT:
        return (
          <>
            <FormLabel htmlFor={item.field}>{item.display}</FormLabel>
            <CreatableSelect
              isMulti={item?.isMulti}
              id={item.field}
              formatCreateLabel={(inputValue) => `Crear ${inputValue}`}
              noOptionsMessage={() => "No hay opciones"}
              name={item.field}
              onChange={(v) => {
                console.log(v, typeof item!.onChangeValue);
                if (typeof item.onChangeValue !== "undefined") {
                  item.onChangeValue(v);
                }

                setFieldValue(item.field, v);
              }}
              colorScheme="green"
              options={item?.options}
              placeholder={item.placeholder}
            />
          </>
        );
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

interface CustomInputProps {
  item: any;
  type: string;
  setFieldValue: {
    (field: string, value: any, shouldValidate?: boolean): void;
  };
}

function transformedObject(array: any[], key: string) {
  const transformedObject = array.reduce((obj, item) => {
    obj[item[key]] = item;
    return obj;
  }, {});
  return transformedObject;
}

interface MaskedInputProps {
  field: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    value: string;
  };
  item: CampoForm;
  mask: string;
  type: string;
  placeholder: string;
  id: string;
  name: string;
}

const MaskedInput: React.FC<MaskedInputProps> = ({
  field: { onChange, onBlur, value },
  item,
  mask,
  type,
  ...props
}) => {
  console.log("🚀 ~ file: global.tsx:299 ~ field:", props, mask);

  return (
    <InputMask
      maskPlaceholder=" "
      mask={mask}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    >
      <Input
        id={props.id}
        name={props.name}
        placeholder={`Ingresa ${item.display}`}
        type={type}
      />
    </InputMask>
  );
};
