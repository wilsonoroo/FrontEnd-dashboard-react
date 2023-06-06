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
import { Vehiculo } from "@/models/vehiculo/Vehiculo";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EquiposViewV1(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [isList, setIsList] = useState(true);
  const navigate = useNavigate();
  const newDivision = new Divisiones();
  const { currentUser } = useContext(AuthContext);

  let divisionRepository: FirebaseRealtimeRepository<Vehiculo>;
  if (idEmpresa === undefined) {
    divisionRepository = new FirebaseRealtimeRepository<Vehiculo>(
      `empresas/${currentUser.empresaId}/vehiculos`
    );
  } else {
    divisionRepository = new FirebaseRealtimeRepository<Vehiculo>(
      `empresas/${idEmpresa}/vehiculos`
    );
  }

  const {
    data: division,
    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => divisionRepository.getAll(Vehiculo));

  const columnHelper = createColumnHelper<Vehiculo>();

  const columns = [
    columnHelper.accessor("numeroInterno", {
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
      header: "numero Interno",
      size: 100,
      minSize: 120,
    }),
    columnHelper.accessor("fechaVencimiento", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue().toLocaleString()}</Text>
          </span>
        );
      },
      header: "fechaVencimiento",
      size: 300,
      minSize: 250,
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
      size: 300,
      minSize: 250,
    }),
    columnHelper.accessor("patente", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "patente",
      size: 300,
      minSize: 250,
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
      size: 300,
      minSize: 250,
    }),
    columnHelper.accessor("tipoVehiculo", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "tipoVehiculo",
      size: 300,
      minSize: 250,
    }),
  ];

  return (
    <>
      <>
        {!loadingData ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Equipos"}
                textButtonAdd={" Agregar Division"}
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

      <Flex></Flex>
    </>
  );
}
