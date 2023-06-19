import { Divisiones } from "@/models/division/Disvision";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { Avatar, Box, Flex, Spacer, VStack } from "@chakra-ui/react";

import { HStack, Text, WrapItem } from "@chakra-ui/react";

export function BodyCardDivision(props: { item: Divisiones }) {
  const { item } = props;
  // console.log(typeof item.createdAt)

  return (
    <Box w={"100%"} marginTop={"8"}>
      <Box marginBottom={"0"} marginTop={"0"}></Box>
      <Flex gap={3} flexDirection={"row"} alignItems={"flex-end"}>
        <Flex direction={"column"}>
          <VStack spacing={0} align={"flex-start"}>
            <Text
              color="secondaryGray.600"
              isTruncated
              noOfLines={1}
              fontSize="sm"
              fontWeight="400"
              mt={1}
              marginTop={"0px"}
            >
              {"Código"}
            </Text>
            <Text
              color="vaku.700"
              isTruncated
              noOfLines={1}
              fontSize="sm"
              fontWeight="700"
              me="0"
              pt={0}
            >
              {item.codigo}
            </Text>
          </VStack>
        </Flex>
        <Spacer />

        <Flex direction={"column"}>
          <HStack spacing={2}>
            <WrapItem>
              <Avatar
                size="sm"
                name="Dan Abrahmov"
                bg="azulVaku"
                src={(item?.responsable as UsuarioVaku)?.fotografia?.url}
              />
            </WrapItem>
            <VStack alignItems={"flex-start"} spacing={0}>
              <Text
                color="vaku.700"
                isTruncated
                noOfLines={1}
                fontSize="sm"
                fontWeight="700"
                me="14px"
              >
                {(item?.responsable as UsuarioVaku)?.displayName}
              </Text>
              <Text
                color="secondaryGray.600"
                isTruncated
                noOfLines={1}
                fontSize="sm"
                fontWeight="400"
                mt={1}
                marginTop={"0px"}
              >
                {"Encargado"}
              </Text>
            </VStack>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
