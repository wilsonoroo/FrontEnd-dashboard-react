import {
  Badge,
  Box,
  Flex,
  Grid,
  IconButton,
  Stack,
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
import { Enrolamiento } from "@/models/usuario/Enrolamiento";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { createUserAuth } from "@/services/usuarioVakuApi";
import { EditIcon } from "@chakra-ui/icons";
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
  const [loading, setLoading] = useState(false);
  const { currentUser, currentUserAll } = useContext(AuthContext);
  const [iconLoading, setIconLoading] = useState<EstadoLoading>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const newUser = new UsuarioVaku();
  const [userNew, setUserNew] = useState<UsuarioVaku>(newUser);

  const [options, setOptions] = useState({
    licencia: [
      { nombre: "clase_a1", displayName: "Clase A1" },
      { nombre: "clase_a2", displayName: "Clase A2" },
      { nombre: "clase_a3", displayName: "Clase A3" },
      { nombre: "clase_a4", displayName: "Clase A4" },
      { nombre: "clase_b", displayName: "Clase B" },
      { nombre: "clase_c", displayName: "Clase C" },
      { nombre: "clase_d", displayName: "Clase D" },
      { nombre: "clase_e", displayName: "Clase E" },
      { nombre: "clase_F", displayName: "Clase F" },
    ],
    categoriaVehiculos: [],
    permisos: [],
    rol: [],
    sexo: [
      {
        nombre: "masculino",
        displayName: "masculino",
      },
      {
        nombre: "femenino",
        displayName: "femenino",
      },
    ],
    turno: [],
  });

  useEffect(() => {
    setOptions({
      licencia: [
        { nombre: "clase_a1", displayName: "Clase A1" },
        { nombre: "clase_a2", displayName: "Clase A2" },
        { nombre: "clase_a3", displayName: "Clase A3" },
        { nombre: "clase_a4", displayName: "Clase A4" },
        { nombre: "clase_b", displayName: "Clase B" },
        { nombre: "clase_c", displayName: "Clase C" },
        { nombre: "clase_d", displayName: "Clase D" },
        { nombre: "clase_e", displayName: "Clase E" },
        { nombre: "clase_F", displayName: "Clase F" },
      ],
      permisos: [
        { nombre: "administrador", displayName: "Administrador" },
        { nombre: "usuario", displayName: "Usuario" },
        { nombre: "supervisor", displayName: "Supervisor" },
        { nombre: "coordinador", displayName: "Coordinador" },
        { nombre: "secretaria", displayName: "Secretaria" },
        { nombre: "contador", displayName: "Contador" },
      ],
      rol: [
        { nombre: "administrador", displayName: "Nivel 1" },
        { nombre: "administrador", displayName: "Nivel 2" },
        { nombre: "administrador", displayName: "Nivel 3" },
        { nombre: "administrador", displayName: "Nivel 4" },
      ],
      sexo: [
        {
          nombre: "masculino",
          displayName: "Masculino",
        },
        {
          nombre: "femenino",
          displayName: "Femenino",
        },
      ],
      turno: [],
      categoriaVehiculos: [],
    });
  }, []);

  //const [newUser, setNewUser] = useState<UsuarioVaku>(userNew);

  let empresaUsuarioRepository: any;
  let usuarioGlobal: any;
  let divisionUsuarioRepository: any;
  if (isVersionRealtime) {
    empresaUsuarioRepository = new FirebaseRealtimeRepository<UsuarioVaku>(
      `empresas/${currentUser.empresaIdGlobal}/usuarios/auth`
    );
    usuarioGlobal = new FirebaseRealtimeRepository<UsuarioVaku>(`auth`);
  } else {
  }

  const {
    data: empresaUsuario,
    firstLoading: loadingEmpresaUsuario,
    refreshData: refreshEmpresaUsuario,
    isLoading: empresaUsuarioLoading,
  } = useFetch(() => empresaUsuarioRepository.getAll(UsuarioVaku));

  const handleSaveUsuario = async (
    data: UsuarioVaku,
    resetForm: () => void
  ) => {
    setLoading(true);

    if (!data.id || data.id === "") {
      createUserAuth(
        data.email,
        data.email.split("@")[0] + "1234",
        data.displayName
      )
        .then((userCredential) => {
          data.id = userCredential.uid;
          data.nombre = data.displayName;
          data.empresa = currentUserAll.empresa;
          data.empresaId = currentUserAll.empresaId;
          data.enrolamiento = new Enrolamiento(false);
          data.tipo = "usuario_vaku";

          return empresaUsuarioRepository.add(userCredential.uid, data);
        })

        .then(() => {
          toast({
            title: `Se ha creado el usuario con éxito `,
            position: "top",
            status: "success",
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: `Se ha ocurrido un problema al crear el usuario`,
            position: "top",
            status: "error",
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
          resetForm();
          setUserNew(new UsuarioVaku());
          onClose();
          refreshEmpresaUsuario();
        });
    } else {
      data.nombre = data.displayName;
      data.empresa = currentUserAll.empresa;
      data.empresaId = currentUserAll.empresaId;

      data.tipo = "usuario_vaku";

      empresaUsuarioRepository
        .update(data.id, data)
        .then(() => {
          toast({
            title: `Se ha Actualizado el usuario con éxito `,
            position: "top",
            status: "success",
            isClosable: true,
          });
        })
        .catch((error: any) => {
          console.error(error);
          toast({
            title: `Se ha ocurrido un problema al crear el usuario`,
            position: "top",
            status: "error",
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
          resetForm();
          onClose();
          setUserNew(new UsuarioVaku());
          refreshEmpresaUsuario();
        });
    }
  };

  const columnHelper = createColumnHelper<UsuarioVaku>();

  const [filasSeleccionadas, setFilasSeleccionadas] = useState([]);

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
            <Text fontSize="sm">{info.getValue()?.displayName}</Text>
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
                  console.log(
                    "🚀 ~ file: UsuariosViewDivision.tsx:362 ~ UsuariosViewDivision ~ select:",
                    select
                  );
                  let loadingIc = iconLoading;
                  loadingIc[info.row.original.id] = true;
                  setIconLoading({ ...loadingIc });

                  setTimeout(() => {
                    setUserNew(select);

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
        {!loadingEmpresaUsuario ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Usuarios"}
                textButtonAdd={"Agregar Usuarios"}
                onOpen={onOpen}
                onReload={refreshEmpresaUsuario}
              >
                <DataTable
                  placeholderSearch="Buscar..."
                  columns={columns}
                  data={empresaUsuario}
                />
              </TableLayout>
            </Grid>
          </Box>
        ) : (
          <>Cargando..</>
        )}
      </>

      <Flex>
        <FormVaku<UsuarioVaku>
          titulo={"Agregar Usuario"}
          isOpen={isOpen}
          onClose={() => {
            console.log();
            setUserNew(new UsuarioVaku());
            onClose();
          }}
          refreshData={refreshEmpresaUsuario}
          fieldsToExclude={["id"]}
          model={userNew}
          initialValues={userNew}
          onSubmit={handleSaveUsuario}
          loading={loading}
          options={options}
          size="xl"
          grid={{ base: 1, md: 2 }}
        />
      </Flex>
    </>
  );
}
