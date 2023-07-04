import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "@/components/dataTable/DataTable";

import TableLayout from "@/components/dataTable/TableLayout";
import useFetch from "@/hooks/useFetch";

import TableLayoutModal from "@/components/dataTable/TableLayoutModal";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Divisiones } from "@/models/division/Disvision";
import { Equipo } from "@/models/equipo/Equipo";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EquiposViewDivision(props: { titulo: string }) {
  const { titulo } = props;
  const isVersionRealtime = import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? true
    : false;
  const { idEmpresa, idGerencia, idDivision } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ordenSelect, setOrdenSelect] = useState<Divisiones>();
  const [division, setDivision] = useState<Divisiones>();
  const toast = useToast();
  const [isList, setIsList] = useState(true);
  const navigate = useNavigate();
  const newDivision = new Divisiones();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const newVehiculo = new Equipo();

  let empresaEquipoRepository: any;
  let divisionEquipoRepository: any;
  let divisonRepository: any;

  // console.log(idEmpresa, idGerencia, idDivision)
  if (isVersionRealtime) {
    empresaEquipoRepository = new FirebaseRealtimeRepository<Equipo>(
      `empresas/${currentUser.empresaIdGlobal}/equipos/maquinasEquipos`
    );

    divisionEquipoRepository = new FirebaseRealtimeRepository<Equipo>(
      `empresas/${idDivision}/equipos/maquinasEquipos`
    );
    divisonRepository = new FirebaseRealtimeRepository<Divisiones>(
      `empresaCompact/${idEmpresa}/gerencias/${idGerencia}/divisiones`
    );
  } else {
    // if (idEmpresa === undefined) {
    //   empresaVehiculoRepository = new FirestoreRepository<Vehiculo>(
    //     `empresas/${currentUser.empresaId}/vehiculos`
    //   );
    // } else {
    //   empresaVehiculoRepository = new FirestoreRepository<Vehiculo>(
    //     `empresas/${idEmpresa}/vehiculos`
    //   );
    // }
  }

  const {
    data: divisionEquipo,
    firstLoading: loadingEquipoDivision,
    refreshData: refreshDivisionEquipos,
    isLoading,
  } = useFetch(() => divisionEquipoRepository.getAll(Equipo));

  const {
    data: empresaEquipo,
    firstLoading: loadingEmpresaEquipo,
    refreshData: refreshEmpresaEquipos,
    isLoading: empresaVehiculosLoading,
  } = useFetch(() => empresaEquipoRepository.getAll(Equipo));

  // console.log(division, empresaVehiculos)

  const columnHelper = createColumnHelper<Equipo>();

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setFilasSeleccionadas([]);
  };

  const [filasSeleccionadas, setFilasSeleccionadas] = useState([]);

  useEffect(() => {
    divisonRepository.get(idDivision).then((data: Divisiones) => {
      setDivision(data);
    });
  }, []);

  const handleGuardar = () => {
    // console.log("Guardando datos de filas seleccionadas:");
    // console.log(filasSeleccionadas);

    toast({
      title: "Vehículos asignados correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // Cierra el modal
    onCloseModal();
  };

  const columns = [
    columnHelper.accessor("identificador", {
      cell: (info) => (
        <Box px={5} alignItems={"start"} alignContent={"start"}>
          <Badge variant="solid" bg={"#0B79F4"} fontSize="0.7em">
            {info.getValue()}
          </Badge>
          {/* <Badge variant="solid" bg={"#3498DB"} fontSize="0.7em">
            {info.row.original.id}
          </Badge> */}
        </Box>
      ),
      header: "Identificador Interno",
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
    columnHelper.accessor("identificador", {
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
      size: 50,
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
      size: 100,
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
      size: 100,
    }),

    columnHelper.accessor("divisiones", {
      cell: (info) => (
        <Wrap>
          {Array.isArray(info.getValue()) && info.getValue().length > 0
            ? info.getValue().map((division, index) => (
                <WrapItem>
                  <Badge
                    key={index}
                    variant="solid"
                    bg={"#0B79F4"}
                    fontSize="0.6em"
                    mr={1}
                    size={"sm"}
                    mb={1}
                  >
                    {division.displayName}
                  </Badge>
                </WrapItem>
              ))
            : ""}
        </Wrap>
      ),
      header: "Divisiones",
      size: 400,
      minSize: 200,
    }),
    columnHelper.accessor("id", {
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
                return divisionEquipoRepository.delete(fila.id);
              })
              .then(() => {
                toast({
                  title: "Se ha desasignado el Equipo con exito",
                  position: "top",
                  status: "warning",
                  isClosable: true,
                });
                refreshEmpresaEquipos();
                refreshDivisionEquipos();
              })
              .catch((error: any) => {
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
                  displayName: division.displayName,
                },
              ],
            };

            empresaEquipoRepository
              .update(fila.id, updatedFila)
              .then(() => {
                return divisionEquipoRepository.add(fila.id, updatedFila);
              })
              .then(() => {
                toast({
                  title: "Se ha asignado un Equipo con éxito",
                  position: "top",
                  status: "success",
                  isClosable: true,
                });
                refreshEmpresaEquipos();
                refreshDivisionEquipos();
              })
              .catch((error: any) => {
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
        {!loadingEquipoDivision ? (
          <Box pt={{ base: "10px", md: "10px", xl: "10px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Equipos"}
                textButtonAdd={"Asignar Equipos"}
                onOpen={onOpenModal}
                onReload={refreshDivisionEquipos}
              >
                <DataTable columns={columns} data={divisionEquipo} />
              </TableLayout>
            </Grid>
          </Box>
        ) : (
          <>Cargando..</>
        )}
      </>

      <Flex>
        <Modal isOpen={isModalOpen} onClose={onCloseModal}>
          <ModalOverlay />
          <ModalContent
            display="flex"
            // justifyContent="center"
            // alignItems="center"
            maxW="900px" // Ancho máximo de 800px
            maxH="950px"
            borderRadius={16}
            mx="auto" // Centrar horizontalmente
            my="auto" // Centrar verticalmente
          >
            <ModalHeader>Asignar Equipos</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Agrega aquí el contenido del modal */}
              {!loadingEmpresaEquipo ? (
                <>
                  <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                    <TableLayoutModal
                      titulo={""}
                      textButtonAdd={""}
                      onOpen={onOpenModal}
                      onReload={refreshDivisionEquipos}
                    >
                      <DataTable
                        hiddenEmptyRow={false}
                        columns={columns1}
                        data={empresaEquipo}
                      />
                    </TableLayoutModal>
                  </Grid>
                </>
              ) : (
                <>Cargando..</>
              )}
            </ModalBody>
            <ModalFooter>
              <Flex justifyContent="flex-end">
                <Button mr={3} onClick={onCloseModal}>
                  Cancelar
                </Button>
                <Button onClick={handleGuardar} colorScheme="blue">
                  Guardar
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
