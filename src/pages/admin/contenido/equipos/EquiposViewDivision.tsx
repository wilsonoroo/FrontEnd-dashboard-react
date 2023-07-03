import {
  Badge,
  Box,
  Checkbox,
  Flex,
  Grid,
  Tag,
  TagLabel,
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
import { dateToTimeStamp } from "@/utils/global";
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
  const { currentUser } = useContext(AuthContext);
  const newVehiculo = new Equipo();

  // console.log(idEmpresa, idGerencia, idDivision)
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
    console.log(`empresas/${currentUser.empresaIdGlobal}/equipos`);
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

  // console.log(division, empresaVehiculos)

  const columnHelper = createColumnHelper<Equipo>();

  const handleSaveEquipo = (data: Equipo) => {
    console.log(data);
    setLoading(true);

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
        setLoading(false);
      });

    return;
  };

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
      header: "ID.",
      // size: 100,
      // minSize: 120,
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
  ];
  const columns1 = [
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
      header: "ID.",
      // size: 100,
      // minSize: 120,
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
    }),

    columnHelper.accessor("divisiones", {
      cell: (info) => (
        <Box alignItems="center" alignContent="center">
          {Array.isArray(info.getValue()) && info.getValue().length > 0
            ? info.getValue().map((division, index) => (
                <Badge
                  key={index}
                  variant="solid"
                  bg={"#0B79F4"}
                  fontSize="0.7em"
                  mr={1}
                  mb={1}
                >
                  {division.displayName}
                </Badge>
              ))
            : ""}
        </Box>
      ),
      header: "Divisiones",
    }),

    columnHelper.accessor("divisiones", {
      id: "asignarDesasignar",
      header: "Asignar/Desasignar",
      cell: (info: any) => {
        const fila = info.row.original;

        if (!Array.isArray(fila.divisiones)) {
          fila.divisiones = []; // Agrega un arreglo vacío si no es un array
        }

        const isChecked = fila.divisiones.some(
          (division: any) => division.id === idDivision
        );

        const manejarCambioCheckbox = () => {
          if (isChecked) {
            // Remove the division from the divisiones array
            const updatedFila = {
              ...fila,
              divisiones: fila.divisiones.filter(
                (division: any) => division.id !== idDivision
              ),
            };

            empresaEquipoRepository
              .update(fila.id, updatedFila)
              .then(() => {
                toast({
                  title: "Se ha desasignado la Equipo de la empresa",
                  position: "top",
                  status: "success",
                  isClosable: true,
                });
                refreshEmpresaVehiculos();
              })
              .catch((error: any) => {
                console.error(error);
              });

            divisionRepository
              .delete(fila.id)
              .then(() => {
                toast({
                  title: "Se ha eliminado el Equipo de la división",
                  position: "top",
                  status: "success",
                  isClosable: true,
                });
                refreshData();
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            // Add the division to the divisiones array
            const updatedFila = {
              ...fila,
              divisiones: [
                ...fila.divisiones,
                {
                  id: idDivision,
                  displayName: idDivision,
                },
              ],
            };

            empresaEquipoRepository
              .update(fila.id, updatedFila)
              .then(() => {
                toast({
                  title: "Se ha asignado un Equipo a la empresa",
                  position: "top",
                  status: "success",
                  isClosable: true,
                });
                refreshEmpresaVehiculos();
              })
              .catch((error: any) => {
                console.error(error);
              });

            divisionRepository
              .add(fila.id, updatedFila) // Use the updatedFila object to add the division
              .then(() => {
                toast({
                  title: "Se ha agregado un Equipo a la división",
                  position: "top",
                  status: "success",
                  isClosable: true,
                });
                refreshData();
              })
              .catch((error) => {
                console.error(error);
              });
          }
        };

        return (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Checkbox onChange={manejarCambioCheckbox} isChecked={isChecked} />
          </Box>
        );
      },
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
                <DataTable columns={columns} data={division} />
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
          onClose={onClose}
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
