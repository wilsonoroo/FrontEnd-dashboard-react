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

export default function UsuariosViewDivision(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // console.log(idEmpresa, idGerencia, idDivision)
  let divisionRepository: FirestoreRepository<UsuarioVaku>;
  if (idEmpresa === undefined) {
    divisionRepository= new FirestoreRepository<UsuarioVaku>(
      `empresas/${currentUser.empresaId}/gerencias/${idGerencia}/divisiones/${idDivision}/usuarios`
    );
  } else {
    divisionRepository = new FirestoreRepository<UsuarioVaku>(
      `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones/${idDivision}/usuarios`
    );
  }

  let empresaUsuarioRepository: FirestoreRepository<UsuarioVaku>;
  if (idEmpresa === undefined) {
    empresaUsuarioRepository= new FirestoreRepository<UsuarioVaku>(
      `empresas/${currentUser.empresaId}/usuarios`
    );
  } else {
    empresaUsuarioRepository= new FirestoreRepository<UsuarioVaku>(
      `empresas/${idEmpresa}/usuarios`
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
  } = useFetch(() => empresaUsuarioRepository.getAll());

  // console.log(division, empresaVehiculos)


  const columnHelper = createColumnHelper<UsuarioVaku>();

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
    columnHelper.accessor("displayName", {
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
      header: "Nombre",
    }),
    columnHelper.accessor("email", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "E-EMAIL",
    }),
    columnHelper.accessor("cargo", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Cargo",
    }),
    columnHelper.accessor("isActive", {
      cell: (info) => (
        <Box px={5} alignItems={"start"} alignContent={"start"}>
          <Badge variant="solid" bg={"#3498DB"} fontSize="0.7em">
            {info.getValue()}
          </Badge>
        </Box>
      ),
      header: "Usuario Activo",
    }),
    // columnHelper.accessor("rol", {
    //   cell: (info) => {
    //     return (
    //       <span>
    //         <Text fontSize="sm">{info.getValue()}</Text>
    //       </span>
    //     );
    //   },
    //   header: "Rol",
    // }),
    columnHelper.accessor("turno", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "turno",
    }),
    // columnHelper.accessor("enrolamiento", {
    //   cell: (info) => {
    //     return (
    //       <span>
    //         <Text fontSize="sm">{info.getValue()}</Text>
    //       </span>
    //     );
    //   },
    //   header: "Enrolamiento Completado",
    // }),
    columnHelper.accessor("empresa", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Empresa",
    }),
  
  
  ];
  const columns1 = [
    
    
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
        const isChecked = fila.divisiones.some((division: any) => division.id === idDivision);
    
        const manejarCambioCheckbox = () => {
          if (isChecked) {
            // Remove the division from the divisiones array
            const updatedFila = {
              ...fila,
              divisiones: fila.divisiones.filter((division: any) => division.id !== idDivision),
            };
    
            empresaUsuarioRepository
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
    
            empresaUsuarioRepository
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
              titulo={"Usuarios"}
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