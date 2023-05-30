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

import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

import TableLayout from "@/components/dataTable/TableLayout";

import { AuthContext } from "@/contexts/AuthContext";
import useFetch from "@/hooks/useFetch";

import { DataTable } from "@/components/dataTable/DataTable";
import FormVaku from "@/components/forms/FormVaku";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UsuariosView1(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    licencia: [],
    permisos: [],
    rol: [],
    sexo: [],
    turno: [],
  });
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
    setLoading(true);

    divisionRepository
      .add(null, data)
      .then(() => {
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
    columnHelper.accessor("id", {
      cell: (info) => {
        return (
          <Flex>
            <Box
              onClick={() => {}}
              fontSize={"lg"}
              cursor={"pointer"}
              m={1}
              title="Editar"
            >
              <BiEditAlt />
            </Box>
            <Box
              onClick={() => {}}
              fontSize={"lg"}
              cursor={"pointer"}
              m={1}
              title="Eliminar"
            >
              <BsTrash />
            </Box>
          </Flex>
        );
      },
      header: "Acciones",
      size: 100,
      minSize: 100,
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
          onSubmit={handleSaveGerencia}
          loading={loading}
          options={options}
        />
      </Flex>
    </>
  );
}
