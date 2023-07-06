import { Box, Flex, Grid, Tag, TagLabel, Text, VStack } from "@chakra-ui/react";
import { CellContext, createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "@/components/dataTable/DataTable";

import CustomCard from "@/components/card/Card";
import useFetch from "@/hooks/useFetch";

import { DocumentoVaku } from "@/models/documento/Documento";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useParams } from "react-router-dom";

export default function DocumentosViewDT(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();

  const divisionRepository = new FirebaseRealtimeRepository<DocumentoVaku>(
    `empresas/${idDivision}/documentos`
  );

  const {
    data: division,
    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => divisionRepository.getAll(DocumentoVaku));

  const columnHelper = createColumnHelper<DocumentoVaku>();

  const columns = [
    columnHelper.accessor("id", {
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
      size: 100,
      minSize: 120,
    }),
    columnHelper.accessor("correlativo", {
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
      header: "Correlativo",
      size: 100,
      minSize: 120,
    }),
    columnHelper.accessor("fechaValidacion", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "fecha Validación",
      size: 300,
      minSize: 250,
    }),

    columnHelper.accessor("emisor", {
      cell: (info) => {
        const infoCasted = info as unknown as CellContext<UsuarioVaku, object>;
        const data = info.getValue() as UsuarioVaku | undefined;

        return (
          <span>
            <Text fontSize="sm">{`${data}`}</Text>
          </span>
        );
      },
      header: "emisor",
      size: 300,
      minSize: 250,
    }),

    columnHelper.accessor("estado", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "estado",
      size: 300,
      minSize: 250,
    }),
    columnHelper.accessor("fechaCreacion", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "fecha Creacion",
      size: 300,
      minSize: 250,
    }),
    columnHelper.accessor("fechaSubida", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "fecha Subida",
      size: 300,
      minSize: 250,
    }),
    columnHelper.accessor("validadoPor", {
      cell: (info) => {
        const infoCasted = info as unknown as CellContext<UsuarioVaku, object>;
        const data = info.getValue() as UsuarioVaku | undefined;

        return (
          <span>
            <Text fontSize="sm">{`${data}`}</Text>
          </span>
        );
      },
      header: "validadoPor",
      size: 300,
      minSize: 250,
    }),
  ];

  return (
    <>
      <VStack align={"start"} pl={"20px"}>
        <Text
          as="b"
          fontSize="3xl"
          color={"vaku.700"}
          fontFamily="Oswald"
          textStyle="secondary"
        >
          {titulo}
        </Text>
      </VStack>
      <>
        {!loadingData ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <CustomCard>
                <DataTable columns={columns} data={division} />
              </CustomCard>
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
