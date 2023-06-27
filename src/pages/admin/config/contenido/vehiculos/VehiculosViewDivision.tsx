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
import FormVaku from "@/components/forms/FormVaku";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Divisiones } from "@/models/division/Disvision";
import { Vehiculo } from "@/models/vehiculo/Vehiculo";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import { dateToTimeStamp } from "@/utils/global";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VehiculosViewDivision(props: { titulo: string }) {
  const { titulo } = props;
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

  const newVehiculo = new Vehiculo();
  newVehiculo.setEmptyObject();
  // console.log(idEmpresa, idGerencia, idDivision)
  let vehiculoDivisionRepository: FirestoreRepository<Vehiculo>;
  if (idEmpresa === undefined) {
    vehiculoDivisionRepository = new FirestoreRepository<Vehiculo>(
      `empresas/${currentUser.empresaId}/gerencias/${idGerencia}/divisiones/${idDivision}/vehiculos`
    );
  } else {
    vehiculoDivisionRepository = new FirestoreRepository<Vehiculo>(
      `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones/${idDivision}/vehiculos`
    );
  }

  let empresaVehiculoRepository: FirestoreRepository<Vehiculo>;
  if (idEmpresa === undefined) {
    empresaVehiculoRepository = new FirestoreRepository<Vehiculo>(
      `empresas/${currentUser.empresaId}/vehiculos`
    );
  } else {
    empresaVehiculoRepository = new FirestoreRepository<Vehiculo>(
      `empresas/${idEmpresa}/vehiculos`
    );
  }

  let fetchVehiculosEmpresa = currentUser.isSuperAdmin
    ? empresaVehiculoRepository
    : vehiculoDivisionRepository;

  const {
    data: division,
    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => fetchVehiculosEmpresa.getAll());

  const {
    data: empresaVehiculos,
    firstLoading: loadingEmpresaVehiculos,
    refreshData: refreshEmpresaVehiculos,
    isLoading: empresaVehiculosLoading,
  } = useFetch(() => empresaVehiculoRepository.getAll());

  useEffect(() => {
    setOptions({
      tipoVehiculo: [
        {
          value: "semiremolque",
          label: "Semiremolque",
        },
        {
          value: "vehiculo_de_carga",
          label: "Vehículo de Carga",
        },
        {
          value: "vehiculo_liviano",
          label: "Vehículo Liviano",
        },
      ],
    });
  }, []);

  const columnHelper = createColumnHelper<Vehiculo>();

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

  const handleSaveGerencia = (data: Vehiculo) => {
    console.log(data);
    setLoading(true);

    let id = data.patente;
    data.id = id;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    console.log(typeof data.proximaMantencion);

    data.proximaMantencion = dateToTimeStamp(data.proximaMantencion);

    data.fechaVencimiento = dateToTimeStamp(data.fechaVencimiento);

    data.ultimaMantencion = dateToTimeStamp(data.ultimaMantencion);
    console.log(data);

    empresaVehiculoRepository
      .add(id, data)
      .then(() => {
        toast({
          title: `Se ha creado el vehiculo con éxito `,
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

  const columns = [
    columnHelper.accessor("numeroInterno", {
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
      header: "numero Interno",
    }),
    columnHelper.accessor("fechaVencimiento", {
      cell: (info) => {
        let fecha = moment(info.getValue())
          .tz("America/Santiago")
          .format("DD/MM/YYYY");
        fecha === "Invalid date" ? (fecha = info.getValue().toString()) : fecha;

        return (
          <span>
            <Text fontSize="sm">{fecha}</Text>
          </span>
        );
      },
      header: "Fecha revisión técnica",
    }),
    columnHelper.accessor("tipoVehiculo", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Tipo vehiculo",
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
    columnHelper.accessor("patente", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "patente",
      // size: 300,
      // minSize: 250,
    }),
    columnHelper.accessor("kilometraje", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "kilometraje",
    }),
    columnHelper.accessor("isServicio", {
      cell: (info) => {
        const isServicio = info.getValue();

        const bgColor = isServicio ? "#89FF00" : "#FFD600";
        // const textColor = isServicio ? "white" : "black";
        const text = isServicio ? "En servicio" : "En mantenimiento";

        return (
          <>
            <Badge
              // variant="outline"
              colorScheme={bgColor}
              fontSize="0.7em"
              textColor="#003560"
              style={{ backgroundColor: bgColor }}
            >
              {text}
            </Badge>
          </>
        );
      },
      header: "Estado",
    }),
  ];
  const columns1 = [
    columnHelper.accessor("numeroInterno", {
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
      header: "numero Interno",
    }),
    columnHelper.accessor("patente", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "patente",
      // size: 300,
      // minSize: 250,
    }),
    columnHelper.accessor("tipoVehiculo", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Tipo vehiculo",
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

            empresaVehiculoRepository
              .update(fila.id, updatedFila)
              .then(() => {
                toast({
                  title: "Se ha desasignado la división del vehículo",
                  position: "top",
                  status: "success",
                  isClosable: true,
                });
                refreshEmpresaVehiculos();
              })
              .catch((error) => {
                console.error(error);
              });

            vehiculoDivisionRepository
              .delete(fila.id)
              .then(() => {
                toast({
                  title: "Se ha eliminado el vehículo de la división",
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

            empresaVehiculoRepository
              .update(fila.id, updatedFila)
              .then(() => {
                toast({
                  title: "Se ha asignado una división al vehículo",
                  position: "top",
                  status: "success",
                  isClosable: true,
                });
                refreshEmpresaVehiculos();
              })
              .catch((error) => {
                console.error(error);
              });

            vehiculoDivisionRepository
              .add(fila.id, updatedFila) // Use the updatedFila object to add the division
              .then(() => {
                toast({
                  title: "Se ha agregado un vehículo a la división",
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
                titulo={"Vehiculos"}
                textButtonAdd={`${
                  currentUser.isSuperAdmin ? "Agregar" : "Asignar"
                } Vehiculos`}
                onOpen={currentUser.isSuperAdmin ? onOpen : onOpenModal}
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
            <ModalHeader>Asignar Vehiculo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Agrega aquí el contenido del modal */}
              {!loadingEmpresaVehiculos ? (
                <>
                  <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                    <TableLayoutModal
                      titulo={""}
                      textButtonAdd={""}
                      onOpen={onOpenModal}
                      onReload={refreshData}
                    >
                      <DataTable
                        hiddenEmptyRow={true}
                        columns={columns1}
                        data={empresaVehiculos}
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
      <Flex>
        <FormVaku<Vehiculo>
          isOpen={isOpen}
          onClose={onClose}
          refreshData={refreshData}
          fieldsToExclude={["id"]}
          model={newVehiculo}
          onSubmit={handleSaveGerencia}
          loading={loading}
          options={options}
          size="xl"
          initialValues={newVehiculo}
          grid={{ base: 1, md: 2 }}
        />
      </Flex>
    </>
  );
}
