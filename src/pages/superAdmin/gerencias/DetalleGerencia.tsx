import {
  Box,
  Button,
  Container,
  Grid,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { HiPlus } from "react-icons/hi2";

import FormVaku from "@/components/forms/FormVaku";
import Loading from "@/components/Loading";
import empty from "@assets/empty.png";
import useFetch from "@hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import GerenciaCard from "./components/GerenciasCard/GerenciaCard";
import Headers from "@/components/header/header";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Divisiones } from "@/models/division/Disvision";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import DivisionCard from "./components/DivionesCard/DivisionCard";

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

export default function DetalleGerencia(props: { titulo: string }) {
  const { titulo } = props;
  //   const { id, idGerencia } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [isList, setIsList] = useState(false);
  const [options, setOptions] = useState({});
  const { currentUser } = useContext(AuthContext);

  const { idEmpresa } = useParams(); // Obtener el valor de idEmpresa de la ruta
  const location = useLocation();

  const pathname = location.pathname;

  // Obtener el valor de id y idGerencia de la ruta
  const idMatch = pathname.match(/\/empresas\/([^/]+)\/([^/]+)/);
  const id = idMatch ? idMatch[1] : "";
  const idGerencia = idMatch ? idMatch[2] : "";

  const toast = useToast();

  const newDivision = new Divisiones();
  newDivision.setEmptyObject();
  let divisonRepository: FirestoreRepository<Divisiones>;
  divisonRepository = new FirestoreRepository<Divisiones>(
    `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones`
  );

  // const empresaRepository = new FirebaseRealtimeRepository<Gerencia>(
  //   `empresas/${id}/gerencias`
  // );

  // useEffect(() => {
  //   const getUsuarios = async () => {
  //     const db = new FirebaseRealtimeRepository<AuthUser>("auth");
  //     const result = await db.getAll(AuthUser);
  //     setOptions({ responsable: result });
  //   };
  //   getUsuarios();
  // }, []);
  useEffect(() => {
    const getUsuarios = async () => {
      const db = new FirestoreRepository<UsuarioVaku>("auth");
      const result = await db.getAllObject(UsuarioVaku);

      setOptions({
        responsable: result as UsuarioVaku[],
        tipoDivision: [
          {
            value: "proyecto",
            label: "Proyecto",
          },
          {
            value: "contrato",
            label: "Contrato",
          },
          {
            value: "area",
            label: "Área",
          },
        ],
      });
    };
    getUsuarios();
  }, []);

  useEffect(() => {}, []);
  const navigate = useNavigate();
  const {
    data: divisiones,
    firstLoading,
    refreshData,
    isLoading,
  } = useFetch(() => divisonRepository.getAll());

  const handleClick = (item: any) => {
    navigate("/admin/empresas/" + idEmpresa + `/${idGerencia}/` + item.id, {
      state: { item },
    });
  };

  const handleSaveDivision = (data: Divisiones) => {
    setLoading(true);
    data.displayName = data.nombre;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    divisonRepository
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
      <Headers
        titulo={"División"}
        subtitulo={
          "En esta sección se especifica los detalles de cada gerencia"
        }
        onOpen={onOpen}
        rutas={[
          { nombre: "Home", url: "/admin" },
          { nombre: "Empresas", url: "/admin/empresas" },
          {
            nombre: `${location.state.empresa.nombre}`,
            url: `/admin/empresas/${location.state.empresa.id}`,
            state: {
              empresa: {
                id: location.state.empresa.id,
                nombre: location.state.empresa.nombre,
              },
            },
          },
          { nombre: `${location.state.gerencia.nombre}`, url: "/admin/di" },
        ]}
        showButtonAdd={true}
        textButton="Agregar División"
      />

      <Box pt={{ base: "30px", md: "83px", xl: "30px" }}>
        {isLoading ? (
          <Loading />
        ) : divisiones.length !== 0 ? (
          <motion.div
            className="container"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <Grid
              templateColumns={{
                base: "repeat(4, 1fr)",
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(2, 1fr)",
                xl: "repeat(3, 2fr)",
                "2xl": "repeat(4, 2fr)",
              }}
              templateRows={{
                base: "1fr",
                lg: "1fr",
                sm: "1fr",
              }}
              gap={{ base: "2", sm: "1", xl: "2", "2xl": "4" }}
            >
              {divisiones.map((item, index) => {
                return (
                  <motion.div key={index} className="item" variants={itemAnim}>
                    <DivisionCard
                      key={item.id + "-" + index}
                      index={index}
                      item={item}
                      division={item}
                      onClick={() => {
                        handleClick(item);
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
                Crear Division
              </Button>
            </Box>
          </VStack>
        )}
      </Box>
      <FormVaku<Divisiones>
        isOpen={isOpen}
        onClose={onClose}
        refreshData={refreshData}
        fieldsToExclude={["id", "createdAt", "updatedAt"]}
        model={newDivision}
        initialValues={newDivision}
        onSubmit={handleSaveDivision}
        loading={loading}
        size="xl"
        options={options}
      />
    </>
  );
}
