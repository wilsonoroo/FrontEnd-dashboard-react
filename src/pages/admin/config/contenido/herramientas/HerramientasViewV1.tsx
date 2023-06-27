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
  import { Herramienta } from "@/models/herramienta/Herramienta";
  import FormVaku from "@/components/forms/FormVaku";
  
  export default function HerramientasViewV1(props: { titulo: string }) {
    const { titulo } = props;
    const { idEmpresa, idGerencia, idDivision } = useParams();
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState({});
    const toast = useToast();
    const [isList, setIsList] = useState(true);
    const navigate = useNavigate();
    const newDivision = new Divisiones();
    const { currentUser } = useContext(AuthContext);
  
    let divisionRepository: FirebaseRealtimeRepository<Herramienta>;
    if (idEmpresa === undefined) {
      divisionRepository = new FirebaseRealtimeRepository<Herramienta>(
        `empresas/${currentUser.empresaId}/equipos/herramientas`
      );
    } else {
      divisionRepository = new FirebaseRealtimeRepository<Herramienta>(
        `empresas/${currentUser.empresaId}/equipos/herramientas`
      );
    }
  
    const {
      data: division,
      firstLoading: loadingData,
      refreshData,
      isLoading,
    } = useFetch(() => divisionRepository.getAll(Herramienta));
  
    const columnHelper = createColumnHelper<Herramienta>();
  
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
  
    return (
      <>
      <>
        {!loadingData ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Herramientas"}
                textButtonAdd={" Agregar Herramienta"}
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
  