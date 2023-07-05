import {
  Box,
  Button,
  Grid,
  GridItem,
  Tag,
  TagLabel,
  useDisclosure,
} from "@chakra-ui/react";
/* import { Divider, Grid, Typography } from "@mui/material"; */
import CustomCard from "@/components/card/Card";
import { DataTable } from "@/components/dataTable/DataTable";
import FormVaku from "@/components/forms/FormVaku";
import { Gerencia } from "@/models/gerencia/Gerencia";
import { AddIcon } from "@chakra-ui/icons";
import useFetch from "@hooks/useFetch";
import { getDivisionesPorGerencia } from "@services/database/gerenciasServices";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GerenciasPage({}) {
  const { id, idGerencia } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [listaDivsion, setListaGerencia] = useState([]);

  const navigate = useNavigate();
  const {
    data: divisiones,
    firstLoading,
    refreshData,
    isLoading,
  } = useFetch(() => getDivisionesPorGerencia(id, idGerencia));

  useEffect(() => {
    setListaGerencia(divisiones);
  }, [divisiones]);

  const columnHelper = createColumnHelper<Divisiones>();
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
      header: "Numero OT",
      size: 120,
      minSize: 120,
      cell: (info) => {
        return info.getValue() ? (
          <span>
            <Tag
              bg={"#219ebc"}
              color="#fff"
              borderRadius={25}
              alignItems={"center"}
              alignContent={"center"}
              size={"sm"}
            >
              <TagLabel>{info.getValue()}</TagLabel>
            </Tag>
          </span>
        ) : (
          <span>
            <Tag colorScheme={"yellow"} borderRadius={25}>
              SN
            </Tag>
          </span>
        );
      },
    }),
    columnHelper.accessor("descripcion", {
      header: "Estado",
      size: 150,
      minSize: 150,
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor("tipo", {
      header: "Estado",
      size: 150,
      minSize: 150,
      cell: (info) => {
        return info.getValue();
      },
    }),
  ];

  // const camposForm: Record<string, CampoForm> = {
  //   fecha: {
  //     display: "Fecha Acordada",
  //     tipo: CampoFormKey.FECHA_NATIVO,
  //     field: "fecha",
  //     placeholder: "Ingresar fecha acordada",
  //   },
  //   fechaEntrega: {
  //     display: "Fecha Entrega",
  //     tipo: CampoFormKey.FECHA_NATIVO,
  //     field: "fechaEntrega",
  //     placeholder: "Ingresa la fecha de entrega",
  //   },
  //   descripcion: {
  //     display: "Descripcion",
  //     tipo: CampoFormKey.TEXT,
  //     field: "descripcion",
  //   },
  //   numeroOT: {
  //     display: "Numero OT",
  //     tipo: CampoFormKey.TEXT,
  //     field: "numeroOT",
  //   },
  //   tramiteAduanero: {
  //     display: "Tiene Tramite aduanero?",
  //     tipo: CampoFormKey.CHECKBOX,
  //     field: "tramiteAduanero",
  //   },
  //   destinoSanntiago: {
  //     display: "OT tendra destino Santiago?",
  //     tipo: CampoFormKey.CHECKBOX,
  //     field: "destinoSanntiago",
  //   },
  // };

  const vaku = new Gerencia();

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid>
        <GridItem>
          <Button
            mb="20px"
            float="right"
            width="180px"
            leftIcon={<AddIcon />}
            colorScheme="brand"
            onClick={onOpen}
          >
            Crear gerencia
          </Button>
        </GridItem>
      </Grid>

      {/* <AgregarGerenciaForm
        setDataGerencia={setDataGerencia}
        empresa={id}
        isOpen={isOpen}
        onClose={onClose}
        refreshData={refreshData}
      /> */}
      <FormVaku<Gerencia>
        isOpen={isOpen}
        onClose={onClose}
        refreshData={refreshData}
        fieldsToExclude={[]}
        model={vaku}
        onSubmit={(data) => }
        loading={false}
      />

      <>
        <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
          <CustomCard>
            <DataTable columns={columns} data={divisiones} />
          </CustomCard>
        </Box>
      </>
    </Box>
  );
}

enum TipoDivision {
  TipoProyecto = "TipoProyecto",
  TipoContrato = "TipoContrato",
  TipoArea = "TipoArea",
}

export class Divisiones {
  id: string;
  isEliminado: boolean;
  nombre: string;
  descripcion: string;
  tipo: TipoDivision;
  // Otras propiedades específicas de la orden

  constructor(
    id: string,
    isEliminado: boolean,
    nombre: string,
    descripcion: string,
    tipo: TipoDivision
  ) {
    this.id = id;
    this.isEliminado = isEliminado;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tipo = tipo;
  }
}
