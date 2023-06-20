import {
  Box,
  Flex,
  Grid,
  Spacer,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Badge,
  Checkbox,
} from "@chakra-ui/react";
import { CellContext, createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "@/components/dataTable/DataTable";

import TableLayout from "@/components/dataTable/TableLayout";
import useFetch from "@/hooks/useFetch";

import { Divisiones } from "@/models/division/Disvision";
import { DocumentoVaku } from "@/models/documento/Documento";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableLayoutModal from "@/components/dataTable/TableLayoutModal";
import { Vehiculo } from "@/models/vehiculo/Vehiculo";
import moment from "moment";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import { AuthContext } from "@/contexts/AuthContextFb";

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

  // console.log(idEmpresa, idGerencia, idDivision)
  let divisionRepository: FirestoreRepository<Vehiculo>;
  if (idEmpresa === undefined) {
    divisionRepository= new FirestoreRepository<Vehiculo>(
      `empresas/${currentUser.empresaId}/gerencias/${idGerencia}/divisiones/${idDivision}/vehiculos`
    );
  } else {
    divisionRepository = new FirestoreRepository<Vehiculo>(
      `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones/${idDivision}/vehiculos`
    );
  }

  let empresaVehiculoRepository: FirestoreRepository<Vehiculo>;
  if (idEmpresa === undefined) {
    empresaVehiculoRepository= new FirestoreRepository<Vehiculo>(
      `empresas/${currentUser.empresaId}/vehiculos`
    );
  } else {
    empresaVehiculoRepository= new FirestoreRepository<Vehiculo>(
      `empresas/${idEmpresa}/vehiculos`
    );
  }


  const {
    data: division,
    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => divisionRepository.getAll());

  const {
    data: empresaVehiculos,
    firstLoading: loadingEmpresaVehiculos,
    refreshData: refreshEmpresaVehiculos,
    isLoading: empresaVehiculosLoading,
  } = useFetch(() => empresaVehiculoRepository.getAll());

  // console.log(division, empresaVehiculos)
  
  // const divisiones = empresaVehiculos.map((vehiculo) => vehiculo.divisiones).flat();
  // console.log(divisiones);


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
  

  const columns = [
    columnHelper.accessor("numeroInterno", {
      cell: (info) => (
        <Box px={5} alignItems={"start"} alignContent={"start"}>
          <Badge variant="solid" bg={"#3498DB"} fontSize="0.7em">
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
    
        const bgColor = isServicio ? "green" : "yellow";
        // const textColor = isServicio ? "white" : "black";
        const text = isServicio ? "En servicio" : "En mantenimiento";
    
        return (
          <>
            <Badge
              // variant="outline"
              colorScheme={bgColor}
              fontSize="0.7em"
              textColor="#00355f"
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
          <Badge variant="solid" bg={"#3498DB"} fontSize="0.7em">
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
        <Box  alignItems="center" alignContent="center" >
          {Array.isArray(info.getValue()) && info.getValue().length > 0 ? (
            info.getValue().map((division, index) => (
              <Badge key={index} variant="solid" bg={"#3498DB"} fontSize="0.7em" mr={1} mb={1}>
                {division.displayName}
              </Badge>
            ))
          ) : (
            ""
          )}
        </Box>
      ),
      header: "Divisiones",
    }),

    {
      id: "asignarDesasignar",
      header: (
        <span>
          <text /> Asignar/Desasignar
        </span>
      ),
      cell: (info: any) => {
        const fila = info.row.original;

        if (!Array.isArray(fila.divisiones)) {
          fila.divisiones = []; // Agrega un arreglo vacío si no es un array
        }

        const isChecked = fila.divisiones.some((division: any) => division.id === idDivision);
    
        const manejarCambioCheckbox = () => {
          if (isChecked) {
            // Remove the division from the divisiones array
            const updatedFila = {
              ...fila,
              divisiones: fila.divisiones.filter((division: any) => division.id !== idDivision),
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
    
            divisionRepository
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
    
            divisionRepository
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
    } 
    
     
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
              textButtonAdd={"Asignar Vehiculos"}
              onOpen={onOpenModal}
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

    <Flex >
      <Modal isOpen={isModalOpen} onClose={onCloseModal}  >
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
              < >
                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                  <TableLayoutModal
                    titulo={""}
                    textButtonAdd={""}
                    onOpen={onOpenModal}
                    onReload={refreshData}
                  >
                    <DataTable hiddenEmptyRow={true} columns={columns1} data={empresaVehiculos} />
                  </TableLayoutModal>
                </Grid>
              </>
            ) : (
              <>Cargando..</>
            )}
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="flex-end">
              <Button mr={3} onClick={onCloseModal}>Cancelar</Button>
              <Button onClick={handleGuardar} colorScheme="blue">Guardar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  </>
  );
}