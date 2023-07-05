import {
  Badge,
  Box,
  Flex,
  Grid,
  IconButton,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "@/components/dataTable/DataTable";

import TableLayout from "@/components/dataTable/TableLayout";
import useFetch from "@/hooks/useFetch";

import FormVaku from "@/components/forms/FormVaku";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Divisiones } from "@/models/division/Disvision";
import { Equipo } from "@/models/equipo/Equipo";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import { EstadoLoading, dateToTimeStamp } from "@/utils/global";
import { EditIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EquiposViewDivision(props: { titulo: string }) {
  const { titulo } = props;
  const isVersionRealtime = import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? true
    : false;
  const { idEmpresa, idGerencia, idDivision } = useParams();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ordenSelect, setOrdenSelect] = useState<Divisiones>();
  const toast = useToast();
  const [isList, setIsList] = useState(true);
  const navigate = useNavigate();
  const newDivision = new Divisiones();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iconLoading, setIconLoading] = useState<EstadoLoading>({});
  const { currentUser } = useContext(AuthContext);
  const vehiculoNew = new Equipo();

  const [newVehiculo, setNewVehiculo] = useState<Equipo>(vehiculoNew);

  let divisionRepository: FirestoreRepository<Equipo>;
  if (idEmpresa === undefined) {
    divisionRepository = new FirestoreRepository<Equipo>(
      `empresas/${currentUser.empresaId}/gerencias/${idGerencia}/divisiones/${idDivision}/equipos`
    );
  } else {
    divisionRepository = new FirestoreRepository<Equipo>(
      `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones/${idDivision}/equipos`
    );
  }

  let empresaEquipoRepository: any;

  if (isVersionRealtime) {
    empresaEquipoRepository = new FirebaseRealtimeRepository<Equipo>(
      `empresas/${currentUser.empresaIdGlobal}/equipos/maquinasEquipos`
    );
  } else {
  }

  const {
    data: division,
    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => empresaEquipoRepository.getAll(Equipo));

  const {
    data: empresaVehiculos,
    firstLoading: loadingEmpresaVehiculos,
    refreshData: refreshEmpresaVehiculos,
    isLoading: empresaVehiculosLoading,
  } = useFetch(() => empresaEquipoRepository.getAll());

  const columnHelper = createColumnHelper<Equipo>();

  const handleSaveEquipo = (data: Equipo) => {
    setLoading(true);

    if (!data.id || data.id === "") {
      data.createdAt = dateToTimeStamp(new Date());
      data.updatedAt = dateToTimeStamp(new Date());
      data.isEliminado = false;
      data.isServicio = true;
      empresaEquipoRepository
        .add(null, data)
        .then(() => {
          toast({
            title: `Se ha creado el equipo con éxito `,
            position: "top",
            status: "success",
            isClosable: true,
          });
          onClose();
          refreshEmpresaVehiculos();
        })
        .catch((error: any) => {
          console.error(error);
        })
        .finally(() => {
          refreshData();
          setNewVehiculo(new Equipo());
          setLoading(false);
        });
    } else {
      data.updatedAt = dateToTimeStamp(new Date());
      data.isEliminado = false;
      data.isServicio = true;
      empresaEquipoRepository
        .update(data.id, data)
        .then(() => {
          toast({
            title: `Se ha actualizado el equipo con éxito `,
            position: "top",
            status: "success",
            isClosable: true,
          });
          onClose();
          refreshEmpresaVehiculos();
        })
        .catch((error: any) => {
          console.error(error);
        })
        .finally(() => {
          refreshData();
          setNewVehiculo(new Equipo());
          setLoading(false);
        });
    }

    return;
  };

  const columns = [
    columnHelper.accessor("identificador", {
      cell: (info) => {
        return (
          <Box px={5} alignItems={"start"} alignContent={"start"}>
            <Badge variant="solid" bg={"#0B79F4"} fontSize="0.7em">
              {info.getValue()}
            </Badge>
            {/* <Badge variant="solid" bg={"#3498DB"} fontSize="0.7em">
            {info.row.original.id}
          </Badge> */}
          </Box>
        );
      },
      header: "Identificador",
      // size: 300,
      // minSize: 250,
    }),

    columnHelper.accessor("marca", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "marca",
      // size: 300,
      // minSize: 250,
    }),

    columnHelper.accessor("modelo", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "modelo",
      // size: 300,
      // minSize: 250,
    }),
    columnHelper.accessor("tipo", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "tipo",
      // size: 300,
      // minSize: 250,
    }),
    columnHelper.accessor("id", {
      cell: (info) => {
        return (
          <Stack spacing={2}>
            <Box>
              <IconButton
                aria-label="Search database"
                isLoading={iconLoading[info.row.original.id]}
                onClick={() => {
                  const select = info.row.original;
                  let loadingIc = iconLoading;
                  loadingIc[info.row.original.id] = true;
                  setIconLoading({ ...loadingIc });

                  setTimeout(() => {
                    setNewVehiculo(select);

                    onOpen();
                    loadingIc[info.row.original.id] = false;
                    setIconLoading(loadingIc);
                  }, 1000);
                }}
                icon={<EditIcon />}
              />
            </Box>
          </Stack>
        );
      },
      header: "Editar",
      size: 50,
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
      </VStack>

      <>
        {!loadingData ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Equipos"}
                textButtonAdd={"Agregar Equipos"}
                onOpen={onOpen}
                onReload={refreshData}
              >
                <DataTable
                  placeholderSearch="Buscar..."
                  columns={columns}
                  data={division}
                />
              </TableLayout>
            </Grid>
          </Box>
        ) : (
          <>Cargando..</>
        )}
      </>

      <Flex>
        <FormVaku<Equipo>
          isOpen={isOpen}
          onClose={() => {
            console.log();
            setNewVehiculo(new Equipo());
            onClose();
          }}
          refreshData={refreshEmpresaVehiculos}
          fieldsToExclude={["id"]}
          model={newVehiculo}
          onSubmit={handleSaveEquipo}
          loading={loading}
          options={options}
          initialValues={newVehiculo}
          size="xl"
          grid={{ base: 1, md: 2 }}
        />
      </Flex>
    </>
  );
}
