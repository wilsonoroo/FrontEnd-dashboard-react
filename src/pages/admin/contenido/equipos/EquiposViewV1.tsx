import {
  Box,
  Flex,
  Grid,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "@/components/dataTable/DataTable";

import TableLayout from "@/components/dataTable/TableLayout";
import FormVaku from "@/components/forms/FormVaku";
import { AuthContext } from "@/contexts/AuthContextFb";
import useFetch from "@/hooks/useFetch";
import { Equipo } from "@/models/equipo/Equipo";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import { IRepository } from "@/repositories/IRepository";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EquiposViewV1(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  const toast = useToast();
  const [isList, setIsList] = useState(true);
  const navigate = useNavigate();

  const newEquipo = new Equipo();
  const { currentUser } = useContext(AuthContext);

  let divisionRepository: IRepository<Equipo>;

  if (import.meta.env.VITE_FIREBASE_DATABASE_URL) {
    divisionRepository = new FirebaseRealtimeRepository<Equipo>(
      `empresas/${currentUser.empresaId}/equipos/maquinasEquipo`
    );
  } else {
    divisionRepository = new FirestoreRepository<Equipo>(
      `empresas/${idEmpresa}/vehiculos`
    );
  }
  if (idEmpresa === undefined) {
  } else {
  }

  const {
    data: division,
    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => divisionRepository.getAll(Equipo));

  const columnHelper = createColumnHelper<Equipo>();

  const columns = [
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
    columnHelper.accessor("tipo", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "tipo",
      size: 300,
      minSize: 250,
    }),
  ];

  const handleSaveEquipo = (data: Equipo, _resetForm: () => void) => {
    if (import.meta.env.VITE_FIREBASE_DATABASE_URL) {
      data.categoria = "equipo";
      divisionRepository.add(null, data);
    }
  };

  return (
    <>
      <>
        {!loadingData ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Equipos"}
                textButtonAdd={" Agregar Equipo"}
                onOpen={onOpen}
                onReload={refreshData}
                hiddenButtonAdd={false}
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
        <Flex>
          <FormVaku<Equipo>
            titulo={"Agregar Equipo"}
            isOpen={isOpen}
            onClose={onClose}
            refreshData={refreshData}
            fieldsToExclude={["id"]}
            model={newEquipo}
            initialValues={newEquipo}
            onSubmit={handleSaveEquipo}
            loading={loading}
            options={options}
            size="xl"
            grid={{ base: 1, md: 2 }}
          />
        </Flex>
      </Flex>
    </>
  );
}
