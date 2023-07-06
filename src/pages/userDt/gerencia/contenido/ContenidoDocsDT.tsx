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
import DocumentosViewV2 from "./documentos/DocumentosViewV2";
import PlanDeAccionViewV1 from "./planDeAccion/PlanDeAccionViewV1";

export default function ContenidoDocsDT(props: { titulo: string }) {
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

  useEffect(() => {
    empresaRepository.get(currentUser.empresaId).then((data: Empresa) => {
      setEmpresa(data);
      gerenciaRepository.get(idGerencia).then((data: Gerencia) => {
        setGerencia(data);
        divisonRepository.get(idDivision).then((data: Divisiones) => {
          setDivision(data);
        });
      });
    });
  }, []);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Headers
        titulo={isHome ? "Empresa" : `${division?.nombre}`}
        tituloBajo={isHome ? "Empresa" : `${division?.codigo}`}
        subtitulo={
          "En esta sección se especifica los detalles de Proyecto/Contrato/Área"
        }
        // rutas={[{ nombre: "Home", url: "/admin" }]}
        rutas={
          isHome
            ? [{ nombre: "Home", url: "/admin" }]
            : [
                {
                  nombre: "Home",
                  url: currentUser?.isSuperAdmin ? `/superAdmin/` : `/admin/`,
                },
                {
                  nombre: `Empresas`,
                  url: "/userDt/empresa",
                  state: {
                    empresa: {
                      id: empresa?.id,
                      nombre: empresa?.nombre,
                    },
                    gerencia: {
                      id: gerencia?.id,
                      nombre: gerencia?.nombre,
                    },
                  },
                },
                {
                  nombre: `Gerencias`,
                  url: `/userDt/empresa/${idEmpresa}`,
                  state: {
                    empresa: {
                      id: empresa?.id,
                      nombre: empresa?.nombre,
                    },
                  },
                },
                {
                  nombre: `${gerencia?.nombre}`,
                  url: `/userDt/empresa/${idEmpresa}/${idGerencia}`,
                  state: {
                    empresa: {
                      id: empresa?.id,
                      nombre: empresa?.nombre,
                    },
                  },
                },

                {
                  nombre: `${division?.nombre}`,
                  url: `/userDt/empresa/${idEmpresa}/${idGerencia}/${idDivision}`,

                  state: {
                    empresa: {
                      id: empresa?.id,
                      nombre: empresa?.nombre,
                    },
                    gerencia: {
                      id: gerencia?.id,
                      nombre: gerencia?.nombre,
                    },
                  },
                },
              ]
        }
        showButtonAdd={false}
        showButtonBars={false}
        showDivision={false}
        textButton="Agregar División"
      />
      <>
        <Tabs index={tabIndex} onChange={handleTabsChange} pl={5}>
          <TabList>
            <Tab>Documentos</Tab>
            <Tab>Plan de accion</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DocumentosViewV2 titulo="" />
            </TabPanel>
            <TabPanel>
              <PlanDeAccionViewV1 titulo="" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    </>
  );
}
