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
import { Divisiones } from "@/models/division/Disvision";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type EstadoLoading = {
  [key: string]: boolean;
};

export default function UsuariosViewDivision(props: { titulo: string }) {
  const isVersionRealtime = import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? true
    : false;
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [iconLoading, setIconLoading] = useState<EstadoLoading>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userNew = new UsuarioVaku();
  const [newUser, setNewUser] = useState<UsuarioVaku>(userNew);
  const [division, setDivision] = useState<Divisiones>();

  let empresaUsuarioRepository: any;
  let divisionUsuarioRepository: any;
  let divisonRepository: any;
  let usuarioGlobalRepository: any;

  if (isVersionRealtime) {
    empresaUsuarioRepository = new FirebaseRealtimeRepository<UsuarioVaku>(
      `empresas/${currentUser.empresaIdGlobal}/usuarios/auth`
    );

    divisionUsuarioRepository = new FirebaseRealtimeRepository<UsuarioVaku>(
      `empresas/${idDivision}/usuarios/auth`
    );
    divisonRepository = new FirebaseRealtimeRepository<Divisiones>(
      `empresaCompact/${idEmpresa}/gerencias/${idGerencia}/divisiones`
    );
    usuarioGlobalRepository = new FirebaseRealtimeRepository<UsuarioVaku>(
      `auth`
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
    data: divisionUsuario,
    firstLoading: loadingUsuarioDivision,
    refreshData: refreshDivisionUsuario,
    isLoading: divisionUsuariosLoading,
  } = useFetch(() => divisionUsuarioRepository.getAll(UsuarioVaku));

  const {
    data: empresaUsuario,
    firstLoading: loadingEmpresaUsuario,
    refreshData: refreshEmpresaUsuario,
    isLoading: empresaUsuariosLoading,
  } = useFetch(() => empresaUsuarioRepository.getAll(UsuarioVaku));

  // console.log(division, empresaVehiculos)

  const columnHelper = createColumnHelper<UsuarioVaku>();

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setFilasSeleccionadas([]);
  };

  useEffect(() => {
    divisonRepository.get(idDivision).then((data: Divisiones) => {
      setDivision(data);
    });
  }, []);

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
                return divisionUsuarioRepository.delete(fila.id);
              })

              .then(() => {
                toast({
                  title: "Se ha desasignado el vehículo de la división",
                  position: "top",
                  status: "warning",
                  isClosable: true,
                });
                refreshDivisionUsuario();
                refreshEmpresaUsuario();
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
              empresaId: idDivision,
            };

            empresaUsuarioRepository
              .update(fila.id, updatedFila)
              .then(() => {
                return divisionUsuarioRepository.add(fila.id, updatedFila);
              })
              .then(() => {
                return usuarioGlobalRepository.updateObj(fila.id, {
                  empresaId: idDivision,
                });
              })
              .then(() => {
                toast({
                  title: "Se ha asignado un usuario a la división",
                  position: "top",
                  status: "success",
                  isClosable: true,
                });
                refreshDivisionUsuario();
                refreshEmpresaUsuario();
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
        {!loadingUsuarioDivision ? (
          <Box pt={{ base: "10px", md: "10px", xl: "10px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Usuarios"}
                textButtonAdd={"Asignar Usuarios"}
                onOpen={onOpenModal}
                onReload={refreshDivisionUsuario}
              >
                <DataTable columns={columns} data={divisionUsuario} />
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
              {!loadingEmpresaUsuario ? (
                <>
                  <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                    <TableLayoutModal
                      titulo={""}
                      textButtonAdd={""}
                      onOpen={onOpenModal}
                      onReload={refreshEmpresaUsuario}
                    >
                      <DataTable
                        hiddenEmptyRow={true}
                        columns={columns1}
                        data={empresaUsuario}
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
          titulo={"Agregar Usuario aa"}
          isOpen={isOpen}
          onClose={onClose}
          refreshData={refreshDivisionUsuario}
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
