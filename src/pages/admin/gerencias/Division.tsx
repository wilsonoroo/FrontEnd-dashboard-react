import {
  Box,
  Flex,
  Grid,
  Spacer,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CellContext, createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "@/components/dataTable/DataTable";

import TableLayout from "@/components/dataTable/TableLayout";
import FormVaku from "@/components/forms/FormVaku";
import useFetch from "@/hooks/useFetch";
import { Divisiones } from "@/models/division/Disvision";
import { TipoDivision } from "@/models/tiposDivision/TipoDivision";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DivisionPage(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia } = useParams();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ordenSelect, setOrdenSelect] = useState<Divisiones>();
  const toast = useToast();

  const newDivision = new Divisiones();

  const divisionRepository = new FirebaseRealtimeRepository<Divisiones>(
    `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones`
  );

  const {
    data: division,
    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => divisionRepository.getAll(Divisiones));

  useEffect(() => {
    setOptions({
      tipoDivision: [
        {
          value: "proyecto",
          label: "Proyecto",
        },
        {
          value: "contrato",
          label: "Contrato",
        },
        {
          value: "area",
          label: "Area",
        },
      ],
    });
  }, []);

  const [isList, setIsList] = useState(true);

  const columnHelper = createColumnHelper<Divisiones>();

  const handleSaveGerencia = (data: Divisiones) => {
    setLoading(true);

    divisionRepository
      .add(null, data)
      .then(() => {
        toast({
          title: `Se ha creado la gerencia con éxito `,
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
      header: "Código Seg.",
      size: 100,
      minSize: 120,
    }),
    columnHelper.accessor("nombre", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Nombre",
      size: 300,
      minSize: 250,
    }),
    columnHelper.accessor("tipoDivision", {
      cell: (info) => {
        const infoCasted = info as unknown as CellContext<TipoDivision, object>;
        const data = info.getValue() as TipoDivision | undefined;
        const str: keyof TipoDivision = "nombre";

        console.log(data);
        console.log(infoCasted);
        console.log(info.getValue());
        return (
          <span>
            <Text fontSize="sm">{data.label}</Text>
          </span>
        );
      },
      header: "Tipo",
      size: 300,
      minSize: 250,
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

        <Flex width={"100%"} alignItems={"end"}>
          {/* titulo de la tabla  */}
          <Box>
            <Text
              fontSize="md"
              color={"secondaryGray.600"}
              mt={0}
              marginTop={"0px"}
            >
              {"En esta seccion se especifica los detalles de cada gerencia "}
            </Text>
          </Box>
          <Spacer />
          {/* Contenido de la tabla */}
          {/* encabezado */}
        </Flex>
      </VStack>
      <>
        {!loadingData ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <TableLayout
                titulo={"Divisiones"}
                textButtonAdd={" Agregar Division"}
                onOpen={onOpen}
                onReload={refreshData}
              >
                <DataTable columns={columns} data={division} />
              </TableLayout>
              <TableLayout
                titulo={"Documentos"}
                textButtonAdd={"Agregar Usuario"}
                onOpen={onOpen}
                hiddenButtonAdd={true}
                onReload={refreshData}
                debug={true}
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
        <FormVaku<Divisiones>
          isOpen={isOpen}
          onClose={onClose}
          refreshData={refreshData}
          fieldsToExclude={["id"]}
          model={newDivision}
          onSubmit={handleSaveGerencia}
          loading={loading}
          options={options}
        />
      </Flex>
    </>
  );
}
