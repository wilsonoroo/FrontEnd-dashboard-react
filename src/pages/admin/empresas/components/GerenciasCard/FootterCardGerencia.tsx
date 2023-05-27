import { Gerencia } from "@/models/gerencia/Gerencia";
import { Box, HStack, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

import * as Icons from "react-feather";
import {
  HiOutlineBuildingOffice2,
  HiOutlineDocumentChartBar,
  HiOutlineDocumentText,
} from "react-icons/hi2";

interface GerenciaCardProps {
  item: Gerencia;
}

const FotterCardGerencia: React.FC<GerenciaCardProps> = ({ item }) => {
  return (
    <Box alignItems={"center"}>
      <HStack direction={"column"}>
        <HStack direction={"row"}>
          {/* cant divisiones */}
          <Tag size={"md"} variant="subtle" colorScheme="gray">
            <TagLeftIcon boxSize="12px" as={Icons.UserPlus} />
            <TagLabel>{item.cantUsuarios}</TagLabel>
          </Tag>

          <Tag size={"md"} variant="subtle" colorScheme="verdevaku">
            <TagLeftIcon boxSize="12px" as={HiOutlineBuildingOffice2} />
            <TagLabel>{item.cantDivisiones}</TagLabel>
          </Tag>

          <Tag size={"md"} variant="subtle" colorScheme="rosavaku">
            <TagLeftIcon boxSize="12px" as={HiOutlineDocumentText} />
            <TagLabel>{item.cantDocumentos}</TagLabel>
          </Tag>
          <Tag size={"md"} variant="subtle" colorScheme="marronvaku">
            <TagLeftIcon boxSize="12px" as={HiOutlineDocumentChartBar} />
            <TagLabel>24</TagLabel>
          </Tag>
        </HStack>
      </HStack>
    </Box>
  );
};

export default FotterCardGerencia;
