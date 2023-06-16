import {
  Box,
  Flex,
  FormLabel,
  Spacer,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { Divisiones } from "@/models/division/Disvision";
import CustomCard from "@components/card/Card";
import { HSeparator } from "@components/separator/Separator";
import { motion } from "framer-motion";
import { BodyCardDivision } from "./BodyCardDivision";
import { HeaderCardDivision } from "./HeaderCardDivision";

interface DivisionCardProps {
  index: number;
  item: { nombre: string; key: string; isEliminado: boolean; id: string };
  division: Divisiones;

  onClick: (item: Divisiones) => void;
}

// })

//  export default function GerenciaCard(props: {

const DivisionCard: React.FC<DivisionCardProps> = ({
  index,

  division,
  onClick,
}) => {
  const shadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "none"
  );

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
            justifyContent={"start"}
            flexDirection={"column"}
            p={3}
          >
            {/* icono gerencia */}
            <HeaderCardDivision item={division} />
            {/* nombre y detalle */}
            <BodyCardDivision item={division} />
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
            <Spacer />
            <FormLabel htmlFor="isChecked">
              <Text
                color="vaku.700"
                isTruncated
                noOfLines={1}
                fontSize="sm"
                me="14px"
                pt={2}
              >
                {"Activo"}
              </Text>
            </FormLabel>
            <Switch id="isChecked" isChecked />
          </Flex>
        </Box>
      </CustomCard>
    </motion.div>
  );
};

export default DivisionCard;
