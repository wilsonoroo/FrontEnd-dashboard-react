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
import DocumentosViewV1 from "./documentos/DocumentosViewV1";
import EquiposViewV1 from "./equipos/EquiposViewV1";
import PlanDeAccionViewV1 from "./planDeAccion/PlanDeAccionViewV1";
import UsuariosViewV1 from "./usuarios/UsuariosViewV1";
import VehiculosViewV1 from "./vehiculos/VehiculosViewV1";
import HerramientasViewV1 from "./herramientas/herramientasViewV1";

export default function ContenidoDetalleV1(props: { titulo: string }) {
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
              {"En esta seccion se especifica los detalles de cada gerencia "}
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
            <Tab >Plan de Acción</Tab>
            <Tab>Vehiculos</Tab>
            <Tab isDisabled>Equipos</Tab>
            <Tab isDisabled>Herramientas</Tab>
            <Tab isDisabled>Maquinas</Tab>
            <Tab>Usuarios</Tab>
            <Tab>Herramientas</Tab>
            <Tab>Equipos</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DocumentosViewV1 titulo="Documentos" />
            </TabPanel>
            <TabPanel>
              <PlanDeAccionViewV1 titulo="Plan de accion" />
            </TabPanel>
            <TabPanel>
              <VehiculosViewV1 titulo="Vehiculos" />
            </TabPanel>
            <TabPanel>
              <EquiposViewV1 titulo="Equipos" />
            </TabPanel>
            <TabPanel>
              <EquiposViewV1 titulo="Equipos" />
            </TabPanel>
            <TabPanel>
              <EquiposViewV1 titulo="Equipos" />
            </TabPanel>
            <TabPanel>
              <UsuariosViewV1 titulo="Usuarios" />
            </TabPanel>
            <TabPanel>
              <HerramientasViewV1 titulo="Herramientas" />
            </TabPanel>
            <TabPanel>
              <EquiposViewV1 titulo="Equipos" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    </>
  );
}
