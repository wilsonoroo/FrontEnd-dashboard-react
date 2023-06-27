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
import FormVaku from "@/components/forms/FormVaku";
import { AuthContext } from "@/contexts/AuthContextFb";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

type EstadoLoading = {
  [key: string]: boolean;
};

export default function UsuariosViewDivision(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [iconLoading, setIconLoading] = useState<EstadoLoading>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userNew = new UsuarioVaku();
  const [newUser, setNewUser] = useState<UsuarioVaku>(userNew);

  // console.log(idEmpresa, idGerencia, idDivision)
  let divisionRepository: FirestoreRepository<UsuarioVaku>;
  if (idEmpresa === undefined) {
    divisionRepository = new FirestoreRepository<UsuarioVaku>(
      `empresas/${currentUser.empresaId}/gerencias/${idGerencia}/divisiones/${idDivision}/usuarios`
    );
  } else {
    divisionRepository = new FirestoreRepository<UsuarioVaku>(
      `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones/${idDivision}/usuarios`
    );
  }

  let empresaUsuarioRepository: FirestoreRepository<UsuarioVaku>;
  if (idEmpresa === undefined) {
    empresaUsuarioRepository = new FirestoreRepository<UsuarioVaku>(
      `empresas/${currentUser.empresaId}/usuarios`
    );
  } else {
    empresaUsuarioRepository = new FirestoreRepository<UsuarioVaku>(
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
        <VStack alignItems={"flex-start"}>
          <Box px={5}>
            <Tag
              bg={"#0B79F4"}
              color="#fff"
              alignItems={"center"}
              alignContent={"center"}
              size={"sm"}
              py={1}
            >
              <TagLabel>{info.getValue()}</TagLabel>
            </Tag>
          </Box>
        </VStack>
      ),
      header: "Nombre de Usuario",
      // size: 200,
      // minSize: 120,
    }),
    columnHelper.accessor("email", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Correo Electrónico",
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
      size: 100,
      minSize: 100,
    }),
    columnHelper.accessor("isActive", {
      cell: (info) => {
        const bgColor = info.getValue() ? "#89FF00" : "#FF2200";
        const textColor = info.getValue() ? "#003560" : "#F0F2F4";
        return (
          <>
            <Badge
              variant="outline"
              colorScheme={bgColor}
              fontSize="0.7em"
              style={{ backgroundColor: bgColor, color: textColor }}
            >
              {info.getValue() ? "Si" : "No"}
            </Badge>
          </>
        );
      },
      header: "Usuario Activo",
      size: 100,
      minSize: 100,
    }),
    columnHelper.accessor("rol", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()?.nombre}</Text>
          </span>
        );
      },
      header: "Rol",
      size: 100,
      minSize: 100,
    }),
    columnHelper.accessor("turno", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Turno",
      size: 100,
      minSize: 100,
    }),

    columnHelper.accessor("enrolamiento", {
      cell: (info) => {
        const isCompletado = info.getValue()?.isCompletado;
        const bgColor = isCompletado ? "#89FF00" : "#FF2200";
        const textColor = isCompletado ? "#003560" : "#F0F2F4";

        return (
          <>
            <Badge
              variant="outline"
              colorScheme={bgColor}
              fontSize="0.7em"
              style={{ backgroundColor: bgColor, color: textColor }}
            >
              {isCompletado ? "Si" : "No"}
            </Badge>
          </>
        );
      },
      header: "Enrolamiento Completado",
      size: 100,
      minSize: 100,
    }),
    columnHelper.accessor("empresa", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Empresa",
      size: 100,
      minSize: 100,
    }),
    // columnHelper.accessor("id", {
    //   cell: (info) => {
    //     return (
    //       <Stack spacing={2}>
    //         <Box>
    //           <IconButton
    //             aria-label="Search database"
    //             isLoading={iconLoading[info.row.original.id]}
    //             onClick={() => {
    //               const select = info.row.original;
    //               let loadingIc = iconLoading;

    //               loadingIc[info.row.original.id] = true;
    //               setIconLoading({ ...loadingIc });

    //               setTimeout(() => {
    //                 // setNewVehiculo(select);
    //                 setNewUser(select);
    //                 onOpen();
    //                 loadingIc[info.row.original.id] = false;
    //                 setIconLoading(loadingIc);
    //               }, 1000);
    //             }}
    //             icon={<EditIcon />}
    //           />
    //         </Box>
    //       </Stack>
    //     );
    //   },
    //   header: "Editar",
    // }),
  ];
  const columns1 = [
    columnHelper.accessor("displayName", {
      cell: (info) => (
        <VStack alignItems={"flex-start"}>
          <Box px={5}>
            <Tag
              bg={"#0B79F4"}
              color="#fff"
              alignItems={"center"}
              alignContent={"center"}
              size={"sm"}
              py={1}
            >
              <TagLabel>{info.getValue()}</TagLabel>
            </Tag>
          </Box>
        </VStack>
      ),
      header: "Nombre de Usuario",
      size: 210,
      minSize: 100,
    }),
    columnHelper.accessor("email", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Correo Electrónico",
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
                titulo={"Usuarios"}
                textButtonAdd={"Asignar Usuarios"}
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
            <ModalHeader>Asignar Usuario</ModalHeader>
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
        <FormVaku<UsuarioVaku>
          titulo={"Agregar Usuario"}
          isOpen={isOpen}
          onClose={onClose}
          refreshData={refreshData}
          fieldsToExclude={["id"]}
          model={newUser}
          initialValues={newUser}
          onSubmit={() => {}}
          loading={false}
          options={[]}
          size="xl"
          grid={{ base: 1, md: 2 }}
        />
      </Flex>
    </>
  );
}
