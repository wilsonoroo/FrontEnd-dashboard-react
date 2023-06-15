import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  HStack,
  IconButton,
  Spacer,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { HiPlus } from "react-icons/hi2";

import FormVaku from "@/components/forms/FormVaku";
import Loading from "@/components/Loading";
import { Gerencia } from "@/models/gerencia/Gerencia";
import { AuthUser } from "@/models/usuario/AuthUser";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import empty from "@assets/empty.png";
import useFetch from "@hooks/useFetch";
import { getGerenciasArray } from "@services/database/gerenciasServices";
import { useEffect, useState } from "react";
import { BsFillGrid3X3GapFill, BsListStars } from "react-icons/bs";
import { IoIosRefresh } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import GerenciaCard from "./components/GerenciasCard/GerenciaCard";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemAnim = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function DetalleEmpresa(props: { titulo: string }) {
  const { titulo } = props;
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [isList, setIsList] = useState(false);
  const [options, setOptions] = useState({});

  const toast = useToast();

  const newGerencia = new Gerencia();
  const empresaRepository = new FirebaseRealtimeRepository(
    `empresaCompact/${id}/gerencias`
  );

  useEffect(() => {
    const getUsuarios = async () => {
      const db = new FirebaseRealtimeRepository<AuthUser>("auth");
      const result = await db.getAll(AuthUser);
      setOptions({ responsable: result });
    };
    getUsuarios();
  }, []);
  const navigate = useNavigate();
  const {
    data: gerencias,
    firstLoading,
    refreshData,
    isLoading,
  } = useFetch(() => getGerenciasArray(id));

  const handleClick = (item: any) => {
    navigate("/admin/empresas/" + id + "/" + item.id, { state: { item } });
  };

  const handleSaveGerencia = (data: Gerencia) => {
    setLoading(true);
    empresaRepository
      .add(null, data)
      .then(() => {
        toast({
          title: `Se ha creado la gerencia con éxito `,
          position: "top",
          status: "success",
          isClosable: true,
        });
        onClose();
        refreshData();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return;
  };

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
          <HStack>
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
          </HStack>
        </Flex>
      </VStack>

      <Box pt={{ base: "30px", md: "83px", xl: "30px" }}>
        {isLoading ? (
          <Loading />
        ) : gerencias.length !== 0 ? (
          <motion.div
            className="container"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <Grid
              templateColumns={{
                base: "repeat(3, 1fr)",
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(2, 1fr)",
                xl: "repeat(3, 2fr)",
                "2xl": "repeat(3, 2fr)",
              }}
              templateRows={{
                base: "1fr",
                lg: "1fr",
                sm: "1fr",
              }}
              gap={{ base: "2", sm: "1", xl: "2", "2xl": "4" }}
            >
              {gerencias.map((item, index) => {
                return (
                  <motion.div key={index} className="item" variants={itemAnim}>
                    <GerenciaCard
                      key={item.id + "-" + index}
                      index={index}
                      item={item}
                      gerencia={item}
                      onClick={(itemEvent) => {
                        console.log(item);
                        handleClick(itemEvent);
                      }}
                    />
                  </motion.div>
                );
              })}
            </Grid>
          </motion.div>
        ) : (
          <VStack pt={130}>
            <Box>
              <Container maxW="sm">
                <img src={empty} />
              </Container>
            </Box>
            <Text as="b" fontSize="2xl">
              No Existen Gerencias
            </Text>
            <Text fontSize="xl">
              Empieza con VAKU ingresa la primera gerencia
            </Text>

            <Box py={5}>
              <Button
                rightIcon={<HiPlus />}
                colorScheme="vaku.700"
                variant="outline"
                size="md"
                borderRadius={25}
                onClick={onOpen}
              >
                Crear Gerencia
              </Button>
            </Box>
          </VStack>
        )}
      </Box>
      <FormVaku<Gerencia>
        isOpen={isOpen}
        onClose={onClose}
        refreshData={refreshData}
        fieldsToExclude={["id"]}
        model={newGerencia}
        onSubmit={handleSaveGerencia}
        loading={loading}
        options={options}
      />
      {/* <AgregarGerenciaForm
        isOpen={isOpen}
        onClose={onClose}
        onOpen={function (): void {
          console.log("on open ");
        }}
        onAddFinish={function (isFinish: boolean): void {
          console.log("on add finish ");
        }}
      /> */}
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
