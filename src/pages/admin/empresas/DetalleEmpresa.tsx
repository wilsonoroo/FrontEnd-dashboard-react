import {
  Box,
  Button,
  Flex,
  Grid,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi2";

import Loading from "@components/Loading";
import useFetch from "@hooks/useFetch";
import AgregarGerenciaForm from "@pages/admin/gerencias/components/AgregarGerenciaForm";
import { getGerenciasArray } from "@services/database/gerenciasServices";
import { useLocation, useParams } from "react-router-dom";
import GerenciaCard from "./components/GerenciasCard/GerenciaCard";
export default function DetalleEmpresa(props: { titulo: string }) {
  const { titulo } = props;
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataEmpresa, setDataEmpresa] = useState([]);
  const [listaGerencias, setListaGerencia] = useState([]);
  const {
    data: gerencias,
    firstLoading,
    refreshData,
    isLoading,
  } = useFetch(() => getGerenciasArray(id));

  useEffect(() => {
    setListaGerencia(gerencias);
  }, [gerencias]);

  const [dataGerencia, setDataGerencia] = useState({
    data: [],
    loading: false,
  });

  useEffect(() => {
    setDataGerencia({ data: gerencias, loading: isLoading });
  }, [gerencias]);

  const textColorDetails = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );

  const navigate = useLocation();

  return (
    <>
      <VStack align={"start"} pl={"20px"}>
        <Text
          as="b"
          fontSize="5xl"
          color={"vaku.700"}
          style={{ fontFamily: "'Oswald', sans-serif;" }}
          textStyle="secondary"
        >
          {titulo}
        </Text>

        <Flex width={"100%"} alignItems={"end"}>
          <Box>
            <Text
              fontSize="md"
              color={"secondaryGray.600"}
              mt={0}
              marginTop={"0px"}
            >
              {
                "En Esta seccion encontraras todas las gerencias configuradas en VAKU"
              }
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Button
              rightIcon={<HiPlus />}
              colorScheme="vaku.700"
              bg={"vaku.700"}
              variant="solid"
              size="md"
              borderRadius={25}
              onClick={onOpen}
            >
              Agregar Gerencia
            </Button>
          </Box>
        </Flex>
      </VStack>

      <Box pt={{ base: "30px", md: "83px", xl: "30px" }}>
        <Grid
          templateColumns={{
            base: "repeat(3, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
            "2xl": "repeat(4, 1fr)",
          }}
          templateRows={{
            base: "1fr",
            lg: "1fr",
            sm: "1fr",
          }}
          gap={{ base: "2", sm: "1", xl: "2" }}
        >
          {gerencias.map((item, index) => {
            return (
              <>
                <GerenciaCard
                  key={item.id + "-" + index}
                  index={index}
                  item={item}
                />
              </>
            );
          })}
          {/* <Grid> */}
          <>
            {/* {gerencias.map((item, index) => {
              return (
                <CustomCard key={index} m={3} boxShadow="md">
                  <Flex
                    minWidth="max-content"
                    alignItems="center"
                    gap="2"
                    justifyContent={"space-between"}
                  >
                    <HStack
                      flexDirection={"row"}
                      display={"flex"}
                      justifyContent={"start"}
                      alignItems="center"
                      direction={"row"}
                    >
                      {/* icono gerencia 
                      <Box pl={10} pr={10}>
                        <Avatar
                          bg="red.500"
                          icon={<HiOutlineBuildingOffice2 fontSize="1.5rem" />}
                        />
                      </Box>
                      {/* nombre y detalle 
                      <Box>
                        <Text
                          fontWeight="bold"
                          me="14px"
                          isTruncated={false}
                          noOfLines={2}
                        >
                          {item.nombre}
                        </Text>
                        <Text
                          color="secondaryGray.600"
                          fontSize={{
                            base: "sm",
                          }}
                          isTruncated
                          noOfLines={1}
                          fontWeight="400"
                          me="14px"
                        >
                          {item.nombre}
                        </Text>
                      </Box>
                      {/* cant usuarios 
                      <Box>
                        <Box>
                          <HStack spacing={5}>
                            <Icons.UserPlus color={"#CBD5E0"} size={18} />
                            <Text
                              color="secondaryGray.600"
                              fontSize={{
                                base: "sm",
                              }}
                              isTruncated
                              noOfLines={1}
                              fontWeight="400"
                              me="14px"
                            >
                              24
                            </Text>
                          </HStack>
                        </Box>
                      </Box>
                      {/* separador 
                      <Box>
                        <VSeparator
                          mx={{ base: "20px", xl: "20px", "2xl": "20px" }}
                          h={30}
                        />
                      </Box>
                      {/* cant divisiones 
                      <Box>
                        <Box>
                          <HStack spacing={5}>
                            <HiOutlineBuildingOffice2
                              color={"#CBD5E0"}
                              size={18}
                            />
                            <Text
                              color="secondaryGray.600"
                              fontSize={{
                                base: "sm",
                              }}
                              isTruncated
                              noOfLines={1}
                              fontWeight="400"
                              me="14px"
                            >
                              24
                            </Text>
                          </HStack>
                        </Box>
                      </Box>
                      {/* separador 
                      <Box>
                        <VSeparator
                          mx={{ base: "20px", xl: "20px", "2xl": "20px" }}
                          h={30}
                        />
                      </Box>
                      {/* cant documentos 
                      <Box>
                        <Box>
                          <HStack spacing={2}>
                            <HiOutlineDocumentText
                              color={"#CBD5E0"}
                              size={18}
                            />
                            <Text
                              color="secondaryGray.600"
                              fontSize={{
                                base: "sm",
                              }}
                              isTruncated
                              noOfLines={1}
                              fontWeight="400"
                              me="14px"
                            >
                              24
                            </Text>
                          </HStack>
                        </Box>
                      </Box>
                      {/* separadir
                      <Box>
                        <VSeparator
                          mx={{ base: "20px", xl: "20px", "2xl": "20px" }}
                          h={30}
                        />
                      </Box>
                      {/* cant otros docu 
                      <Box>
                        <Box>
                          <HStack spacing={2}>
                            <HiOutlineDocumentChartBar
                              color={"#CBD5E0"}
                              size={18}
                            />
                            <Text
                              color="secondaryGray.600"
                              fontSize={{
                                base: "sm",
                              }}
                              isTruncated
                              noOfLines={1}
                              fontWeight="400"
                              me="14px"
                            >
                              24
                            </Text>
                          </HStack>
                        </Box>
                      </Box>
                    </HStack>

                    <Box p="4">
                      <IconButton
                        colorScheme="vaku"
                        aria-label="Send email"
                        borderRadius={25}
                        isRound={false}
                        icon={<HiOutlineArrowSmallRight />}
                      />
                    </Box>
                  </Flex>
                </CustomCard>
              );
            })} */}
          </>
          {/* </Grid> */}

          <>{isLoading ? <Loading /> : <></>}</>
        </Grid>
      </Box>
      <AgregarGerenciaForm
        setDataGerencia={setDataGerencia}
        empresa={id}
        isOpen={isOpen}
        onClose={onClose}
        refreshData={refreshData}
      />
    </>
  );
}

//    const users =  Object.keys(dataEmpresa.usuarios.auth).map((key) => dataEmpresa.usuarios.auth[key]);

// console.log(users)
// const listaEmpresa = dataEmpresa ? Object.keys(dataEmpresa).map((key) => dataEmpresa[key]) : [];
// console.log(listaEmpresa)
// const { correlativo, documentos } = dataEmpresa;
// console.log(correlativo);
// console.log(documentos);
