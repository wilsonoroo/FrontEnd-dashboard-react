import {
  Badge,
  Box,
  Flex,
  Grid,
  IconButton,
  Stack,
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
import { Vehiculo } from "@/models/vehiculo/Vehiculo";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { EditIcon } from "@chakra-ui/icons";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type EstadoLoading = {
  [key: string]: boolean;
};
export default function VehiculosViewV1(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  let vehiculoNew = new Vehiculo();
  vehiculoNew.setEmptyObject();
  const toast = useToast();
  const [iconLoading, setIconLoading] = useState<EstadoLoading>({});
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  const [newVehiculo, setNewVehiculo] = useState<Vehiculo>(vehiculoNew);

  useEffect(() => {
    setOptions({
      tipoVehiculo: [
        {
          value: "semiremolque",
          label: "Semiremolque",
        },
        {
          value: "vehiculo_de_carga",
          label: "Vehículo de Carga",
        },
        {
          value: "vehiculo_liviano",
          label: "Vehículo Liviano",
        },
      ],
    });
  }, []);
  const navigate = useNavigate();

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

  const handleSaveGerencia = (data: Vehiculo) => {
    setLoading(true);

    data.fechaVencimiento = moment(data.fechaVencimiento).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    data.proximaMantencion = moment(data.proximaMantencion).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    data.ultimaMantencion = moment(data.ultimaMantencion).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    let id = data.id === "" ? null : data.id;

    divisionRepository
      .add(id, data)
      .then(() => {
        toast({
          title: `Se ha creado el vehiculo con éxito `,
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
    columnHelper.accessor("numeroInterno", {
      cell: (info) => (
        <Box px={0} alignItems={"start"} alignContent={"start"}>
          <Badge variant="solid" bg={"#0B79F4"} fontSize="0.7em">
            {info.getValue()}
          </Badge>
          <Badge variant="solid" bg={"#3498DB"} fontSize="0.7em">
            {info.row.original.id}
          </Badge>
        </Box>
      ),
      header: "numero Interno",
    }),
    columnHelper.accessor("fechaVencimiento", {
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
      header: "Fecha revisión técnica",
      sortingFn: (rowA, rowB, columnId) => {
        const numA = rowA.getValue(columnId);

        const numB = rowB.getValue(columnId);

        var isafter = moment(numA).isAfter(numB);
        return isafter ? 1 : -1;
      },
    }),
    columnHelper.accessor("tipoVehiculo", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Tipo Vehículo",
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
    columnHelper.accessor("kilometraje", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "kilometraje",
    }),
    columnHelper.accessor("numeroInterno", {
      cell: (info) => {
        let color = info.row.original.isEliminado
          ? "red"
          : info.row.original.isServicio
          ? "#9CFF00"
          : "yellow";
        let texto = info.row.original.isEliminado
          ? "dado de baja"
          : info.row.original.isServicio
          ? "en servicio"
          : "en mantenimiento";
        return (
          <Box px={5} alignItems={"start"} alignContent={"start"}>
            <Badge bg={color} colorScheme={"green"} fontSize="0.7em">
              {texto}
            </Badge>
          </Box>
        );
      },
      header: "Estado",
    }),
    columnHelper.accessor("id", {
      cell: (info) => {
        return (
          <Stack spacing={2}>
            <Box>
              <IconButton
                aria-label="Search database"
                isLoading={iconLoading[info.row.original.id]}
                onClick={() => {
                  const select = info.row.original;
                  let loadingIc = iconLoading;
                  loadingIc[info.row.original.id] = true;
                  setIconLoading({ ...loadingIc });

                  setTimeout(() => {
                    setNewVehiculo(select);

                    onOpen();
                    loadingIc[info.row.original.id] = false;
                    setIconLoading(loadingIc);
                  }, 1000);
                }}
                icon={<EditIcon />}
              />
            </Box>
          </Stack>
        );
      },
      header: "Editar",
    }),

    ,
  ];

  return (
    <>
      {/* <TituloPage titulo={"Vehiculos"} subtitulo="Vehiculos" /> */}
      <>
        {!loadingData ? (
          <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Vehiculos"}
                textButtonAdd={" Agregar Vehiculo"}
                onOpen={() => {
                  newVehiculo.setEmptyObject();
                  setNewVehiculo(newVehiculo);
                  onOpen();
                }}
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

      <Flex>
        <FormVaku<Vehiculo>
          isOpen={isOpen}
          onClose={onClose}
          refreshData={refreshData}
          fieldsToExclude={["id"]}
          model={newVehiculo}
          onSubmit={handleSaveGerencia}
          loading={loading}
          options={options}
          size="xl"
          initialValues={newVehiculo}
          grid={{ base: 1, md: 2 }}
        />
      </Flex>
    </>
  );
}
