import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Skeleton,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsFillGrid3X3GapFill, BsListStars } from "react-icons/bs";
import { HiPlus } from "react-icons/hi2";
import { IoIosRefresh } from "react-icons/io";
import { HSeparator } from "../separator/Separator";
import BreadcrumbVaku, { ItemBreadcrumbProps } from "./BreadCrumb";

interface HeaderProps {
  titulo: string;
  tituloBajo?: string | null;
  subtitulo: string;
  refreshData?: () => void;
  onOpen?: () => void;
  showButtonAdd?: boolean;
  rutas: ItemBreadcrumbProps[];
  textButton?: string;
  showButtonBars?: boolean;
  showDivision?: boolean;
}

const Headers: React.FC<HeaderProps> = ({
  titulo = "",
  subtitulo = "",
  tituloBajo = null,
  refreshData,
  onOpen,
  showButtonAdd = true,
  rutas,
  textButton = "Agregar",
  showButtonBars = true,
  showDivision = true,
}) => {
  const [isList, setIsList] = useState(false);
  return (
    <VStack align={"start"} pl={"20px"}>
      <BreadcrumbVaku rutas={rutas} />
      <Skeleton isLoaded={titulo !== "undefined"}>
        <Text
          as="b"
          fontSize="5xl"
          color={"vaku.700"}
          style={{ fontFamily: "'Oswald', sans-serif" }}
          textStyle="secondary"
        >
          {titulo}
        </Text>
      </Skeleton>

      {tituloBajo ? (
        <Skeleton isLoaded={titulo !== "undefined"}>
          <Text
            as="b"
            fontSize="xl"
            color={"vaku.700"}
            style={{ fontFamily: "'Oswald', sans-serif" }}
            textStyle="secondary"
            marginStart={0}
          >
            {tituloBajo}
          </Text>
        </Skeleton>
      ) : (
        <></>
      )}

      <Flex width={"100%"} alignItems={"end"}>
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
        <HStack>
          {showButtonBars ? (
            <HStack>
              {isList ? (
                <Box>
                  <IconButton
                    aria-label="Search database"
                    isActive={!isList}
                    bg="transparent"
                    onClick={() => {
                      setIsList(false);
                    }}
                    borderRadius={25}
                    icon={<BsFillGrid3X3GapFill />}
                  />
                </Box>
              ) : (
                <Box>
                  <IconButton
                    aria-label="Search database"
                    isActive={isList}
                    bg="transparent"
                    onClick={() => {
                      setIsList(true);
                    }}
                    borderRadius={25}
                    icon={<BsListStars />}
                  />
                </Box>
              )}

              <Box>
                <IconButton
                  aria-label="recargar"
                  isActive={isList}
                  bg="transparent"
                  onClick={() => {
                    refreshData();
                  }}
                  borderRadius={25}
                  icon={<IoIosRefresh />}
                />
              </Box>
            </HStack>
          ) : (
            <></>
          )}

          {showButtonAdd ? (
            <Button
              rightIcon={<HiPlus />}
              colorScheme="vaku.700"
              bg={"vaku.700"}
              variant="solid"
              size="md"
              borderRadius={25}
              onClick={onOpen}
            >
              {textButton}
            </Button>
          ) : (
            <></>
          )}
        </HStack>
      </Flex>
      {showDivision ? (
        <Box width={"100%"} pt={5}>
          <HSeparator bg={"gray.400"} />
        </Box>
      ) : (
        <></>
      )}
    </VStack>
  );
};

export default Headers;
