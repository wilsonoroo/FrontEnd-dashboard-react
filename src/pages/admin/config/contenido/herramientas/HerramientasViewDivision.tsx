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
import { Herramienta } from "@/models/herramienta/Herramienta";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function HerramientasViewDivision(props: { titulo: string }) {
  const { titulo } = props;
  const isVersionRealtime = import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? true
    : false;
  const { idEmpresa, idGerencia, idDivision } = useParams();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
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

  let empresaHerramientaRepository: any;
  let divisionHerramientaRepository: any;
  let divisonRepository: any;
  // console.log(idEmpresa, idGerencia, idDivision)
  if (isVersionRealtime) {
    empresaHerramientaRepository = new FirebaseRealtimeRepository<Herramienta>(
      `empresas/${currentUser.empresaIdGlobal}/equipos/herramientas`
    );

    divisionHerramientaRepository = new FirebaseRealtimeRepository<Herramienta>(
      `empresas/${idDivision}/equipos/herramientas`
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
    data: divisionHerrammienta,
    firstLoading: loadingHerramientaDivision,
    refreshData: refreshDivisionHerramienta,
    isLoading,
  } = useFetch(() => divisionHerramientaRepository.getAll(Herramienta));

  const {
    data: empresaHerramienta,
    firstLoading: loadingHerramientaEmpresa,
    refreshData: refreshEmpresaEquipos,
    isLoading: empresaHerramientaLoading,
  } = useFetch(() => empresaHerramientaRepository.getAll(Herramienta));

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
  useEffect(() => {
    divisonRepository.get(idDivision).then((data: Divisiones) => {
      setDivision(data);
    });
  }, []);

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
            <TagLabel>{info.getValue()}--</TagLabel>
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
      size: 400,
      minSize: 200,
    }),

    columnHelper.accessor("divisiones", {
      id: "asignarDesasignar",
      header: "Asignar / Desasignar",
      cell: (info: any) => {
        const fila = info.row.original;
        // const isChecked = fila.divisiones.some((division: any) => division.id === idDivision);

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

            empresaHerramientaRepository
              .update(fila.id, updatedFila)
              .then(() => {
                return divisionHerramientaRepository.delete(fila.id);
              })
              .then(() => {
                toast({
                  title: "Se ha desasignado la Equipo de la empresa",
                  position: "top",
                  status: "success",
                  isClosable: true,
                });
                refreshDivisionHerramienta();
                refreshEmpresaEquipos();
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

            empresaHerramientaRepository
              .update(fila.id, updatedFila)
              .then(() => {
                return divisionHerramientaRepository.add(fila.id, updatedFila);
              })
              .then(() => {
                toast({
                  title: "Se ha agregado un Equipo a la división",
                  position: "top",
                  status: "success",
                  isClosable: true,
                });
                refreshEmpresaEquipos();
                refreshDivisionHerramienta();
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
        {!loadingHerramientaDivision ? (
          <Box pt={{ base: "10px", md: "10px", xl: "10px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Herramientas"}
                textButtonAdd={"Asignar Herramientas"}
                onOpen={onOpenModal}
                onReload={refreshDivisionHerramienta}
              >
                <DataTable columns={columns} data={divisionHerrammienta} />
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
            <ModalHeader>Asignar Herramientas</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Agrega aquí el contenido del modal */}
              {!loadingHerramientaEmpresa ? (
                <>
                  <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                    <TableLayoutModal
                      titulo={""}
                      textButtonAdd={""}
                      onOpen={onOpenModal}
                      onReload={refreshEmpresaEquipos}
                    >
                      <DataTable
                        hiddenEmptyRow={true}
                        columns={columns1}
                        data={empresaHerramienta}
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
