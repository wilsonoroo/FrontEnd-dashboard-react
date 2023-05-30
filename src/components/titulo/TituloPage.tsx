import { Box, Flex, Spacer, Text, VStack } from "@chakra-ui/react";

export type TituloPageProps = {
  titulo: string;
  subtitulo: string;
};

export default function TituloPage({ titulo, subtitulo }: TituloPageProps) {
  return (
    <VStack align={"start"} pl={"20px"}>
      <Text
        as="b"
        fontSize="5xl"
        color={"vaku.700"}
        fontFamily="Oswald"
        textStyle="secondary"
      >
        {titulo}
      </Text>

      <Flex width={"100%"} alignItems={"end"}>
        {/* titulo de la tabla  */}
        <Box>
          <Text
            fontSize="md"
            color={"secondaryGray.600"}
            mt={0}
            marginTop={"0px"}
          >
            {subtitulo}
          </Text>
        </Box>
        <Spacer />
        {/* Contenido de la tabla */}
        {/* encabezado */}
      </Flex>
    </VStack>
  );
}
