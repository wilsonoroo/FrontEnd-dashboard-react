import {
  Box,
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";
import DocumentosView from "./documentos/DocumentosView";
import EquiposView from "./equipos/EquiposViewDivision";
import PlanDeAccionView from "./planDeAccion/PlanDeAccionView";
import UsuariosView from "./usuarios/UsuariosViewDivision";
// import VehiculosView from "./vehiculos/VehiculosViewDivision";
import VehiculosViewDivision from "./vehiculos/VehiculosViewDivision";
import EquiposViewDivision from "./equipos/EquiposViewDivision";
import UsuariosViewDivision from "./usuarios/UsuariosViewDivision";

export default function ContenidoDetalle(props: { titulo: string }) {
  const { titulo } = props;

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

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
              {"En esta seccion se especifica los detalles de la división"}
            </Text>
          </Box>
          <Spacer />
          {/* Contenido de la tabla */}
          {/* encabezado */}
        </Flex>
      </VStack>
      <>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            <Tab>Documentos</Tab>
            <Tab isDisabled>Plan de Accion</Tab>
            <Tab>Vehículo</Tab>
            <Tab >Equipos</Tab>
            <Tab >Herramientas</Tab>
            <Tab>Usuarios</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DocumentosView titulo="Documentos" />
            </TabPanel>
            <TabPanel>
              <PlanDeAccionView titulo="Plan de accion" />
            </TabPanel>
            <TabPanel>
              <VehiculosViewDivision titulo="" />
            </TabPanel>
            <TabPanel>
              <EquiposViewDivision titulo="" />
            </TabPanel>
            <TabPanel>
              {/* <EquiposViewDivision titulo="Herramientas" /> */}
            </TabPanel>
            <TabPanel>
              <UsuariosViewDivision titulo="" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    </>
  );
}
