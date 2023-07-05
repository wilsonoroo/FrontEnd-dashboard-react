import { Gerencia } from "@/models/gerencia/Gerencia";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { Avatar, Box, Flex, Spacer, VStack } from "@chakra-ui/react";

import { HStack, Text, WrapItem } from "@chakra-ui/react";

export function BodyCardGerencia(props: { item: Gerencia }) {
  const { item } = props;

  return (
    <Box w={"100%"}>
      <Flex gap={3} flexDirection={"row"} alignItems={"flex-end"}>
        <Flex direction={"column"}>
          <HStack spacing={2}>
            <Text
              color="vaku.700"
              isTruncated
              noOfLines={1}
              fontSize="sm"
              fontWeight="700"
              me="14px"
              pt={2}
            >
              {item.ubicacion}
            </Text>
          </HStack>
        </Flex>
        <Spacer />

        <Flex direction={"column"}>
          <HStack spacing={2}>
            <WrapItem>
              <Avatar
                size="sm"
                name="Dan Abrahmov"
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
