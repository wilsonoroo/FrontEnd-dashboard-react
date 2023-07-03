import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  IconButton,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CellContext, createColumnHelper } from "@tanstack/react-table";

import { AuthContext } from "@/contexts/AuthContextFb";
import useFetch from "@/hooks/useFetch";

import { DataTable } from "@/components/dataTable/DataTable";
import TableLayout from "@/components/dataTable/TableLayout";
import { Checklist } from "@/models/checkList/CheckList";
import { Divisiones } from "@/models/division/Disvision";
import { DocumentoVaku } from "@/models/documento/Documento";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { getEstateColorAndText, getEstateText } from "@/utils/global";
import moment from "moment-timezone";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

type Estadisticas = {
  [key: string]: number;
};

type EstadisticasCompleja = {
  [key: string]: {
    cantidad: number;
    displayName: string;
  };
};

export default function DocumentosViewV1(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const newDivision = new Divisiones();
  const { currentUser } = useContext(AuthContext);
  const [estadisticas, setEstadisticas] = useState<Estadisticas>({});

  const [estadisticasTipo, setEstadisticasTipo] =
    useState<EstadisticasCompleja>({});

  let divisionRepository: FirebaseRealtimeRepository<DocumentoVaku>;
  if (idEmpresa === undefined) {
    divisionRepository = new FirebaseRealtimeRepository<DocumentoVaku>(
      `empresas/${currentUser.empresaId}/documentos`
    );
  } else {
    divisionRepository = new FirebaseRealtimeRepository<DocumentoVaku>(
      `empresas/${idDivision}/documentos`
    );
  }

  const {
    data: division,
    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => divisionRepository.getAll(DocumentoVaku));

  const calculateEstadisticas = useCallback(() => {
    const estadistic = division.reduce(
      (acc: { [key: string]: number }, obj) => {
        const { estado } = obj;
        acc[estado] = (acc[estado] || 0) + 1;
        return acc;
      },
      {}
    );

    const countByTipo = division.reduce((acc, obj) => {
      const { checklist } = obj;
      const tipoKey = checklist.tipo;

      if (!acc[tipoKey]) {
        acc[tipoKey] = {
          cantidad: 1,
          displayName: checklist.abreviatura,
        };
      } else {
        acc[tipoKey].cantidad++;
      }
      return acc;
    }, {});

    setEstadisticas(estadistic);
    setEstadisticasTipo(countByTipo);
  }, [division]);

  useEffect(() => {
    calculateEstadisticas();
  }, [calculateEstadisticas]);

  const columnHelper = createColumnHelper<DocumentoVaku>();

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
          </>
        );
      },
      header: "Ver documento",
    }),
    columnHelper.accessor("correlativo", {
      cell: (info) => {
        return (
          <Stack spacing={2}>
            <Box>
              {info.getValue() ? (
                <Badge variant="solid" bg={"#0B79F4"} fontSize="0.7em">
                  {info.getValue()}
                </Badge>
              ) : (
                <Text fontSize="sm"> --</Text>
              )}
            </Box>
            <Box>
              <Badge variant="outline" colorScheme="vaku" fontSize="0.7em">
                id: {info.row.original.id}
              </Badge>
            </Box>
          </Stack>
        );
      },
      header: "Correlativo",
      size: 140,
      minSize: 180,
    }),
    columnHelper.accessor("checklist", {
      cell: (info) => {
        const color = getColorTipoDocs(info.getValue());
        return (
          <Stack spacing={2}>
            <Box>
              <Badge
                bg={color?.bg}
                colorScheme={color.color}
                color={color.color}
              >
                {info.row.original.checklist.abreviatura}
              </Badge>
            </Box>
            <Box>
              <Badge variant="outline" colorScheme="vaku" fontSize="0.7em">
                {info.row.original.checklist.nombre}
              </Badge>
            </Box>
          </Stack>
        );
      },
      header: "Tipo Documento",
      sortingFn: (rowA, rowB, columnId) => {
        const numA = rowA.getValue(columnId) as Checklist;

        const numB = rowB.getValue(columnId) as Checklist;
        return numA.tipo > numB.tipo ? 1 : -1;
      },
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
      header: "fecha Creacion",
      sortingFn: (rowA, rowB, columnId) => {
        const numA = rowA.getValue(columnId);

        const numB = rowB.getValue(columnId);

        var isafter = moment(numA).isAfter(numB);
        return isafter ? 1 : -1;
      },

      meta: { isSortable: true },
    }),
    columnHelper.accessor("fechaValidacion", {
      cell: (info) => {
        let fecha = moment.utc(info.getValue());
        return (
          <Text fontSize="sm">
            {info?.getValue()
              ? moment(fecha).tz("America/Santiago").format("DD/MM/YYYY hh:mm")
              : "--"}
          </Text>
        );
      },
      header: "fecha Validacion",
      sortingFn: (rowA, rowB, columnId) => {
        const numA = rowA.getValue(columnId);

        const numB = rowB.getValue(columnId);

        var isafter = moment(numA).isAfter(numB);
        return isafter ? 1 : -1;
      },
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
    columnHelper.accessor("emisor", {
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
    columnHelper.accessor("validadoPor", {
      cell: (info) => {
        const infoCasted = info as unknown as CellContext<UsuarioVaku, object>;
        const data = info.getValue() as UsuarioVaku | undefined;

        return (
          <>
            {data ? (
              <Flex>
                <Avatar src={data?.fotografia?.url} />
                <Box ml="3">
                  <Text fontWeight="bold" fontSize="md">
                    {data?.displayName}
                  </Text>
                  <Text fontSize="sm"> {data?.cargo}</Text>
                </Box>
              </Flex>
            ) : (
              <Text fontSize="sm"> ---</Text>
            )}

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
      header: "Validado por",
    }),
    columnHelper.accessor("checklist", {
      cell: (info) => {
        let cuadrilla = info.row.original?.cuadrilla?.integrantes;

        return (
          <Stack spacing={2}>
            {cuadrilla ? (
              Object.keys(cuadrilla).map((key) => {
                return (
                  <Box>
                    <Badge
                      variant="outline"
                      colorScheme="vaku"
                      fontSize="0.7em"
                    >
                      {cuadrilla[key].displayName}
                    </Badge>
                  </Box>
                );
              })
            ) : (
              <></>
            )}
          </Stack>
        );
      },
      header: "Participantes",
    }),
  ];

  const getColorTipoDocs = (estado: Checklist) => {
    // #0B79F4 azul vaku
    // #9CFF00 verde
    // #FFE90D amarillo
    switch (estado.tipo) {
      case "checklist":
        return { color: "white", text: "finalizado", bg: "#0B79F4" };
      case "charla_5_minutos":
        return { color: "yellow.900", text: "finalizado", bg: "#9CFF00" };
      case "instructivo_seguridad":
        return { color: "yellow.900", text: "finalizado", bg: "#FFE90D" };

      default:
        return { color: "green", text: "finalizado", bg: "#0B79F4" };
    }
  };

  return (
    <>
      <>
        <StatGroup
          display="flex"
          alignItems={"start"}
          justifyContent={"start"}
          gap={2}
        >
          {Object.keys(estadisticas).map((estado: string) => (
            <Card variant={"outline"} w={250}>
              <CardBody>
                <Stat>
                  <StatLabel>{getEstateText(estado)}</StatLabel>
                  <StatNumber>{estadisticas[estado]?.toString()} </StatNumber>
                  <StatHelpText></StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          ))}
        </StatGroup>
        <StatGroup
          display="flex"
          alignItems={"start"}
          justifyContent={"start"}
          gap={2}
          mt={2}
        >
          {Object.keys(estadisticasTipo).map((estado: string) => (
            <Card variant={"outline"} w={250}>
              <CardBody>
                <Stat>
                  <StatLabel>
                    Cantidad. de {estadisticasTipo[estado]?.displayName}
                  </StatLabel>
                  <StatNumber>{estadisticasTipo[estado]?.cantidad} </StatNumber>
                  <StatHelpText></StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          ))}
        </StatGroup>
        {!loadingData ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Listado Documentos Vaku"}
                textButtonAdd={" Agregar Division"}
                onOpen={onOpen}
                onReload={refreshData}
                hiddenButtonAdd
                hiddenTitulo={false}
              >
                <DataTable
                  columns={columns}
                  data={division}
                  sortees={[{ id: "fechaCreacion", desc: true }]}
                />
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
