import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { useState } from "react";
// import VehiculosView from "./vehiculos/VehiculosViewDivision";
import Headers from "@/components/header/header";
import { useLocation } from "react-router-dom";
import EquiposViewDivision from "./equipos/EquiposViewDivision";
import HerramientasViewDivision from "./herramientas/HerramientasViewDivision";
import UsuariosViewDivision from "./usuarios/UsuariosViewDivision";
import VehiculosViewDivision from "./vehiculos/VehiculosViewDivision";

export default function ContenidoDetalleAdmin(props: { titulo: string }) {
  const { titulo } = props;

  const [tabIndex, setTabIndex] = useState(0);
  const location = useLocation();
  console.log(
    "🚀 ~ file: ContenidoAdmin.tsx:19 ~ ContenidoDetalleAdmin ~ location:",
    location
  );

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Headers
        titulo={"División"}
        subtitulo={
          "En esta sección se especifica los detalles de cada gerencia"
        }
        rutas={[{ nombre: "Home", url: "/admin" }]}
        showButtonAdd={false}
        showButtonBars={false}
        showDivision={false}
        textButton="Agregar División"
      />
      <>
        <Tabs index={tabIndex} onChange={handleTabsChange} pl={5}>
          <TabList>
            <Tab>Vehículo</Tab>
            <Tab>Equipos</Tab>
            <Tab>Herramientas</Tab>
            <Tab>Usuarios</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VehiculosViewDivision titulo="" />
            </TabPanel>
            <TabPanel>
              <EquiposViewDivision titulo="" />
            </TabPanel>
            <TabPanel>
              <HerramientasViewDivision titulo="" />
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
