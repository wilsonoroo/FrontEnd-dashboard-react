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

export default function VehiculosView(props: { titulo: string }) {
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
  
  const divisiones = empresaVehiculos.map((vehiculo) => vehiculo.divisiones).flat();
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

  const manejarCambioCheckbox = (fila: any) => {
    setFilasSeleccionadas((filasSeleccionadas) => {
      if (filasSeleccionadas.includes(fila)) {
        // Si la fila ya está seleccionada, eliminarla del array de filas seleccionadas
        return filasSeleccionadas.filter((f) => f !== fila);
      } else {
        // Si la fila no está seleccionada, agregarla al array de filas seleccionadas
        return [...filasSeleccionadas, fila];
      }
    });
  };
  

  const handleGuardar = () => {
    console.log("Guardando datos de filas seleccionadas:");
    console.log(filasSeleccionadas);
  
    filasSeleccionadas.forEach((fila) => {
      const data = {
        // Utiliza los valores de los campos de la fila seleccionada para construir la data a guardar
        numeroInterno: fila.numeroInterno,
        fechaVencimiento: fila.fechaVencimiento,
        tipoVehiculo: fila.tipoVehiculo,
        ...fila,
      };
  
      // Llama a la función de guardado con la data correspondiente a la fila seleccionada
      divisionRepository
        .add(null, data)
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
    });

    
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
      size: 300,
      minSize: 250,
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
    columnHelper.accessor("numeroInterno", {
      cell: (info) => {
        let color = info.row.original.isEliminado
          ? "red"
          : info.row.original.isServicio
          ? "green"
          : "yellow";
        let texto = info.row.original.isEliminado
          ? "dado de baja"
          : info.row.original.isServicio
          ? "en servicio"
          : "en mantenimiento";
        return (
          <Box px={5} alignItems={"start"} alignContent={"start"}>
            <Badge variant="solid" bg={color} fontSize="0.7em">
              {texto}
            </Badge>
          </Box>
        );
      },
      header: "marca",
    }),
  ];
  const columns1 = [
    columnHelper.accessor("numeroInterno", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Numero Interno",
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
      cell: (info: any) => (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Checkbox
            onChange={() => manejarCambioCheckbox(info.row.original)}
            isChecked={filasSeleccionadas.some((f) => f === info.row.original)}
          />
        </Box>
      ),
    },
     
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
              textButtonAdd={"Asignar Vehiculo"}
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