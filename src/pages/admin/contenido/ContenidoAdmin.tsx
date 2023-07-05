import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";
// import VehiculosView from "./vehiculos/VehiculosViewDivision";
import Headers from "@/components/header/header";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Divisiones } from "@/models/division/Disvision";
import { Empresa } from "@/models/empresa/Empresa";
import { Gerencia } from "@/models/gerencia/Gerencia";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useLocation, useParams } from "react-router-dom";
import EquiposViewDivision from "./equipos/EquiposViewDivision";
import HerramientasViewDivision from "./herramientas/HerramientasViewDivision";
import UsuariosViewDivision from "./usuarios/UsuariosViewDivision";
import VehiculosViewDivision from "./vehiculos/VehiculosViewDivision";

export default function ContenidoDetalleAdmin(props: { titulo: string }) {
  const { titulo } = props;

  const isVersionRealtime = import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? true
    : false;

  const [tabIndex, setTabIndex] = useState(0);
  const [empresa, setEmpresa] = useState<Empresa>();
  const [gerencia, setGerencia] = useState<Gerencia>();
  const [division, setDivision] = useState<Divisiones>();
  const { idEmpresa, idGerencia, idDivision } = useParams();
  let location = useLocation();

  const isHome = location.pathname.includes("home");

  const { currentUser } = useContext(AuthContext);

  let empresaRepository: any;
  let gerenciaRepository: any;
  let divisonRepository: any;
  let usuariosRepository: any;
  let divisionEmpresa: any;

  if (isVersionRealtime) {
    empresaRepository = new FirebaseRealtimeRepository<Empresa>(
      `empresaCompact`
    );
    gerenciaRepository = new FirebaseRealtimeRepository<Gerencia>(
      `empresaCompact/${idEmpresa}/gerencias`
    );
    divisonRepository = new FirebaseRealtimeRepository<Divisiones>(
      `empresaCompact/${idEmpresa}/gerencias/${idGerencia}/divisiones`
    );

    divisionEmpresa = new FirebaseRealtimeRepository<Divisiones>(`empresas`);
    usuariosRepository = new FirebaseRealtimeRepository<UsuarioVaku>(
      `empresas/${currentUser.empresaId}/usuarios/auth`
    );
  } else {
  }

  useEffect(() => {}, []);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Headers
        titulo={"Empresa"}
        tituloBajo={""}
        subtitulo={
          "En esta sección se especifica los detalles de Proyecto/Contrato/Área"
        }
        // rutas={[{ nombre: "Home", url: "/admin" }]}
        rutas={[{ nombre: "Inicio", url: "/admin" }]}
        showButtonAdd={false}
        showButtonBars={false}
        showDivision={false}
        textButton="Agregar División"
      />
      <>
        <Tabs index={tabIndex} onChange={handleTabsChange} pl={5}>
          <TabList>
            <Tab>Usuarios</Tab>
            <Tab>Vehículo</Tab>
            <Tab>Equipos</Tab>
            <Tab>Herramientas</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UsuariosViewDivision titulo="" />
            </TabPanel>
            <TabPanel>
              <VehiculosViewDivision titulo="" />
            </TabPanel>
            <TabPanel>
              <EquiposViewDivision titulo="" />
            </TabPanel>
            <TabPanel>
              <HerramientasViewDivision titulo="" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    </>
  );
}
