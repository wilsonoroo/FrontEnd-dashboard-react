import {
  Badge,
  Box,
  Flex,
  Grid,
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
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import { createUserAuth } from "@/services/usuarioVakuApi";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type EstadoLoading = {
  [key: string]: boolean;
};

export default function UsuariosViewDivision(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [iconLoading, setIconLoading] = useState<EstadoLoading>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userNew = new UsuarioVaku();

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
      rol: [
        { value: "administrador", label: "Nivel 1" },
        { value: "administrador", label: "Nivel 2" },
        { value: "administrador", label: "Nivel 3" },
        { value: "administrador", label: "Nivel 4" },
      ],
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
    data: empresaUsuario,
    firstLoading: loadingEmpresaUsuario,
    refreshData: refreshEmpresaUsuario,
    isLoading: empresaUsuarioLoading,
  } = useFetch(() => empresaUsuarioRepository.getAll());

  const handleSaveUsuario = async (
    data: UsuarioVaku,
    resetForm: () => void
  ) => {
    setLoading(true);
    console.log(data);
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
          refreshEmpresaUsuario();
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
          refreshEmpresaUsuario();
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
        refreshEmpresaUsuario();
      });
  };

  // console.log(division, empresaVehiculos)

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
                <DataTable columns={columns} data={empresaUsuario} />
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
          refreshData={refreshEmpresaUsuario}
          fieldsToExclude={["id"]}
          model={newUser}
          initialValues={newUser}
          onSubmit={handleSaveUsuario}
          loading={false}
          options={options}
          size="xl"
          grid={{ base: 1, md: 2 }}
        />
      </Flex>
    </>
  );
}
