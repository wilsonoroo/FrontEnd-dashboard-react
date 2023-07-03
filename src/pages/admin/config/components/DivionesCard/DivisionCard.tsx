import {
  Badge,
  Box,
  Button,
  Flex,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";

import { Divisiones } from "@/models/division/Disvision";
import { TipoDivision } from "@/models/tiposDivision/TipoDivision";
import CustomCard from "@components/card/Card";
import { HSeparator } from "@components/separator/Separator";
import { motion } from "framer-motion";
import { BodyCardDivision } from "./BodyCardDivision";
import { HeaderCardDivision } from "./HeaderCardDivision";

interface DivisionCardProps {
  index: number;
  item: { nombre: string; key: string; isEliminado: boolean; id: string };
  division: Divisiones | undefined;

  onClick?: (item: Divisiones) => void;
  onClickDetalle?: (item: Divisiones) => void;
  onClickConfig?: (item: Divisiones) => void;
}

const DivisionCard: React.FC<DivisionCardProps> = ({
  index,
  division,
  onClick,
  onClickDetalle,
  onClickConfig,
}) => {
  const shadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "none"
  );

  const getColorFromStatus = (status: string) => {
    switch (status) {
      case "contrato":
        return "purple";
      case "proyecto":
        return "amarilloVaku";
      case "area":
        return "azulVaku";
      default:
        return "gray";
    }
  };

  // Verificar si division es nulo antes de renderizar el componente
  if (!division) {
    return null; // O puedes renderizar un mensaje de carga o un comportamiento alternativo
  }

  return (
    <motion.div
      className="box"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 100, damping: 2 }}
    >
      <CustomCard
        key={index}
        m={3}
        onClick={() => {
          onClick(division);
        }}
        boxShadow={shadow}
        minWidth={{
          base: "flex",
          sm: "100%",
          md: "270px",
          lg: "270px",
          xl: "270px",
        }}
        maxWidth={{
          base: "flex",
          sm: "100%",
          md: "270px",
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
            gap="1"
            justifyContent="start"
            flexDirection="column"
            p={3}
          >
            {/* icono gerencia */}
            <HeaderCardDivision item={division} />
            {/* nombre y detalle */}
            <BodyCardDivision item={division} />
          </Flex>
          <HSeparator bg="gray.100" />

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
            <Badge
              variant="subtle"
              fontSize="0.6em"
              colorScheme={getColorFromStatus(
                (division.tipoDivision as TipoDivision)?.value || ""
              )}
            >
              {(division.tipoDivision as TipoDivision)?.label || ""}
            </Badge>
            <Spacer />
            <Button
              colorScheme="vaku.700"
              bg={"vaku.700"}
              variant="solid"
              size="sm"
              borderRadius={5}
              onClick={() => {
                if (onClickConfig) {
                  onClickConfig(division);
                }
              }}
            >
              Configurar
            </Button>
            <Button
              colorScheme="vaku.700"
              bg={"vaku.700"}
              variant="solid"
              size="sm"
              borderRadius={5}
              onClick={() => {
                if (onClickDetalle) {
                  onClickDetalle(division);
                }
              }}
            >
              Ver Detalle
            </Button>
            {/* <Switch id="isChecked" isChecked /> */}
          </Flex>
        </Box>
      </CustomCard>
    </motion.div>
  );
};

export default DivisionCard;
