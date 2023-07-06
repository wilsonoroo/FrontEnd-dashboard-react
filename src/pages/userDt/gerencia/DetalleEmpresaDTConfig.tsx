import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { HiPlus } from "react-icons/hi2";

import GerenciaCard from "@/components/GerenciasCard/GerenciaCard";
import Headers from "@/components/header/header";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Empresa } from "@/models/empresa/Empresa";
import { Gerencia } from "@/models/gerencia/Gerencia";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import empty from "@assets/empty.png";
import useFetch from "@hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
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

export default function DetalleEmpresaDTConfig(props: { titulo: string }) {
  const { titulo } = props;
  const isVersionRealtime = import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? true
    : false;
  const { idEmpresa, idGerencia, idDivision } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  const [empresa, setEmpresa] = useState<Empresa>();
  const { currentUser } = useContext(AuthContext);
  const toast = useToast();

  const newGerencia = new Gerencia();
  newGerencia.setEmptyObject();

  let gerenciasRepository: any;
  let usuariosRepository: any;

  if (isVersionRealtime) {
    gerenciasRepository = new FirebaseRealtimeRepository<Gerencia>(
      `empresaCompact/${idEmpresa}/gerencias`
    );
  } else {
    gerenciasRepository = new FirestoreRepository<Empresa>(`empresas`);
  }

  useEffect(() => {
    const getUsuarios = async () => {
      const result = await usuariosRepository.getAll(UsuarioVaku);
      setOptions({ responsable: result as UsuarioVaku[] });
    };
    getUsuarios();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: gerencias,

    firstLoading,
    refreshData,
    isLoading,
  } = useFetch(() => gerenciasRepository.getAll(Gerencia));
  console.log(
    "🚀 ~ file: DetalleEmpresaDTConfig.tsx:90 ~ DetalleEmpresaDTConfig ~ gerencias:",
    gerencias
  );

  const handleClick = (item: any) => {
    const isAdmin = currentUser?.isSuperAdmin;

    if (isAdmin) {
      navigate("/superAdmin/config/" + currentUser.empresaId + "/" + item.id, {
        state: {
          empresa: { id: currentUser.empresaId, nombre: empresa?.nombre },
          gerencia: item,
        },
      });
    } else {
      console.log();
      navigate("/userDt/empresa/" + idEmpresa + "/" + item.id, {
        state: {
          empresa: { id: currentUser.empresaId, nombre: empresa?.nombre },
          gerencia: item,
        },
      });
    }
  };

  return (
    <>
      <Headers
        titulo={"Gerencias"}
        subtitulo={
          "En esta sección se especifica los detalles de cada gerencia"
        }
        onOpen={onOpen}
        rutas={[
          {
            nombre: "Home",
            url: currentUser?.isSuperAdmin ? `/superAdmin/` : `/admin/`,
          },
          {
            nombre: `Empresas`,
            url: currentUser?.isSuperAdmin
              ? `/superAdmin/config/`
              : currentUser.isUserDt
              ? `/userDt/empresa/`
              : `/admin/config/`,
          },
          {
            nombre: `Gerencias`,
            url: currentUser?.isSuperAdmin
              ? `/superAdmin/config/`
              : currentUser.isUserDt
              ? `/admin/empresa/${idEmpresa}`
              : `/admin/config/`,
          },
        ]}
        showButtonAdd={false}
        textButton="Crear Gerencia"
        refreshData={refreshData}
      />

      <Box pt={{ base: "30px", md: "83px", xl: "30px" }}>
        {isLoading ? (
          <Grid
            templateColumns={{
              base: "repeat(3, 1fr)",
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
              xl: "repeat(4, 1fr)",
              "2xl": "repeat(6, 2fr)",
            }}
            templateRows={{
              base: "2fr",
              lg: "1fr",
              sm: "1fr",
            }}
            gap={{ base: "2", sm: "1", xl: "2", "2xl": "4" }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_item) => {
              return (
                <Skeleton key={_item}>
                  <Box width={250} height={130}></Box>
                </Skeleton>
              );
            })}
          </Grid>
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
                "2xl": "repeat(5, 2fr)",
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
                <img src={empty} width={100} />
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
    </>
  );
}

//    const users =  Object.keys(dataEmpresa.usuarios.auth).map((key) => dataEmpresa.usuarios.auth[key]);
