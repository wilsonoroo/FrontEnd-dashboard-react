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
import { SingleDatepicker } from "chakra-dayzed-datepicker";
// import { DatePicker } from "chakra-ui-date-input";

import { Field } from "formik";
import InputMask from "react-input-mask";

import { CreatableSelect, Select as SelectCH } from "chakra-react-select";
import moment from "moment";
import PermisosComponents, {
  PermisosComponentsMovil,
} from "./permisosComponents";

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
  uppercase?: boolean | null;
  seccion?: string;
}

export type EstadoLoading = {
  [key: string]: boolean;
};

export enum CampoFormKey {
  FECHA = "fecha",
  FECHA_NATIVO = "fecha_nativo",
  FECHA_CUSTOM = "fecha_custom",
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
  PERMISOS = "permisos",
  PERMISOS_MOVIL = "permisos_movil",
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
                setFieldValue(
                  item.field,
                  item.uppercase
                    ? event.target.value.toUpperCase()
                    : event.target.value
                );
              }
        }
        placeholder="Ingresa tu número de teléfono "
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
  },
  value: any
) => {
  return (
    <>
      <FormLabel htmlFor={item.field}>{item.display}</FormLabel>
      <Field
        as={Input}
        id={item.field}
        name={item.field}
        type={type}
        value={value}
        onChange={
          type === "date"
            ? (event: any) => {
                const newDate = moment.utc(event.target.value);
                setFieldValue(
                  item.field,
                  newDate.format("YYYY-MM-DD hh:mm:ss")
                );
              }
            : (event: any) => {
                setFieldValue(item.field, event.target.value);
              }
        }
        placeholder={`Ingresa ${item.display}`}
      />
    </>
  );
};

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

const generateSwitchField = (
  item: CampoForm,
  setFieldValue: any,
  value: boolean
) => (
  <>
    <FormControl
      as={SimpleGrid}
      columns={{ base: 2, lg: 2 }}
      alignContent={"center"}
      h={"100%"}
    >
      <FormLabel htmlFor={item.field}>{item.display}</FormLabel>
      <Switch
        id={item.field}
        name={item.field}
        isChecked={value}
        onChange={(e) => {
          setFieldValue(item.field, e.target.checked);
        }}
      />
    </FormControl>
  </>
);

export class GenericCreator<T> {
  public create(c: new () => T): T {
    return new c();
  }
}

export const getEstateText = (estado: string) => {
  switch (estado) {
    case "finalizado":
      return "Finalizado";
    case "finalizado_sin_plan_accion":
      return "Finalizado sin plan de accion";
    case "rechazado":
      return "Rechazado";
    case "rechazado_sin_plan_accion":
      return "Rechazado sin plan de accion";
    case "doc_sin_problemas":
      return "En Espera de validación\n(sin observaciones)";
    case "doc_con_problemas":
      return "En Espera de validación\n(con observaciones)";
    case "pendiente_doble_chequeo":
      return "En Espera de doble chequeo";
    case "pendiente_validar":
      return "En Espera de validación";
    case "generado":
      return "Doc registrado";
    case "validado":
      return "Validado";

    default:
      return "";
  }
};

export const getEstateColorAndText = (estado: string) => {
  switch (estado) {
    case "finalizado":
      return { color: "green", text: "finalizado", bg: "#9CFF00" };
    case "finalizado_sin_plan_accion":
      return { color: "green", text: "finalizado", bg: "#9CFF00" };
    case "rechazado":
      return { color: "red", text: "Rechazado" };
    case "rechazado_sin_plan_accion":
      return { color: "red", text: "Rechazado sin plan acción" };
    case "doc_sin_problemas":
      return {
        color: "yellow",
        text: "En Espera de validación",
        bg: "#FFE90D",
      };
    case "doc_con_problemas":
      return {
        color: "yellow",
        text: "En Espera de validación",
        bg: "#FFE90D",
      };
    case "pendiente_validar":
      return {
        color: "yellow",
        text: "En Espera de validación",
        bg: "#FFE90D",
      };
    case "pendiente_doble_chequeo":
      return {
        color: "yellow",
        text: "En Espera de doble chequeo",
        bg: "#FFE90D",
      };
    case "generado":
      return { color: "blue", text: "registrado" };
    case "validado":
      return { color: "blue", text: "Validado" };

    default:
      return { color: "blue", text: "..." };
  }
};

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

export function dateToTimeStamp(date: Date | string) {
  let resuult;
  if (typeof date === "string") {
    resuult = new Date(date as string);
    // resuult = firebaseTimeStamp.fromDate(new Date(date as string));
  } else if (typeof date === "object") {
    resuult = new Date(date as Date);
    // resuult = firebaseTimeStamp.fromDate(date as Date);
  }
  return resuult;
}

