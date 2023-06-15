// Chakra imports
import {
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
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

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex direction="column" mb={mb ? mb : "30px"}>
      <FormLabel
        display="flex"
        ms="10px"
        // htmlFor={id}
        fontSize="sm"
        color={textColorPrimary}
        fontWeight="bold"
        _hover={{ cursor: "pointer" }}
      >
        <>
          {label}
          <Text as="sub" fontSize="sm" fontWeight="400" ms="2px">
            {extra}
          </Text>
        </>
      </FormLabel>

      <InputGroup size="md">
        <Input
          {...rest}
          type={show ? "text" : "password"}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          fontWeight="500"
          variant="main"
          placeholder={placeholder}
          _placeholder={{ fontWeight: "400", color: "secondaryGray.600" }}
          h="44px"
          maxH="45px"
        />
        <InputRightElement width="4.5rem" borderRadius="16px">
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleClick}
            borderRadius="10px"
            marginEnd={2}
          >
            {show ? "Ocultar" : "Mostrar"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}
