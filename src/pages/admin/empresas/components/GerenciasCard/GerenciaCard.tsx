import { Box, Button, Flex, Spacer, useColorModeValue } from "@chakra-ui/react";

import { HiChevronRight } from "react-icons/hi2";

import { Gerencia } from "@/models/gerencia/Gerencia";
import CustomCard from "@components/card/Card";
import { HSeparator } from "@components/separator/Separator";
import { BodyCardGerencia } from "./BodyCardGerencia";

import { motion } from "framer-motion";
import FotterCardGerencia from "./FootterCardGerencia";
import { HeaderCardGerencia } from "./HeaderCardGerencia";

interface GerenciaCardProps {
  index: number;
  item: { nombre: string; key: string; isEliminado: boolean; id: string };
  gerencia: Gerencia;
  onClick: (item: Gerencia) => void;
}

// })

//  export default function GerenciaCard(props: {

const GerenciaCard: React.FC<GerenciaCardProps> = ({
  index,

  gerencia,
  onClick,
}) => {
  const shadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "none"
  );

  return (
    <motion.div
      className="box"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 100, damping: 5 }}
    >
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
            <BodyCardGerencia item={gerencia} />
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
            <FotterCardGerencia item={gerencia} />
            <Spacer />
            <Button
              rightIcon={<HiChevronRight />}
              colorScheme="vaku.700"
              bg={"vaku.700"}
              variant="solid"
              size="sm"
              borderRadius={5}
              onClick={() => {
                if (onClick) {
                  onClick(gerencia);
                }
              }}
            >
              Ver Mas
            </Button>
          </Flex>
        </Box>
      </CustomCard>
    </motion.div>
  );
};

export default GerenciaCard;
