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

import Loading from "@/components/Loading";
import empty from "@assets/empty.png";
import useFetch from "@hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import DivisionCard from "@/components/DivionesCard/DivisionCard";
import Headers from "@/components/header/header";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Divisiones } from "@/models/division/Disvision";
import { Empresa } from "@/models/empresa/Empresa";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";

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

export default function DetalleGerenciaDT(props: { titulo: string }) {
  const { titulo } = props;
  //   const { id, idGerencia } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [isList, setIsList] = useState(false);
  const [options, setOptions] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [empresa, setEmpresa] = useState<Empresa>();
  const { idEmpresa, idGerencia } = useParams();
  const location = useLocation();

  const pathname = location.pathname;

  // Obtener el valor de id y idGerencia de la ruta

  const toast = useToast();

  const newDivision = new Divisiones();
  newDivision.setEmptyObject();

  let empresaRepository = new FirestoreRepository<Empresa>(`empresas`);
  let divisonRepository = new FirestoreRepository<Divisiones>(
    `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones`
  );

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
    empresaRepository.get(currentUser.empresaId).then((data) => {
      setEmpresa(data);
    });
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
    navigate("//userDt/empresa/" + idEmpresa + `/${idGerencia}/` + item.id, {
      state: {
        empresa: {
          id: location.state.empresa.id,
          nombre: location.state.empresa.nombre,
        },
        gerencia: {
          id: location.state.gerencia.id,
          nombre: location.state.gerencia.nombre,
        },
        division: item,
      },
    });
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

          {
            nombre: `Empresas`,
            url: "/userDt/empresa",
          },
          {
            nombre: `Gerencias`,
            url: `/userDt/empresa/${idEmpresa}`,
            state: {
              empresa: {
                id: location.state.empresa.id,
                nombre: location.state.empresa.nombre,
              },
            },
          },
          {
            nombre: `${location.state.gerencia.nombre}`,
            url: `/userDt/empresa/${idEmpresa}/${idGerencia}`,
          },
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
            <Box height={100}>
              <Container>
                <img src={empty} height={100} width={100} />
              </Container>
            </Box>
            <Text as="b" fontSize="2xl">
              No Existen division
            </Text>
            <Text fontSize="xl">
              Empieza con VAKU ingresa la primera division
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
    </>
  );
}
