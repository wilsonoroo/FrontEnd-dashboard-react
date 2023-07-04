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
import useFetch from "@/hooks/useFetch";

import FormVaku from "@/components/forms/FormVaku";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Vehiculo } from "@/models/vehiculo/Vehiculo";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { EstadoLoading, dateToTimeStamp } from "@/utils/global";
import { EditIcon } from "@chakra-ui/icons";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VehiculosViewDivision(props: { titulo: string }) {
  const { titulo } = props;
  const isVersionRealtime = import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? true
    : false;
  const { idEmpresa, idGerencia, idDivision } = useParams();
  const [iconLoading, setIconLoading] = useState<EstadoLoading>({});
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const { currentUser } = useContext(AuthContext);
  const vehiculoNew = new Vehiculo();
  vehiculoNew.setEmptyObject();
  const [newVehiculo, setNewVehiculo] = useState<Vehiculo>(vehiculoNew);

  let empresaVehiculoRepository: any;

  if (isVersionRealtime) {
    empresaVehiculoRepository = new FirebaseRealtimeRepository<Vehiculo>(
      `empresas/${currentUser.empresaIdGlobal}/vehiculos`
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
    console.log(`empresas/${currentUser.empresaIdGlobal}/vehiculos`);
  }

  const {
    data: empresaVehiculos,
    firstLoading: loadingEmpresaVehiculos,
    refreshData: refreshEmpresaVehiculos,
    isLoading: empresaVehiculosLoading,
  } = useFetch(() => empresaVehiculoRepository.getAll(Vehiculo));

  useEffect(() => {
    setOptions({
      tipoVehiculo: [
        {
          nombre: "Camioneta",
          displayName: "Camioneta",
        },
      ],
      tipo: [
        {
          nombre: "Vehículo Liviano",
          displayName: "Vehículo Liviano",
        },

        ,
      ],
    });
  }, []);

  const columnHelper = createColumnHelper<Vehiculo>();

  const [filasSeleccionadas, setFilasSeleccionadas] = useState([]);

  const handleSaveGerencia = (data: Vehiculo) => {
    console.log(data);
    setLoading(true);

    let id = data.patente;
    data.id = id;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    if (isVersionRealtime) {
      data.proximaMantencion = moment(data.proximaMantencion).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      data.fechaVencimiento = moment(data.fechaVencimiento).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      data.ultimaMantencion = moment(data.ultimaMantencion).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    } else {
      data.proximaMantencion = dateToTimeStamp(data.proximaMantencion);
      data.fechaVencimiento = dateToTimeStamp(data.fechaVencimiento);
      data.ultimaMantencion = dateToTimeStamp(data.ultimaMantencion);
    }

    empresaVehiculoRepository
      .add(id, data)
      .then(() => {
        toast({
          title: `Se ha creado el vehiculo con éxito `,
          position: "top",
          status: "success",
          isClosable: true,
        });
        onClose();
        refreshEmpresaVehiculos();
      })
      .catch((error: any) => {
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
        <Box px={5} alignItems={"start"} alignContent={"start"}>
          <Badge variant="solid" bg={"#0B79F4"} fontSize="0.7em">
            {info.getValue()}
          </Badge>
          {/* <Badge variant="solid" bg={"#3498DB"} fontSize="0.7em">
            {info.row.original.id}
          </Badge> */}
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
    }),
    columnHelper.accessor("tipoVehiculo", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "Tipo vehiculo",
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
      // size: 300,
      // minSize: 250,
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
    columnHelper.accessor("isServicio", {
      cell: (info) => {
        const isServicio = info.getValue();

        const bgColor = isServicio ? "#89FF00" : "#FFD600";
        // const textColor = isServicio ? "white" : "black";
        const text = isServicio ? "En servicio" : "En mantenimiento";

        return (
          <>
            <Badge
              // variant="outline"
              colorScheme={bgColor}
              fontSize="0.7em"
              textColor="#003560"
              style={{ backgroundColor: bgColor }}
            >
              {text}
            </Badge>
          </>
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
  ];

  return (
    <>
      <>
        {!loadingEmpresaVehiculos ? (
          <Box pt={{ base: 10, md: 10, xl: 10 }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <TableLayout
                titulo={"Vehiculos"}
                textButtonAdd={"Agregar Vehículos"}
                onOpen={onOpen}
                onReload={refreshEmpresaVehiculos}
              >
                <DataTable columns={columns} data={empresaVehiculos} />
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
          refreshData={refreshEmpresaVehiculos}
          fieldsToExclude={["id"]}
          model={newVehiculo}
          onSubmit={handleSaveGerencia}
          loading={loading}
          options={options}
          initialValues={newVehiculo}
          size="xl"
          grid={{ base: 1, md: 2 }}
        />
      </Flex>
    </>
  );
}
