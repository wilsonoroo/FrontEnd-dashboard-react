import VakuModel from "@/models/Vaku";
import { useField, useFormikContext } from "formik";
import { StateManagerProps } from "node_modules/react-select/dist/declarations/src/useStateManager";
import Select, { GroupBase, components } from "react-select";

type GroupedOption<T> = {
  label: string; // group label
  options: T[];
};

export type Props<T extends VakuModel> = {
  nombre: string;
  single?: boolean;
  onChangeValue?: (newValue: T[] | T) => void;
} & Omit<
  StateManagerProps<T, false | true, GroupedOption<T>>,
  "value" | "onChange"
>;
declare module "node_modules/react-select/dist/declarations/src/Select" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {}
}

// const SingleValue = ({ children, ...props }: SingleValueProps<MyOption>) => {
//   return <components.SingleValue {...props}>{children}</components.SingleValue>;
// };

// const Control = ({ children, ...props }: ControlProps<MyOption, false>) => {
//   const { user } = props.selectProps;

//   return (
//     <>
//       <components.Control {...props}>
//         <Box
//           py={2}
//           px={2}
//           display={"flex"}
//           justifyContent={"space-between"}
//           w={"100%"}
//         >
//           <>
//             {console.log(user, props.innerProps)}
//             {!Array.isArray(user) && !props.menuIsOpen ? (
//               <>
//                 {user.nombre}
//                 {props.isMulti ?? children}

//                 {/* {children} */}
//                 {/* <components.ClearIndicator
//                   {...props}
//                   {...innerProps}
//                   isMulti={true}
//                 /> */}
//               </>
//             ) : (
//               children
//             )}
//           </>
//         </Box>
//       </components.Control>
//     </>
//   );
// };

export const ValueContainer = (props: any) => {
  return (
    <components.ValueContainer {...props}>
      {props.children}
    </components.ValueContainer>
  );
};

const FormikReactSelectClientes = <T extends VakuModel>(props: Props<T>) => {
  const {
    id,
    name,
    nombre,
    isMulti,
    placeholder,
    onChangeValue,
    options,
    single,
    ...restProps
  } = props;
  const [field] = useField(nombre);
  const { setFieldValue } = useFormikContext();

  //flatten the options so that it will be easier to find the value
  const flattenedOptions = props.options?.flatMap((o) => {
    const isNotGrouped = "value" in o;
    if (isNotGrouped) {
      return o;
    } else {
      return (o as GroupedOption<T>).options;
    }
  });

  const value = flattenedOptions?.filter((o: T) => {
    const isArrayValue = Array.isArray(field.value);

    if (isArrayValue) {
      if (field?.value.length > 0) {
        const values = field.value as Array<any>;
        return values.includes(o.value);
      } else {
        return false;
      }
    } else {
      if (field?.value) {
        return field?.value?.value === o.value;
      } else {
        return false;
      }
    }
  });

  const handleOnChange = (val: T[] | T) => {
    if (onChangeValue) {
      onChangeValue(val);
    }

    const isArray = Array.isArray(val);
    if (isArray) {
      const values = val.map((o) => o.value);
      setFieldValue(nombre, values);
    } else {
      setFieldValue(nombre, val);
      setFieldValue(nombre + "Id", val.id);
    }
  };

  //get the value using flattenedOptions and field.value

  return (
    <Select
      {...restProps}
      noOptionsMessage={() => "No se encontraron resultados"}
      className="basic-single"
      classNamePrefix="select"
      value={value[0] || null}
      options={options}
      // onChange implementation

      isClearable={false}
      isSearchable
      placeholder={placeholder}
      onMenuOpen={() => {
        if (!isMulti) {
          setFieldValue(nombre, []);
        }
      }}
      isMulti={false}
      onChange={(val: any) => handleOnChange(val)}
    />
  );
};

export default FormikReactSelectClientes;
