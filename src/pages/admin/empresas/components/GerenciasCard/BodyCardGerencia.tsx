import { Avatar, Box, Flex, Spacer } from "@chakra-ui/react";

import { HStack, Text, WrapItem } from "@chakra-ui/react";

import { HiOutlineCalendarDays } from "react-icons/hi2";
export function BodyCardGerencia(props: { item: { nombre: string } }) {
  const { item } = props;
  return (
    <Box>
      <Text
        fontWeight="bold"
        me="14px"
        isTruncated={false}
        noOfLines={2}
        fontSize="xl"
        pb={5}
        color="vaku.700"
      >
        {item.nombre}
      </Text>
      <Flex gap={3} flexDirection={"row"}>
        <Flex direction={"column"}>
          <HStack spacing={2}>
            <Text
              color="secondaryGray.600"
              isTruncated
              noOfLines={1}
              fontSize="sm"
              fontWeight="400"
              me="14px"
            >
              {"Encargado"}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <WrapItem>
              <Avatar
                size="sm"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              />
            </WrapItem>
            <Text
              color="vaku.700"
              isTruncated
              noOfLines={1}
              fontSize="sm"
              fontWeight="700"
              me="14px"
            >
              {"Javier Malebran"}
            </Text>
          </HStack>
        </Flex>
        <Spacer />
        <Flex direction={"column"}>
          <HStack spacing={2}>
            <Text
              color="secondaryGray.600"
              isTruncated
              noOfLines={1}
              fontSize="sm"
              fontWeight="400"
              me="14px"
            >
              {"Fecha Creacion"}
              {}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <HiOutlineCalendarDays color={"#003c7c"} size={18} />
            <Text
              color="vaku.700"
              isTruncated
              noOfLines={1}
              fontSize="sm"
              fontWeight="700"
              me="14px"
              pt={2}
            >
              {"11-03-2013 "}
              {}
            </Text>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
