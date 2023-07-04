import {
  Avatar,
  Badge,
  Box,
  Flex,
  Grid,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CellContext, createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "@/components/dataTable/DataTable";

import TableLayout from "@/components/dataTable/TableLayout";
import { AuthContext } from "@/contexts/AuthContextFb";
import useFetch from "@/hooks/useFetch";
import { Divisiones } from "@/models/division/Disvision";
import { PlanDeAccion } from "@/models/planDeAccion/PlanDeAccion";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { getEstateColorAndText } from "@/utils/global";
import { ViewIcon } from "@chakra-ui/icons";
import moment from "moment";
import { useContext, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export default function PlanDeAccionViewV1(props: { titulo: string }) {
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
  const { currentUser } = useContext(AuthContext);

  let divisionRepository: any;
  let usuarioGlobal: any;

  if (isVersionRealtime) {
    divisionRepository = new FirebaseRealtimeRepository<PlanDeAccion>(
      `empresas/${idDivision}/planesDeSeguimiento`
    );
    usuarioGlobal = new FirebaseRealtimeRepository<PlanDeAccion>(`auth`);
  } else {
    console.log(`empresas/${currentUser.empresaIdGlobal}/usuarios/auth`);
  }

  // const divisionRepository = new FirebaseRealtimeRepository<PlanDeAccion>(
  //   `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones/${idDivision}/contenido/documentos`
  // );

  const {
    data: division,
    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => divisionRepository.getAll(PlanDeAccion));

  const columnHelper = createColumnHelper<PlanDeAccion>();

  const columns = [
    columnHelper.accessor("pdf", {
      cell: (info) => {
        return (
          <>
            {info.row.original?.pdf ? (
              <IconButton
                onClick={() => {
                  window.open(
                    `${info.row?.original?.pdf?.url}`,
                    "_blank",
                    "noreferrer"
                  );
                }}
                icon={<FaFilePdf h={4} w={4} />}
                mr={4}
                size="lg"
                aria-label={""}
              ></IconButton>
            ) : (
              "--"
            )}
            <IconButton
              onClick={() => {
                window.open(
                  `${info.row?.original?.pdf?.url}`,
                  "_blank",
                  "noreferrer"
                );
              }}
              icon={<ViewIcon h={4} w={4} />}
              mr={4}
              size="lg"
              aria-label={""}
            ></IconButton>
          </>
        );
      },
      header: "Ver documento",
    }),
    columnHelper.accessor("id", {
      cell: (info) => {
        return (
          <Badge variant="solid" colorScheme="red">
            <Text fontSize="sm">{info.getValue()}</Text>
          </Badge>
        );
      },
      header: "ID de Plan",
      size: 100,
      minSize: 120,
    }),
    columnHelper.accessor("accionSugerida", {
      cell: (info) => (
        <Box px={5}>
          <Text fontSize="sm">{info.getValue()}</Text>;
        </Box>
      ),
      header: "Acción sugerida",
      size: 100,
      minSize: 120,
    }),
    columnHelper.accessor("documento", {
      cell: (info) => {
        return (
          <Stack spacing={2}>
            <Box>
              {info.getValue() ? (
                <Badge variant="solid" bg={"#0B79F4"} fontSize="0.7em">
                  {info.getValue().checklist.abreviatura}
                </Badge>
              ) : (
                <Text fontSize="sm"> --</Text>
              )}
            </Box>
            <Box>
              <Badge variant="outline" colorScheme="vaku" fontSize="0.7em">
                {info.getValue().checklist.nombre}
              </Badge>
            </Box>
          </Stack>
        );
      },
      header: "Documento asociado",
      size: 140,
      minSize: 180,
    }),
    columnHelper.accessor("autor", {
      cell: (info) => {
        const infoCasted = info as unknown as CellContext<UsuarioVaku, object>;
        const data = info.getValue() as UsuarioVaku | undefined;

        return (
          <>
            <Flex>
              <Avatar src={data?.fotografia?.url} />
              <Box ml="3">
                <Text fontWeight="bold" fontSize="md">
                  {data?.displayName}
                </Text>
                <Text fontSize="sm"> {data?.cargo}</Text>
              </Box>
            </Flex>
            {/* <HStack>
              <WrapItem>
                <Avatar size="sm" name="Kent Dodds" src={data.fotografia.url} />{" "}
              </WrapItem>
              <VStack align={"start"}>
                <Box alignItems={"start"}>
                  <Text fontSize="sm">{data.displayName}</Text>
                </Box>
                <Box alignItems={"start"} mt={0}>
                  <Text mt={0} fontSize="xs" color={"fondo"}>
                    {data.cargo}
                  </Text>
                </Box>
              </VStack>
            </HStack> */}
          </>
        );
      },
      header: "emisor",
    }),
    columnHelper.accessor("fechaCreacion", {
      cell: (info) => {
        let fecha = moment.utc(info.getValue());
        return (
          <>
            <Text fontSize="sm">
              {moment(fecha).tz("America/Santiago").format("DD/MM/YYYY hh:mm")}
            </Text>
          </>
        );
      },
      header: "Fecha Creación",
      sortingFn: (rowA, rowB, columnId) => {
        const numA = rowA.getValue(columnId);

        const numB = rowB.getValue(columnId);

        var isafter = moment(numA).isAfter(numB);
        return isafter ? 1 : -1;
      },

      meta: { isSortable: true },
    }),
    columnHelper.accessor("fechaCompromiso", {
      cell: (info) => {
        let fecha = moment.utc(info.getValue());
        return (
          <>
            <Text fontSize="sm">
              {moment(fecha).tz("America/Santiago").format("DD/MM/YYYY hh:mm")}
            </Text>
          </>
        );
      },
      header: "fecha Compromiso",
      sortingFn: (rowA, rowB, columnId) => {
        const numA = rowA.getValue(columnId);

        const numB = rowB.getValue(columnId);

        var isafter = moment(numA).isAfter(numB);
        return isafter ? 1 : -1;
      },

      meta: { isSortable: true },
    }),
    columnHelper.accessor("fechaCreacion", {
      cell: () => {
        return <Text fontSize="sm">{12}</Text>;
      },
      header: "Días de mora",
      size: 100,
      minSize: 120,
    }),
    columnHelper.accessor("responsable", {
      cell: (info) => {
        const infoCasted = info as unknown as CellContext<UsuarioVaku, object>;
        const data = info.getValue() as UsuarioVaku | undefined;

        return (
          <>
            <Flex>
              <Avatar src={data?.fotografia?.url} />
              <Box ml="3">
                <Text fontWeight="bold" fontSize="md">
                  {data?.displayName}
                </Text>
                <Text fontSize="sm"> {data?.cargo}</Text>
              </Box>
            </Flex>
            {/* <HStack>
              <WrapItem>
                <Avatar size="sm" name="Kent Dodds" src={data.fotografia.url} />{" "}
              </WrapItem>
              <VStack align={"start"}>
                <Box alignItems={"start"}>
                  <Text fontSize="sm">{data.displayName}</Text>
                </Box>
                <Box alignItems={"start"} mt={0}>
                  <Text mt={0} fontSize="xs" color={"fondo"}>
                    {data.cargo}
                  </Text>
                </Box>
              </VStack>
            </HStack> */}
          </>
        );
      },
      header: "Responsable",
    }),
    columnHelper.accessor("estado", {
      cell: (info) => {
        const color = getEstateColorAndText(info.getValue());
        return (
          <Badge bg={color?.bg} colorScheme={color.color}>
            {color.text}
          </Badge>
        );
      },
      header: "estado",
    }),
  ];

  return (
    <>
      <>
        {!loadingData ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Planes de Accion"}
                textButtonAdd={" Agregar Plan de acción"}
                onOpen={onOpen}
                onReload={refreshData}
                hiddenButtonAdd
              >
                <DataTable columns={columns} data={division} />
              </TableLayout>
            </Grid>
          </Box>
        ) : (
          <>Cargando..</>
        )}
      </>

      <Flex></Flex>
    </>
  );
}
