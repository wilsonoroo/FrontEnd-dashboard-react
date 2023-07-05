import {
  Badge,
  Box,
  Flex,
  Grid,
  IconButton,
  Stack,
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
import { Divisiones } from "@/models/division/Disvision";
import { Equipo } from "@/models/equipo/Equipo";
import { Herramienta } from "@/models/herramienta/Herramienta";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { EstadoLoading, dateToTimeStamp } from "@/utils/global";
import { EditIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function HerramientasViewDivision(props: { titulo: string }) {
  const isVersionRealtime = import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? true
    : false;
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
  const herramientaNew = new Herramienta();
  const [iconLoading, setIconLoading] = useState<EstadoLoading>({});
  const [newHerramienta, setNewHerramienta] =
    useState<Herramienta>(herramientaNew);

  let herramientasRepositorio: any;
  if (isVersionRealtime) {
    herramientasRepositorio = new FirebaseRealtimeRepository<Equipo>(
      `empresas/${currentUser.empresaIdGlobal}/equipos/herramientas`
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
    data: empresaHerramientas,
    firstLoading: loadingHerramientas,
    refreshData: refresh,
    isLoading: empresaVehiculosLoading,
  } = useFetch(() => herramientasRepositorio.getAll(Herramienta));

  const columnHelper = createColumnHelper<Herramienta>();

  const [filasSeleccionadas, setFilasSeleccionadas] = useState([]);

  const handleGuardar = (data: Herramienta, resetForm: () => void) => {
    setLoading(true);

    if (!data.id || data.id === "") {
      data.createdAt = dateToTimeStamp(new Date());
      data.updatedAt = dateToTimeStamp(new Date());
      data.isEliminado = false;
      data.isServicio = true;

      herramientasRepositorio
        .add(null, data)
        .then(() => {
          toast({
            title: `Se ha creado la herramienta con éxito `,
            position: "top",
            status: "success",
            isClosable: true,
          });
          resetForm();
          onClose();
          refresh();
        })
        .catch((error: any) => {
          console.error(error);
        })
        .finally(() => {
          refresh();
          resetForm();
          setLoading(false);
        });
    } else {
      data.updatedAt = dateToTimeStamp(new Date());
      data.isEliminado = false;
      data.isServicio = true;

      herramientasRepositorio
        .update(data.id, data)
        .then(() => {
          toast({
            title: `Se ha actualizado la herramienta con éxito `,
            position: "top",
            status: "success",
            isClosable: true,
          });
        })
        .catch((error: any) => {
          console.error(error);
        })
        .finally(() => {
          refresh();
          setNewHerramienta(new Herramienta());
          setLoading(false);
          onClose();
          resetForm();
        });
    }
  };

  const columns = [
    /*columnHelper.accessor("id", {
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
      header: "ID.",
      // size: 100,
      // minSize: 120,
    }),*/
    columnHelper.accessor("identificador", {
      cell: (info) => {
        return (
          <Box px={5} alignItems={"start"} alignContent={"start"}>
            <Badge variant="solid" bg={"#0B79F4"} fontSize="0.7em">
              {info.getValue()}
            </Badge>
            {/* <Badge variant="solid" bg={"#3498DB"} fontSize="0.7em">
            {info.row.original.id}
          </Badge> */}
          </Box>
        );
      },
      header: "Identificador",
      // size: 300,
      // minSize: 250,
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
      // size: 300,
      // minSize: 250,
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
      // size: 300,
      // minSize: 250,
    }),
    columnHelper.accessor("tipo", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "tipo",
      // size: 300,
      // minSize: 250,
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
                    setNewHerramienta(select);

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
        {!loadingHerramientas ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Herramientas"}
                textButtonAdd={"Agregar Herramientas"}
                onOpen={onOpen}
                onReload={refresh}
              >
                <DataTable
                  placeholderSearch="Buscar..."
                  columns={columns}
                  data={empresaHerramientas}
                />
              </TableLayout>
            </Grid>
          </Box>
        ) : (
          <>Cargando..</>
        )}
      </>
      <Flex>
        <FormVaku<Herramienta>
          isOpen={isOpen}
          onClose={() => {
            console.log();
            setNewHerramienta(new Herramienta());
            onClose();
          }}
          refreshData={refresh}
          fieldsToExclude={["id"]}
          model={newHerramienta}
          initialValues={newHerramienta}
          onSubmit={handleGuardar}
          loading={loading}
          options={options}
          size="xl"
          grid={{ base: 1, md: 2 }}
        />
      </Flex>
    </>
  );
}
