import {
  Box,
  Flex,
  Grid,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "@/components/dataTable/DataTable";

import TableLayout from "@/components/dataTable/TableLayout";
import useFetch from "@/hooks/useFetch";

import FormVaku from "@/components/forms/FormVaku";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Divisiones } from "@/models/division/Disvision";
import { Equipo } from "@/models/equipo/Equipo";
import { Herramienta } from "@/models/herramienta/Herramienta";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { dateToTimeStamp } from "@/utils/global";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function HerramientasViewDivision(props: { titulo: string }) {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const newHerramienta = new Herramienta();

  // console.log(idEmpresa, idGerencia, idDivision)
  let herramientasRepositorio: any;
  if (isVersionRealtime) {
    herramientasRepositorio = new FirebaseRealtimeRepository<Equipo>(
      `empresas/${currentUser.empresaIdGlobal}/equipos/herramientas`
    );
  } else {
    // if (idEmpresa === undefined) {
    //   empresaVehiculoRepository = new FirestoreRepository<Vehiculo>(
    //     `empresas/${currentUser.empresaId}/vehiculos`
    //   );
    // } else {
    //   empresaVehiculoRepository = new FirestoreRepository<Vehiculo>(
    //     `empresas/${idEmpresa}/vehiculos`
    //   );
    // }
  }

  const {
    data: empresaHerramientas,
    firstLoading: loadingHerramientas,
    refreshData: refresh,
    isLoading: empresaVehiculosLoading,
  } = useFetch(() => herramientasRepositorio.getAll(Herramienta));

  // console.log(division, empresaVehiculos)

  const columnHelper = createColumnHelper<Equipo>();

  const [filasSeleccionadas, setFilasSeleccionadas] = useState([]);

  const handleGuardar = (data: Herramienta, resetForm: () => void) => {
    console.log(data);
    setLoading(true);

    data.createdAt = dateToTimeStamp(new Date());
    data.updatedAt = dateToTimeStamp(new Date());
    data.isEliminado = false;
    data.isServicio = true;

    herramientasRepositorio
      .add(null, data)
      .then(() => {
        toast({
          title: `Se ha creado la herramienta con éxito `,
          position: "top",
          status: "success",
          isClosable: true,
        });
        resetForm();
        onClose();
        refresh();
      })
      .catch((error: any) => {
        console.error(error);
      })
      .finally(() => {
        refresh();
        setLoading(false);
      });
  };

  const columns = [
    /*columnHelper.accessor("id", {
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
      // size: 100,
      // minSize: 120,
    }),*/
    columnHelper.accessor("identificador", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Identificador",
      // size: 300,
      // minSize: 250,
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
      // size: 300,
      // minSize: 250,
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
      // size: 300,
      // minSize: 250,
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
      // size: 300,
      // minSize: 250,
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
      </VStack>

      <>
        {!loadingHerramientas ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Herramientas"}
                textButtonAdd={"Agregar Herramientas"}
                onOpen={onOpen}
                onReload={refresh}
              >
                <DataTable columns={columns} data={empresaHerramientas} />
              </TableLayout>
            </Grid>
          </Box>
        ) : (
          <>Cargando..</>
        )}
      </>
      <Flex>
        <FormVaku<Herramienta>
          isOpen={isOpen}
          onClose={onClose}
          refreshData={refresh}
          fieldsToExclude={["id"]}
          model={newHerramienta}
          initialValues={newHerramienta}
          onSubmit={handleGuardar}
          loading={loading}
          options={options}
          size="xl"
          grid={{ base: 1, md: 2 }}
        />
      </Flex>
    </>
  );
}
