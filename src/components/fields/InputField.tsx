// Chakra imports
import {
  Flex,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components

export default function Default(props: {
  id: string;
  label: string;
  extra: JSX.Element;
  placeholder: string;
  type: string;
  mb: any;
  color: any;
  value: any;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const {
    id,
    label,
    extra,
    placeholder,
    type,
    value,
    onChange,
    name,
    mb,
    ...rest
  } = props;
  // Chakra Color Mode
  const textColorPrimary = props.color
    ? useColorModeValue("vaku.900", "white")
    : props.color;

  return (
    <Flex direction="column" mb={mb ? mb : "30px"}>
      <FormLabel
        display="flex"
        ms="10px"
        htmlFor={id}
        fontSize="sm"
        color={textColorPrimary}
        fontWeight="bold"
        _hover={{ cursor: "pointer" }}
      >
        {label}
        <Text as="sub" fontSize="sm" fontWeight="400" ms="2px">
          {extra}
        </Text>
      </FormLabel>
      <Input
        {...rest}
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        fontWeight="500"
        variant="main"
        placeholder={placeholder}
        _placeholder={{ fontWeight: "400", color: "secondaryGray.600" }}
        h="44px"
        maxH="44px"
      />
    </Flex>
  );
}
