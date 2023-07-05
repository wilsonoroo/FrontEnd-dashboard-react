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
import empty from "@assets/empty.png";
import useFetch from "@hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Headers from "@/components/header/header";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Divisiones } from "@/models/division/Disvision";
import { Empresa } from "@/models/empresa/Empresa";
import { Gerencia } from "@/models/gerencia/Gerencia";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import { v4 as uuid } from "uuid";
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

export default function DetalleGerenciaAdminConfig(props: { titulo: string }) {
  const { titulo } = props;
  const isVersionRealtime = import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? true
    : false;
  //   const { id, idGerencia } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [isList, setIsList] = useState(false);
  const [options, setOptions] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [empresa, setEmpresa] = useState<Empresa>();
  const [gerencia, setGerencia] = useState<Gerencia>();
  const { idEmpresa, idGerencia } = useParams();
  const location = useLocation();

  const pathname = location.pathname;

  // Obtener el valor de id y idGerencia de la ruta

  const toast = useToast();

  const newDivision = new Divisiones();
  newDivision.setEmptyObject();

  let empresaRepository: any;
  let gerenciaRepository: any;
  let divisonRepository: any;
  let usuariosRepository: any;
  let divisionEmpresa: any;

  if (isVersionRealtime) {
    empresaRepository = new FirebaseRealtimeRepository<Empresa>(
      `empresaCompact`
    );
    gerenciaRepository = new FirebaseRealtimeRepository<Gerencia>(
      `empresaCompact/${idEmpresa}/gerencias`
    );
    divisonRepository = new FirebaseRealtimeRepository<Divisiones>(
      `empresaCompact/${idEmpresa}/gerencias/${idGerencia}/divisiones`
    );

    divisionEmpresa = new FirebaseRealtimeRepository<Divisiones>(`empresas`);
    usuariosRepository = new FirebaseRealtimeRepository<UsuarioVaku>(
      `empresas/${currentUser.empresaId}/usuarios/auth`
    );
  } else {
    empresaRepository = new FirestoreRepository<Empresa>(`empresas`);
    gerenciaRepository = new FirestoreRepository<Gerencia>(
      `empresas/${idEmpresa}/gerencias`
    );
    divisonRepository = new FirestoreRepository<Divisiones>(
      `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones`
    );
  }

  useEffect(() => {
    const getUsuarios = async () => {
      const result = await usuariosRepository.getAll(UsuarioVaku);

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
      const empresa = await divisionEmpresa.get(idEmpresa);
    };
    getUsuarios();

    empresaRepository.get(currentUser.empresaId).then((data: Empresa) => {
      setEmpresa(data);
      gerenciaRepository.get(idGerencia).then((data: Gerencia) => {
        setGerencia(data);
      });
    });
  }, []);

  useEffect(() => {}, []);
  const navigate = useNavigate();
  const {
    data: divisiones,
    firstLoading,
    refreshData,
    isLoading,
  } = useFetch(() => divisonRepository.getAll(Divisiones));

  const handleClickConfig = (item: any) => {
    navigate("/admin/config/" + idEmpresa + `/${idGerencia}/` + item.id, {
      state: {
        empresa: {
          id: empresa.id,
          nombre: empresa.nombre,
        },
        gerencia: {
          id: gerencia.id,
          nombre: gerencia.nombre,
        },
        division: item,
      },
    });
  };
  const handleClickDetalle = (item: any) => {
    navigate("/admin/" + idEmpresa + `/${idGerencia}/` + item.id, {
      state: {
        empresa: {
          id: empresa.id,
          nombre: empresa.nombre,
        },
        gerencia: {
          id: gerencia.id,
          nombre: gerencia.nombre,
        },
        division: item,
      },
    });
  };
  const handleClick = (item: any) => {
    const isAdmin = currentUser?.isSuperAdmin;

    if (isAdmin) {
      navigate(
        "/superAdmin/config/" + idEmpresa + `/${idGerencia}/` + item.id,
        {
          state: {
            empresa: {
              id: empresa.id,
              nombre: empresa.nombre,
            },
            gerencia: {
              id: gerencia.id,
              nombre: gerencia.nombre,
            },
            division: item,
          },
        }
      );
    } else {
      navigate("/admin/config/" + idEmpresa + `/${idGerencia}/` + item.id, {
        state: {
          empresa: {
            id: empresa.id,
            nombre: empresa.nombre,
          },
          gerencia: {
            id: gerencia.id,
            nombre: gerencia.nombre,
          },
          division: item,
        },
      });
    }
  };

  const handleSaveDivision = async (data: Divisiones) => {
    setLoading(true);
    data.displayName = data.nombre;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const empresa = await divisionEmpresa.get(idEmpresa);

    const idNotNull = uuid();
    data.id = `${idEmpresa}_${idNotNull}`;
    divisionEmpresa
      .add(`${idEmpresa}_${idNotNull}`, {
        config: empresa.config,
        correlativo: {
          prefijo: data.codigo,
          numeral: 0,
        },
        faenas: empresa.faenas,
        id: `${idEmpresa}_${idNotNull}`,
        nombre: data.nombre,
        repositorio: empresa.repositorio,
        utils: empresa.utils,
      })
      .then(() => {
        divisonRepository
          .add(`${idEmpresa}_${idNotNull}`, data)
          .then(() => {
            toast({
              title: `Se ha creado la division con éxito `,
              position: "top",
              status: "success",
              isClosable: true,
            });
            onClose();
            refreshData();
          })
          .catch((error: any) => {
            console.error(error);
          });
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
        tituloBajo={`${gerencia?.nombre}`}
        subtitulo={"En esta sección se especifica los detalles de la gerencia"}
        onOpen={onOpen}
        rutas={[
          {
            nombre: "Home",
            url: currentUser?.isSuperAdmin ? `/superAdmin/` : `/admin/`,
          },
          {
            nombre: `Configuración`,
            url: currentUser?.isSuperAdmin
              ? `/superAdmin/config/${idEmpresa}/${idGerencia}`
              : `/admin/config/${idEmpresa}/${idGerencia}`,
            state: {
              empresa: {
                id: empresa?.id,
                nombre: empresa?.nombre,
              },
              gerencia: {
                id: gerencia?.id,
                nombre: gerencia?.nombre,
              },
            },
          },
          {
            nombre: `Gerencias`,
            url: currentUser?.isSuperAdmin
              ? `/superAdmin/config`
              : `/admin/config`,
            state: {
              empresa: {
                id: empresa?.id,
                nombre: empresa?.nombre,
              },
            },
          },
          {
            nombre: `${gerencia?.nombre}`,
            url: currentUser?.isSuperAdmin
              ? `/superAdmin/config/${idEmpresa}/${idGerencia}`
              : `/admin/config/${idEmpresa}/${idGerencia}`,
            state: {
              empresa: {
                id: empresa?.id,
                nombre: empresa?.nombre,
              },
            },
          },
        ]}
        showButtonAdd={true}
        textButton="Agregar División"
      />

      <Box pt={{ base: "30px", md: "83px", xl: "30px" }}>
        {isLoading ? (
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_item) => {
              return (
                <Skeleton key={_item}>
                  <Box width={250} height={130}></Box>
                </Skeleton>
              );
            })}
          </Grid>
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
                      onClickConfig={handleClickConfig}
                      onClickDetalle={handleClickDetalle}
                      onClick={() => {
                        // handleClick(item);
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
              <Container width={100}>
                <img src={empty} />
              </Container>
            </Box>
            <Text as="b" fontSize="2xl">
              No Existen divisiones
            </Text>
            <Text fontSize="xl">
              Empieza con VAKU ingresa la primera divisiones
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
