import { Gerencia } from "@/models/gerencia/Gerencia";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

export function HeaderCardGerencia(props: { item: Gerencia }) {
  const { item } = props;
  return (
    <Box w={"100%"}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Text
          as="b"
          fontSize="2xl"
          me="14px"
          color={"celesteVaku.500"}
          style={{ fontFamily: "'Oswald', sans-serif;" }}
          textStyle="secondary"
        >
          {item.nombre}
        </Text>
        <Spacer />
      </Flex>
    </Box>
  );
}
