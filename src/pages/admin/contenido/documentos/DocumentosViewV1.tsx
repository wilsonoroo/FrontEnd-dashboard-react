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
import { Divisiones } from "@/models/division/Disvision";
import { DocumentoVaku } from "@/models/documento/Documento";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
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
      `empresas/${idEmpresa}/documentos`
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
    columnHelper.accessor("correlativo", {
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
      header: "Docs",
    }),
    columnHelper.accessor("correlativo", {
      cell: (info) => {
        return (
          <Stack spacing={2}>
            <Box>
              {info.getValue() ? (
                <Badge variant="solid" colorScheme="green" fontSize="0.7em">
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
    columnHelper.accessor("correlativo", {
      cell: (info) => {
        return (
          <Stack spacing={2}>
            <Box>
              <Badge
                variant="solid"
                colorScheme={
                  info.row.original.checklist.tipo === "checklist"
                    ? "blue"
                    : "yellow"
                }
                fontSize="0.7em"
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
    columnHelper.accessor("correlativo", {
      cell: (info) => {
        let cuadrilla = info.row.original?.cuadrilla?.integrantes;
        !cuadrilla ??
          Object.keys(cuadrilla).map((key) => {
            console.log(cuadrilla[key]);
          });
        return (
          <Stack spacing={2}>
            {cuadrilla ? (
              Object.keys(cuadrilla).map((key) => {
                console.log(cuadrilla[key]);
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

    columnHelper.accessor("estado", {
      cell: (info) => {
        const color = getEstateColor(info.getValue());
        return <Badge colorScheme={color.color}>{color.text}</Badge>;
      },
      header: "estado",
    }),
  ];

  const getEstateText = (estado: string) => {
    switch (estado) {
      case "finalizado":
        return "Finalizado";
      case "finalizado_sin_plan_accion":
        return "Finalizado sin plan de accion";
      case "rechazado":
        return "Rechazado";
      case "rechazado_sin_plan_accion":
        return "Rechazado sin plan de accion";
      case "doc_sin_problemas":
        return "En Espera de validacion\n(sin problemas)";
      case "doc_con_problemas":
        return "En Espera de validacion\n(con problemas)";
      case "pendiente_doble_chequeo":
        return "En Espera de doble chequeo";
      case "pendiente_validar":
        return "En Espera de validacion";
      case "generado":
        return "Doc registrado";
      case "validado":
        return "Validado";

      default:
        return "";
    }
  };

  const getEstateColor = (estado: string) => {
    switch (estado) {
      case "finalizado":
        return { color: "green", text: "finalizado" };
      case "finalizado_sin_plan_accion":
        return { color: "green", text: "finalizado" };
      case "rechazado":
        return { color: "red", text: "Rechazado" };
      case "rechazado_sin_plan_accion":
        return { color: "red", text: "Rechazado sin plan acción" };
      case "doc_sin_problemas":
        return { color: "yellow", text: "En Espera de validación" };
      case "doc_con_problemas":
        return { color: "yellow", text: "En Espera de validación" };
      case "pendiente_validar":
        return { color: "yellow", text: "En Espera de validación" };
      case "pendiente_doble_chequeo":
        return { color: "yellow", text: "En Espera de doble chequeo" };
      case "generado":
        return { color: "blue", text: "registrado" };
      case "validado":
        return { color: "blue", text: "Validado" };

      default:
        return { color: "blue", text: "..." };
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
                    Cant. de {estadisticasTipo[estado]?.displayName}
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
