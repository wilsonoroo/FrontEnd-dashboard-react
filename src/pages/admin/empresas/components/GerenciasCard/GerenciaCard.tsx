import { Box, Button, Flex, Spacer, useColorModeValue } from "@chakra-ui/react";

import { HiChevronRight } from "react-icons/hi2";

import CustomCard from "@components/card/Card";
import { HSeparator } from "@components/separator/Separator";
import { BodyCardGerencia } from "./BodyCardGerencia";
import { FotterCardGerencia } from "./FootterCardGerencia";
import { HeaderCardGerencia } from "./HeaderCardGerencia";

export default function GerenciaCard(props: {
  index: number;
  item: { nombre: string };
}) {
  const shadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "none"
  );
  const { index, item } = props;
  return (
    <CustomCard
      key={index}
      m={3}
      boxShadow={shadow}
      minWidth={{
        base: "flex",
        sm: "100%",
        md: "370px",
        lg: "370px",
        xl: "370px",
      }}
      maxWidth={{
        base: "flex",
        sm: "100%",
        md: "370px",
        lg: "100%",
        xl: "100%",
      }}
      p={0}
      _hover={{ shadow: "lg" }}
    >
      <Box>
        <Flex
          minWidth={300}
          alignItems="start"
          gap="2"
          justifyContent={"start"}
          flexDirection={"column"}
          p={3}
        >
          {/* icono gerencia */}
          <HeaderCardGerencia />
          {/* nombre y detalle */}
          <BodyCardGerencia item={item} />
        </Flex>
        <HSeparator bg={"gray.100"} />

        <Flex
          minWidth="max-content"
          alignItems="center"
          gap="2"
          p={3}
          display={{
            base: "flex",
            sm: "grid",
            md: "grid",
            lg: "flex",
            xl: "flex",
          }}
        >
          <FotterCardGerencia item={item} />
          <Spacer />
          <Button
            rightIcon={<HiChevronRight />}
            colorScheme="vaku.700"
            bg={"vaku.700"}
            variant="solid"
            size="sm"
            borderRadius={5}
          >
            Ver Mas
          </Button>
        </Flex>
      </Box>
    </CustomCard>
  );
}
