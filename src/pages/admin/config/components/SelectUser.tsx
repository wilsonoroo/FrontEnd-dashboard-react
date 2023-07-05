import { Box } from "@chakra-ui/react";
import { CSSObject } from "@emotion/serialize";
import { useField, useFormikContext } from "formik";
import Select, {
  ClearIndicatorProps,
  ControlProps,
  GroupBase,
  SingleValueProps,
  components,
} from "react-select";
// import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import { StateManagerProps } from "node_modules/react-select/dist/declarations/src/useStateManager";
import { ItemUser } from "./ItemUser";

type MyOption = {
  label: string;
  value: string;
};

type GroupedOption = {
  label: string; // group label
  options: MyOption[];
};

export type Props = {
  name: string;
} & Omit<
  StateManagerProps<MyOption, false | true, GroupedOption>,
  "value" | "onChange"
>;
declare module "node_modules/react-select/dist/declarations/src/Select" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    user: any;
  }
}

const SingleValue = ({ children, ...props }: SingleValueProps<MyOption>) => {
  return (
    <components.SingleValue {...props}>aa{children}</components.SingleValue>
  );
};

const Control = ({ children, ...props }: ControlProps<MyOption, false>) => {
  const { user } = props.selectProps;

  const clearValue = () => {
    props.clearValue();
  };

  props.innerProps.onClick = (_e) => {};

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
            {!Array.isArray(user) && !props.menuIsOpen ? (
              <>
                <ItemUser
                  name={user.displayName}
                  displayName={user.displayName}
                  fotografia={{
                    url: user?.fotografia?.url,
                  }}
                  cargo={user.cargo}
                />
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

// const ClearIndicator = ({ ...props }: ClearIndicatorProps<MyOption, true>) => {
//   const {
//     children = <HiXMark />,
//     getStyles,
//     innerProps: { ref, ...restInnerProps },
//   } = props;
//   return (
//     <div
//       {...restInnerProps}
//       ref={ref}
//       style={getStyles("clearIndicator", props) as CSSProperties}
//     >
//       a<div style={{ padding: "0px 5px" }}>{children}</div>
//     </div>
//   );
// };

const FormikReactSelect = (props: Props) => {
  const { name, isMulti, ...restProps } = props;
  const [field] = useField(name);
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

  //get the value using flattenedOptions and field.value
  const value = flattenedOptions?.filter((o) => {
    const isArrayValue = Array.isArray(field.value);

    if (isArrayValue) {
      const values = field.value as Array<any>;
      return values.includes(o.value);
    } else {
      return field.value === o.value;
    }
  });

  const ClearIndicatorStyles = (
    base: CSSObject,
    state: ClearIndicatorProps<MyOption>
  ): CSSObject => ({
    ...base,
    cursor: "pointer",
    color: state.isFocused ? "blue" : "black",
  });

  return !isMulti ? (
    <Select
      {...restProps}
      className="basic-single"
      classNamePrefix="select"
      value={value || null}
      // onChange implementation
      isClearable={true}
      isSearchable
      placeholder={"Seleccione el usuario"}
      onMenuOpen={() => {
        if (!isMulti) {
          setFieldValue(name, []);
        }
      }}
      isMulti={isMulti}
      components={{
        Control,
        SingleValue,
        ValueContainer,
      }}
      onChange={(val) => {
        //here I used explicit typing but there maybe a better way to type the value.

        const _val = val as MyOption[] | MyOption;
        const isArray = Array.isArray(_val);
        if (isArray) {
          const values = _val.map((o) => o.value);
          setFieldValue(name, values);
        } else {
          setFieldValue(name, _val);
        }
      }}
    />
  ) : (
    <Select
      {...restProps}
      className="basic-single"
      classNamePrefix="select"
      value={value || null}
      // onChange implementation
      isClearable={true}
      isSearchable
      placeholder={"Seleccione el usuario"}
      onMenuOpen={() => {
        if (!isMulti) {
          setFieldValue(name, []);
        }
      }}
      isMulti={true}
      onChange={(val) => {
        //here I used explicit typing but there maybe a better way to type the value.

        const _val = val as MyOption[] | MyOption;
        const isArray = Array.isArray(_val);
        if (isArray) {
          const values = _val.map((o) => o.value);
          setFieldValue(name, values);
        } else {
          setFieldValue(name, _val);
        }
      }}
    />
  );
};

export default FormikReactSelect;
