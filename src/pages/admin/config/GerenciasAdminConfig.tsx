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

import FormVaku from "@/components/forms/FormVaku";
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
import { useLocation, useNavigate } from "react-router-dom";

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

export default function DetalleEmpresaAdminConfig(props: { titulo: string }) {
  const { titulo } = props;
  const isVersionRealtime = import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? true
    : false;
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
      `empresaCompact/${currentUser.empresaId}/gerencias`
    );
    usuariosRepository = new FirebaseRealtimeRepository<UsuarioVaku>(
      `empresas/${currentUser.empresaId}/usuarios/auth`
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
      navigate("/admin/config/" + currentUser.empresaId + "/" + item.id, {
        state: {
          empresa: { id: currentUser.empresaId, nombre: empresa?.nombre },
          gerencia: item,
        },
      });
    }
  };

  const handleSaveGerencia = (data: Gerencia) => {
    setLoading(true);
    data.displayName = data.nombre;
    data.createdAt = new Date();
    data.updatedAt = new Date();

    gerenciasRepository
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
      .catch((error: any) => {
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
            nombre: `Configuración`,
            url: currentUser?.isSuperAdmin
              ? `/superAdmin/config/`
              : `/admin/config/`,
          },
          {
            nombre: `Gerencias`,
            url: currentUser?.isSuperAdmin
              ? `/superAdmin/config/`
              : `/admin/config/`,
          },
        ]}
        showButtonAdd={true}
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
      <FormVaku<Gerencia>
        isOpen={isOpen}
        onClose={onClose}
        refreshData={refreshData}
        initialValues={newGerencia}
        fieldsToExclude={[
          "id",
          "cantDivisiones",
          "cantUsuarios",
          "cantDocumentos",
        ]}
        model={newGerencia}
        onSubmit={handleSaveGerencia}
        loading={loading}
        options={options}
        size="xl"
      />
    </>
  );
}

//    const users =  Object.keys(dataEmpresa.usuarios.auth).map((key) => dataEmpresa.usuarios.auth[key]);
