import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";

import CustomCard from "@/components/card/Card";

import { HiPlus } from "react-icons/hi2";
import { IoIosRefresh } from "react-icons/io";

interface TableLayoutProps {
  children: React.ReactNode;
  titulo: string;
  textButtonAdd: string;
  onOpen: () => void;
  onReload: () => void;
  hiddenButtonAdd?: boolean;
  debug?: boolean;
  hiddenTitulo?: boolean;
}

const TableLayout: React.FC<TableLayoutProps> = ({
  titulo,
  children,
  textButtonAdd,
  onOpen,
  onReload,
  hiddenButtonAdd = false,

  hiddenTitulo = false,
}) => {
  return (
    <CustomCard>
      <Flex>
        <Box p="4">
          {!hiddenTitulo ? (
            <Text as="b" fontSize="3xl" color={"vaku.700"} fontFamily="Oswald">
              {titulo}
            </Text>
          ) : (
            <></>
          )}
        </Box>
        <Spacer />
        <Box p="4">
          <HStack spacing={4}>
            <Box>
              <IconButton
                aria-label="recargar"
                bg="transparent"
                onClick={onReload}
                borderRadius={25}
                size="lg"
                icon={<IoIosRefresh />}
              />
            </Box>
            {!hiddenButtonAdd ? (
              <Button
                rightIcon={<HiPlus />}
                colorScheme="orange.700"
                bg={"#0B79F4"}
                variant="solid"
                size="md"
                borderRadius={25}
                onClick={onOpen}
              >
                {textButtonAdd}
              </Button>
            ) : (
              <></>
            )}
          </HStack>
        </Box>
      </Flex>
      {children}
    </CustomCard>
  );
};

export default TableLayout;