export function getItemForm<T extends VakuModel>(
  item: CampoForm,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
  value: any
) {
  console.log("🚀 ~ file: global.tsx:309 ~ value:", value);
  if (item) {
    switch (item.tipo) {
      case CampoFormKey.FECHA:
      case CampoFormKey.FECHA_NATIVO:
        return generateInputField(item, "date", setFieldValue, value);
      case CampoFormKey.TEXT:
        return generateInputField(item, "text", setFieldValue, value);
      case CampoFormKey.TEXT_V2:
        return generateInputFieldText(item, "text", setFieldValue, item.mask);
      case CampoFormKey.NUMBER:
        return generateInputNumberFiels(item, setFieldValue);
      case CampoFormKey.DROPDOWN_V2:
        let valueFinal;
        if (item.isMulti) {
          var result = [];
          for (var key in value) {
            if (value.hasOwnProperty(key)) {
              result.push(value[key]);
            }
          }
          valueFinal = result;
        } else if (item.single) {
          valueFinal = item.options.find((option) => {
            if (option) {
              return option.nombre === value;
            } else {
              return false;
            }
          });
        } else {
          valueFinal = value;
        }
        return (
          <>
            <FormLabel htmlFor={item.field}>{item.display}</FormLabel>
            <SelectCH
              isMulti={item?.isMulti}
              id={item.field}
              name={item.field}
              value={valueFinal}
              selectedOptionStyle="check"
              onChange={(v) => {
                if (typeof item.onChangeValue !== "undefined") {
                  if (!item.single) {
                    item.onChangeValue(v);
                  } else {
                    item.onChangeValue(v.nombre);
                  }
                }

                if (!item.single) {
                  if (
                    typeof item.typeField === "undefined" ||
                    !(item.typeField === TypeField.Object)
                  ) {
                    setFieldValue(item.field, v);
                  } else {
                    try {
                      const values = item.transform(v);

                      setFieldValue(item.field, values);
                    } catch (e) {
                      console.error("transform no ha sido implementado");
                    }
                  }
                } else {
                  setFieldValue(item.field, v.nombre);
                }
              }}
              getOptionLabel={(option) => option.displayName}
              getOptionValue={(option) => option.nombre}
              colorScheme="green"
              options={item?.options}
              placeholder={item.placeholder}
            />
          </>
        );
      case CampoFormKey.CREATE_SELECT:
        let valueFinalCreate: any = {
          label: value,
          value: value,
        };
        return (
          <>
            <FormLabel htmlFor={item.field}>{item.display}</FormLabel>
            <CreatableSelect
              isMulti={item?.isMulti}
              id={item.field}
              value={valueFinalCreate}
              formatCreateLabel={(inputValue) => `Crear ${inputValue}`}
              noOptionsMessage={() => "No hay opciones"}
              name={item.field}
              onChange={(v) => {
                console.log("🚀 ~ file: global.tsx:396 ~ v:", v);

                if (typeof item.onChangeValue !== "undefined") {
                  if (!item.single) {
                    item.onChangeValue(v);
                  } else {
                    item.onChangeValue(v.label);
                  }
                }

                if (!item.single) {
                  if (
                    typeof item.typeField === "undefined" ||
                    !(item.typeField === TypeField.Object)
                  ) {
                    setFieldValue(item.field, v);
                  } else {
                    try {
                      const values = item.transform(v);

                      setFieldValue(item.field, values);
                    } catch (e) {
                      console.error("transform no ha sido implementado");
                    }
                  }
                } else {
                  setFieldValue(item.field, v.label);
                }
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
        return generateSwitchField(item, setFieldValue, value);
      case CampoFormKey.FECHA_CUSTOM: {
        return (
          <>
            <FormLabel htmlFor={item.field}>{item.display}</FormLabel>
            <SingleDatepicker
              name={item.field}
              id={item.field}
              date={moment(value).toDate()}
              onDateChange={(date: Date) => {
                setFieldValue(item.field, date);
              }}
              configs={{
                dateFormat: "dd-MM-yyyy",
                dayNames: ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"], // length of 7
                monthNames: [
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                ], // length of 12
                firstDayOfWeek: 0, // default is 0, the dayNames[0], which is Sunday if you don't specify your own dayNames,
              }}
            />
          </>
        );
      }
      case CampoFormKey.PERMISOS: {
        return (
          <PermisosComponents
            item={item}
            value={value}
            onChange={(permisos) => {
              setFieldValue(item.field, permisos);
            }}
          />
        );
      }
      case CampoFormKey.PERMISOS_MOVIL: {
        return (
          <PermisosComponentsMovil
            item={item}
            value={value}
            onChange={(permisos) => {
              setFieldValue(item.field, permisos);
            }}
          />
        );
      }
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

export function transformedObject(array: any[], key: string) {
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
