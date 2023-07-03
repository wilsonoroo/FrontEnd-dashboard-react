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

import { DataTable } from "@/components/dataTable/DataTable";

import TableLayout from "@/components/dataTable/TableLayout";
import { AuthContext } from "@/contexts/AuthContextFb";
import useFetch from "@/hooks/useFetch";
import { Divisiones } from "@/models/division/Disvision";
import { PlanDeAccion } from "@/models/planDeAccion/PlanDeAccion";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import moment from "moment";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PlanDeAccionViewV1(props: { titulo: string }) {
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

  let divisionRepository: FirebaseRealtimeRepository<PlanDeAccion>;
  if (idEmpresa === undefined) {
    divisionRepository = new FirebaseRealtimeRepository<PlanDeAccion>(
      `empresas/${idDivision}/planesDeSeguimiento`
    );
  } else {
    divisionRepository = new FirebaseRealtimeRepository<PlanDeAccion>(
      `empresas/${idDivision}/planesDeSeguimiento`
    );
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
    columnHelper.accessor("id", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "id.",
      size: 100,
      minSize: 120,
    }),
    columnHelper.accessor("accionSugerida", {
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
      header: "Acción",
      size: 100,
      minSize: 120,
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
      size: 100,
      minSize: 120,
    }),
    // columnHelper.accessor("autor.areaCargo", {
    //   cell: (info) => {
    //     return (
    //       <span>
    //         <Text fontSize="sm">{info.getValue()}</Text>
    //       </span>
    //     );
    //   },
    //   header: "Area",
    //   size: 100,
    //   minSize: 120,
    // }),

    columnHelper.accessor("fechaCompromiso", {
      cell: (info) => {
        let fecha = moment(info.getValue())
          .tz("America/Santiago")
          .format("DD/MM/YYYY");
        fecha === "Invalid date" ? (fecha = info.getValue().toString()) : fecha;

        return (
          <span>
            <Text fontSize="sm">{fecha}</Text>
          </span>
        );
      },
      header: "Fecha compromiso",
    }),
    columnHelper.accessor("fechaCreacion", {
      cell: (info) => {
        let fecha = moment(info.getValue())
          .tz("America/Santiago")
          .format("DD/MM/YYYY");
        fecha === "Invalid date" ? (fecha = info.getValue().toString()) : fecha;

        return (
          <span>
            <Text fontSize="sm">{fecha}</Text>
          </span>
        );
      },
      header: "Fecha Creación",
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
