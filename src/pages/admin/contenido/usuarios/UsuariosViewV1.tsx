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

import TableLayout from "@/components/dataTable/TableLayout";

import { AuthContext } from "@/contexts/AuthContextFb";
import useFetch from "@/hooks/useFetch";

import { DataTable } from "@/components/dataTable/DataTable";
import FormVaku from "@/components/forms/FormVaku";
import { Permiso } from "@/models/permisos/Permiso";
import { Rol } from "@/models/rol/Rol";
import { Enrolamiento } from "@/models/usuario/Enrolamiento";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { CategoriaVehiculo } from "@/models/utils/Utils";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { createUserAuth } from "@/services/usuarioVakuApi";
import { EditIcon } from "@chakra-ui/icons";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type EstadoLoading = {
  [key: string]: boolean;
};
export default function UsuariosView1(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    licencia: [
      { value: "clase_a1", label: "Clase A1" },
      { value: "clase_a2", label: "Clase A2" },
      { value: "clase_a3", label: "Clase A3" },
      { value: "clase_a4", label: "Clase A4" },
      { value: "clase_b", label: "Clase B" },
      { value: "clase_c", label: "Clase C" },
      { value: "clase_d", label: "Clase D" },
      { value: "clase_e", label: "Clase E" },
      { value: "clase_F", label: "Clase F" },
    ],
    categoriaVehiculos: [],
    permisos: [],
    rol: [],
    sexo: [
      {
        value: "masculino",
        label: "masculino",
      },
      {
        value: "femenino",
        label: "femenino",
      },
    ],
    turno: [],
  });

  const [iconLoading, setIconLoading] = useState<EstadoLoading>({});

  useEffect(() => {
    setOptions({
      licencia: [
        { value: "clase_a1", label: "Clase A1" },
        { value: "clase_a2", label: "Clase A2" },
        { value: "clase_a3", label: "Clase A3" },
        { value: "clase_a4", label: "Clase A4" },
        { value: "clase_b", label: "Clase B" },
        { value: "clase_c", label: "Clase C" },
        { value: "clase_d", label: "Clase D" },
        { value: "clase_e", label: "Clase E" },
        { value: "clase_F", label: "Clase F" },
      ],
      permisos: [
        { value: "administrador", label: "Administrador" },
        { value: "usuario", label: "Usuario" },
        { value: "supervisor", label: "Supervisor" },
        { value: "coordinador", label: "Coordinador" },
        { value: "secretaria", label: "Secretaria" },
        { value: "contador", label: "Contador" },
      ],
      rol: [],
      sexo: [
        {
          value: "masculino",
          label: "Masculino",
        },
        {
          value: "femenino",
          label: "Femenino",
        },
      ],
      turno: [],
      categoriaVehiculos: [],
    });
  }, []);
  const navigate = useNavigate();
  const userNew = new UsuarioVaku();

  const newRol = new Rol();
  const { currentUser } = useContext(AuthContext);
  const [newUser, setNewUser] = useState<UsuarioVaku>(userNew);

  let divisionRepository: FirebaseRealtimeRepository<UsuarioVaku>;
  let usuarioGlobal: FirebaseRealtimeRepository<UsuarioVaku>;
  let rolesRepository: FirebaseRealtimeRepository<Rol>;
  let categoriaVehiculoRepository: FirebaseRealtimeRepository<CategoriaVehiculo>;
  let permisosVehiculoRepository: FirebaseRealtimeRepository<Permiso>;

  if (idEmpresa === undefined) {
    divisionRepository = new FirebaseRealtimeRepository<UsuarioVaku>(
      `empresas/${currentUser.empresaId}/usuarios/auth`
    );
    rolesRepository = new FirebaseRealtimeRepository<Rol>(
      `empresas/${currentUser.empresaId}/utils/usuarios/roles`
    );
    categoriaVehiculoRepository =
      new FirebaseRealtimeRepository<CategoriaVehiculo>(
        `empresas/${currentUser.empresaId}/utils/vehiculos/tipo`
      );
    permisosVehiculoRepository = new FirebaseRealtimeRepository<Permiso>(
      `empresas/${currentUser.empresaId}/utils/usuarios/permisos`
    );

    usuarioGlobal = new FirebaseRealtimeRepository<UsuarioVaku>(`auth`);
  } else {
    divisionRepository = new FirebaseRealtimeRepository<UsuarioVaku>(
      `empresas/${idEmpresa}/usuarios`
    );
  }

  const {
    data: division,
    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => divisionRepository.getAll(UsuarioVaku));

  const {
    data: roles,
    firstLoading: loadingRoles,
    refreshData: refreshRoles,
    isLoading: loadingRolesData,
  } = useFetch(() => rolesRepository.getAll(Rol));
  const {
    data: categoriaVehiculos,
    firstLoading: loadingCategoriaVehiculos,
    refreshData: refreshCategoriaVehiculos,
    isLoading: loadingCategoriaVehiculosData,
  } = useFetch(() => categoriaVehiculoRepository.getAll(CategoriaVehiculo));

  const {
    data: permisos,
    firstLoading: loadingPermisos,
    refreshData: refreshPermisos,
    isLoading: loadingPermisosData,
  } = useFetch(() => permisosVehiculoRepository.getAll(Permiso));

  useEffect(() => {
    options.rol = roles;
    options.categoriaVehiculos = categoriaVehiculos;
    options.permisos = permisos;
    setOptions(options);
  }, [roles, categoriaVehiculos, permisos]);

  const columnHelper = createColumnHelper<UsuarioVaku>();

  const handleSaveGerencia = async (
    data: UsuarioVaku,
    resetForm: () => void
  ) => {
    setLoading(true);

    data.fechaVencimientoLicencia = moment(
      data.fechaVencimientoLicencia
    ).format("YYYY-MM-DD HH:mm:ss");
    data.rol.nombre = data.rol.id;
    if (data.id !== "") {
      data.empresaId = currentUser.empresaId;
      data.empresa = currentUser.empresa;
      data.enrolamiento = new Enrolamiento(false);
      createUserAuth(
        data.email,
        data.email.split("@")[0] + "1234",
        data.displayName
      )
        .then((userCredential) => {
          data.id = userCredential.uid;
          data.nombre = data.displayName;
          return divisionRepository.add(userCredential.uid, data);
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
          onClose();
          refreshData();
        });
    } else {
      divisionRepository
        .add(data.id, data)
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
          onClose();
          refreshData();
        });
    }

    createUserAuth(
      data.email,
      data.email.split("@")[0] + "1234",
      data.displayName
    )
      .then((userCredential) => {
        data.id = userCredential.uid;
        data.nombre = data.displayName;
        return divisionRepository.add(userCredential.uid, data);
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
        onClose();
        refreshData();
      });
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
            >
              <TagLabel>{info.getValue()}</TagLabel>
            </Tag>
          </Box>
        </VStack>
      ),
      header: "Nombre de Usuario",
      size: 300,
      minSize: 120,
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
        const color = info.getValue() ? "green" : "red";
        return (
          <>
            <Badge variant="outline" colorScheme={color} fontSize="0.7em">
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
        const color = info.getValue()?.isCompletado ? "green" : "red";
        return (
          <>
            <Badge variant="outline" colorScheme={color} fontSize="0.7em">
              {info.getValue()?.isCompletado ? "Si" : "No"}
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
                  let loadingIc = iconLoading;

                  loadingIc[info.row.original.id] = true;
                  setIconLoading({ ...loadingIc });

                  setTimeout(() => {
                    // setNewVehiculo(select);
                    setNewUser(select);
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
    }),
  ];

  return (
    <>
      {/* <TituloPage titulo={"Vehiculos"} subtitulo="Vehiculos" /> */}
      <>
        {!loadingData ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Usuarios"}
                textButtonAdd={" Agregar Usuario"}
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
        <FormVaku<UsuarioVaku>
          titulo={"Agregar Usuario"}
          isOpen={isOpen}
          onClose={onClose}
          refreshData={refreshData}
          fieldsToExclude={["id"]}
          model={newUser}
          initialValues={newUser}
          onSubmit={handleSaveGerencia}
          loading={loading}
          options={options}
          size="xl"
          grid={{ base: 1, md: 2 }}
        />
      </Flex>
    </>
  );
}
