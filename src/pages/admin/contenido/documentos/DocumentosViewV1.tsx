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
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CellContext, createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "@/components/dataTable/DataTable";

import TableLayout from "@/components/dataTable/TableLayout";
import { AuthContext } from "@/contexts/AuthContext";
import useFetch from "@/hooks/useFetch";
import { UsuarioVaku } from "@/model/user";
import { Divisiones } from "@/models/division/Disvision";
import { DocumentoVaku } from "@/models/documento/Documento";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { formatInTimeZone } from "date-fns-tz";
import { useContext } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export default function DocumentosViewV1(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const newDivision = new Divisiones();
  const { currentUser } = useContext(AuthContext);

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

  const columnHelper = createColumnHelper<DocumentoVaku>();

  const columns = [
    columnHelper.accessor("correlativo", {
      cell: (info) => {
        console.log(info.row.original);
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
        console.log(info.getValue());
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
    columnHelper.accessor("fechaCreacion", {
      cell: (info) => {
        let fecha = new Date(info.getValue() + " UTC");
        return (
          <>
            <Text fontSize="sm">
              {formatInTimeZone(
                new Date(fecha),
                "America/Santiago",
                "dd-MM-yyyy hh:mm"
              )}
            </Text>
          </>
        );
      },
      header: "fecha Creacion",

      meta: { isSortable: true },
    }),
    columnHelper.accessor("fechaValidacion", {
      cell: (info) => {
        let fecha = new Date(info.getValue() + " UTC");
        return (
          <Text fontSize="sm">
            {info?.getValue()
              ? formatInTimeZone(fecha, "America/Santiago", "dd-MM-yyyy hh:mm")
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
    columnHelper.accessor("estado", {
      cell: (info) => {
        const color = getEstateColor(info.getValue());
        return <Badge colorScheme={color.color}>{color.text}</Badge>;
      },
      header: "estado",
    }),
    columnHelper.accessor("validadoPor", {
      cell: (info) => {
        const infoCasted = info as unknown as CellContext<UsuarioVaku, object>;
        const data = info.getValue() as UsuarioVaku | undefined;
        console.log(data?.fotografia.url);
        return (
          <>
            {data ? (
              <Flex>
                <Avatar src={data?.fotografia.url} />
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
      header: "emisor",
    }),
  ];

  const getEstateColor = (estado: string) => {
    console.log(estado);
    switch (estado) {
      case "finalizado":
        return { color: "green", text: "finalizado" };
      case "finalizado_sin_plan_accion":
        return { color: "green", text: "finalizado" };
      case "rechazado":
        return { color: "red", text: "Rechazado" };
      case "doc_sin_problemas":
        return { color: "yellow", text: "En Espera de validacion" };

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
          <Card variant={"outline"} w={250}>
            <CardBody>
              <Stat>
                <StatLabel>Sent</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card variant={"outline"} w={250}>
            <CardBody>
              <Stat>
                <StatLabel>Clicked</StatLabel>
                <StatNumber>45</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  9.05%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
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
