import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
/* import { Divider, Grid, Typography } from "@mui/material"; */
import "@inovua/reactdatagrid-community/index.css";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { getGerenciasArray } from "../../../services/database/gerenciasServices";
import AgregarGerenciaForm from "./components/AgregarGerenciaForm";
import TablaGerencias from "./components/TablaGerencias";

export default function GerenciasPage({ idEmpresa }) {

  const [listaGerencias, setListaGerencia] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // custom hook para realizar peticion
  const {
    data: gerencias,
    firstLoading,
    refreshData,
    isLoading,
  } = useFetch(() => getGerenciasArray(idEmpresa));

  useEffect(() => {
    console.log(gerencias, firstLoading);
    setListaGerencia(gerencias);
  }, [gerencias]);

  const [dataGerencia, setDataGerencia] = useState({
    data: [],
    loading: false,
  });
  // const [debouncedTerm, setDebouncedTerm] = useState(inputSearchValue);
  useEffect(() => {
    setDataGerencia({ data: gerencias, loading: isLoading });
  }, [gerencias]);

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

      <AgregarGerenciaForm
        setDataGerencia={setDataGerencia}
        empresa={idEmpresa}
        isOpen={isOpen}
        onClose={onClose}
        refreshData={refreshData}
      />

      <Grid>
        <TablaGerencias
          dataGerencia={dataGerencia}
          setDataGerencia={setDataGerencia}
          gerencias={gerencias}
          loadingData={isLoading}
          refreshData={refreshData}
        />
      </Grid>
    </Box>
  );
}



GerenciasPage.propTypes = {
  idEmpresa: PropTypes.string,

};