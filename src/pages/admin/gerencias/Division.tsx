import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import CustomCard from "@/components/card/Card";
import { DataTable } from "@/components/dataTable/DataTable";

import useFetch from "@/hooks/useFetch";
import { Divisiones } from "@/models/division/Disvision";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useEffect, useState } from "react";
import { BsListStars } from "react-icons/bs";
import { HiPlus } from "react-icons/hi2";
import { IoIosRefresh } from "react-icons/io";
import { useParams } from "react-router-dom";

export default function DivisionPage(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ordenSelect, setOrdenSelect] = useState<Divisiones>();

  const divisionRepository = new FirebaseRealtimeRepository<Divisiones>(
    `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones`
  );

  const {
    data: division,
    firstLoading: loading,
    refreshData,
    isLoading,
  } = useFetch(() => divisionRepository.getAll(Divisiones));

  useEffect(() => {
    console.log(
      "🚀 ~ file: Division.tsx:44 ~ DivisionPage ~ division:",
      division
    );
  }, []);

  const [isList, setIsList] = useState(true);

  const columnHelper = createColumnHelper<Divisiones>();

  const handleCambioEstado = (item: Divisiones) => {};

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => (
        <Box px={5}>
          <Tag
            bg={"#fb8500"}
            color="#fff"
            alignItems={"center"}
            alignContent={"center"}
            size={"sm"}
          >
            <TagLabel>{info.getValue()}</TagLabel>
          </Tag>
        </Box>
      ),
      header: "Código Seg.",
      size: 100,
      minSize: 120,
    }),
    columnHelper.accessor("nombre", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Cliente",
      size: 300,
      minSize: 250,
    }),
  ];

  return (
    <>
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
              {""}
            </Text>
          </Box>
          <Spacer />
          {/* Contenido de la tabla */}
          {/* encabezado */}
          <HStack>
            <HStack>
              {/* <Box>
                  <IconButtonn 
                    aria-label="Search database"
                    isActive={!isList}
                    bg="transparent"
                    onClick={() => {
                      setIsList(false);
                    }}
                    borderRadius={25}
                    icon={<BsFillGrid3X3GapFill />}
                  />
                </Box> */}
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
              <Box>
                <IconButton
                  aria-label="recargar"
                  isActive={isList}
                  bg="transparent"
                  onClick={() => {}}
                  borderRadius={25}
                  icon={<IoIosRefresh />}
                />
              </Box>
            </HStack>

            <Button
              rightIcon={<HiPlus />}
              colorScheme="orange.700"
              bg={"orange"}
              variant="solid"
              size="md"
              borderRadius={25}
              onClick={onOpen}
            >
              Agregar OT
            </Button>
          </HStack>
        </Flex>
      </VStack>
      <>
        {!loading ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <CustomCard>
              <DataTable columns={columns} data={division} />
            </CustomCard>
          </Box>
        ) : (
          <>Cargando..</>
        )}
      </>

      <Flex></Flex>
    </>
  );
}
