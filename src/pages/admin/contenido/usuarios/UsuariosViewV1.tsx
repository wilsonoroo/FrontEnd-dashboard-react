import {
  Box,
  Flex,
  Grid,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import TableLayout from "@/components/dataTable/TableLayout";

import { AuthContext } from "@/contexts/AuthContext";
import useFetch from "@/hooks/useFetch";

import { DataTable } from "@/components/dataTable/DataTable";
import FormVaku from "@/components/forms/FormVaku";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    permisos: [],
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
    });
  }, []);
  const navigate = useNavigate();
  const newUser = new UsuarioVaku();
  const { currentUser } = useContext(AuthContext);

  let divisionRepository: FirebaseRealtimeRepository<UsuarioVaku>;
  if (idEmpresa === undefined) {
    divisionRepository = new FirebaseRealtimeRepository<UsuarioVaku>(
      `empresas/${currentUser.empresaId}/usuarios/auth`
    );
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

  const columnHelper = createColumnHelper<UsuarioVaku>();

  const handleSaveGerencia = (data: UsuarioVaku) => {
    console.log(
      "🚀 ~ file: UsuariosViewV1.tsx:123 ~ handleSaveGerencia ~ data:",
      data
    );
    setLoading(true);

    divisionRepository
      .add(null, data)
      .then(() => {
        console.error("exito");
        toast({
          title: `Se ha creado el usuario con éxito `,
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
        console.error("error");
        setLoading(false);
      });

    return;
  };

  const columns = [
    columnHelper.accessor("displayName", {
      cell: (info) => (
        <Box px={5}>
          <Tag
            bg={"#fb8500"}
            color="#fff"
            alignItems={"center"}
            alignContent={"center"}
            size={"sm"}
          >
            <TagLabel>{info.getValue()}</TagLabel>
          </Tag>
        </Box>
      ),
      header: "Nombre de Usuario",
      size: 100,
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
      size: 300,
      minSize: 250,
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
    // columnHelper.accessor("id", {
    //   cell: () => {
    //     return (
    //       <Flex>
    //         <Box
    //           onClick={() => {}}
    //           fontSize={"lg"}
    //           cursor={"pointer"}
    //           m={1}
    //           title="Editar"
    //         >
    //           <BiEditAlt />
    //         </Box>
    //         <Box
    //           onClick={() => {}}
    //           fontSize={"lg"}
    //           cursor={"pointer"}
    //           m={1}
    //           title="Eliminar"
    //         >
    //           <BsTrash />
    //         </Box>
    //       </Flex>
    //     );
    //   },
    //   header: "Acciones",
    //   size: 100,
    //   minSize: 100,
    // }),
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
