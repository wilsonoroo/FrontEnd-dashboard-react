import { Box } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import Select, {
  ControlProps,
  GroupBase,
  SingleValueProps,
  components,
} from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

type MyOption = {
  id: any;
  label: string;
  value: string;
};

type GroupedOption = {
  label: string; // group label
  options: MyOption[];
};

export type Props = {
  nombre: string;
  onChangeValue?: (newValue: MyOption[] | MyOption) => void;
} & Omit<
  StateManagerProps<MyOption, false | true, GroupedOption>,
  "value" | "onChange"
>;
declare module "react-select/dist/declarations/src/Select" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    user: any;
  }
}

const SingleValue = ({ children, ...props }: SingleValueProps<MyOption>) => {
  return <components.SingleValue {...props}>{children}</components.SingleValue>;
};

const Control = ({ children, ...props }: ControlProps<MyOption, false>) => {
  const { user } = props.selectProps;

  return (
    <>
      <components.Control {...props}>
        <Box
          py={2}
          px={2}
          display={"flex"}
          justifyContent={"space-between"}
          w={"100%"}
        >
          <>
            {console.log(user, props.innerProps)}
            {!Array.isArray(user) && !props.menuIsOpen ? (
              <>
                {user.nombre}
                {props.isMulti ?? children}

                {/* {children} */}
                {/* <components.ClearIndicator
                  {...props}
                  {...innerProps}
                  isMulti={true}
                /> */}
              </>
            ) : (
              children
            )}
          </>
        </Box>
      </components.Control>
    </>
  );
};

export const ValueContainer = (props: any) => {
  return (
    <components.ValueContainer {...props}>
      {props.children}
    </components.ValueContainer>
  );
};

const FormikReactSelectClientes = (props: Props) => {
  const {
    id,
    name,
    nombre,
    isMulti,
    placeholder,
    onChangeValue,
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
      return o.options;
    }
  });

  const value = flattenedOptions?.filter((o) => {
    const isArrayValue = Array.isArray(field.value);

    if (isArrayValue) {
      const values = field.value as Array<any>;
      return values.includes(o.value);
    } else {
      return field.value?.value === o.value;
    }
  });

  const handleOnChange = (val: MyOption[] | MyOption) => {
    if (onChangeValue) onChangeValue(val);

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
      className="basic-single"
      classNamePrefix="select"
      value={value[0] || null}
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
      onChange={handleOnChange}
    />
  );
};

export default FormikReactSelectClientes;
