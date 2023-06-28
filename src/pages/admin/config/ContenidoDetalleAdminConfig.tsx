import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";

// import VehiculosView from "./vehiculos/VehiculosViewDivision";
import Headers from "@/components/header/header";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Divisiones } from "@/models/division/Disvision";
import { Empresa } from "@/models/empresa/Empresa";
import { Gerencia } from "@/models/gerencia/Gerencia";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import { useParams } from "react-router-dom";
import EquiposViewDivision from "./contenido/equipos/EquiposViewDivision";
import HerramientasViewDivision from "./contenido/herramientas/HerramientasViewDivision";
import UsuariosViewDivision from "./contenido/usuarios/UsuariosViewDivision";
import VehiculosViewDivision from "./contenido/vehiculos/VehiculosViewDivision";

export default function ContenidoDetalleAdminConfig(props: { titulo: string }) {
  const { titulo } = props;

  const [tabIndex, setTabIndex] = useState(0);
  const [empresa, setEmpresa] = useState<Empresa>();
  const [gerencia, setGerencia] = useState<Gerencia>();
  const [division, setDivision] = useState<Divisiones>();
  const { idEmpresa, idGerencia, idDivision } = useParams();
  const { currentUser } = useContext(AuthContext);

  let empresaRepository = new FirestoreRepository<Empresa>(`empresas`);
  let gerenciaRepository = new FirestoreRepository<Gerencia>(
    `empresas/${idEmpresa}/gerencias`
  );
  let divisonRepository = new FirestoreRepository<Divisiones>(
    `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones`
  );

  useEffect(() => {
    empresaRepository.get(currentUser.empresaId).then((data) => {
      setEmpresa(data);
      gerenciaRepository.get(idGerencia).then((data) => {
        console.log(
          "🚀 ~ file: ContenidoDetalleAdminConfig.tsx:40 ~ gerenciaRepository.get ~ data:",
          data
        );
        setGerencia(data);
        divisonRepository.get(idDivision).then((data) => {
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
        titulo={`${division?.nombre}`}
        tituloBajo={`${division?.codigo}`}
        subtitulo={
          "En esta sección se especifica los detalles de cada gerencia"
        }
        rutas={[
          { nombre: "Home", 
            url: currentUser?.isSuperAdmin
              ? `/superAdmin/` 
              : `/admin/`,
          },

          {
            nombre: `Configuración`,
            url: currentUser?.isSuperAdmin
              ? `/superAdmin/config/${idEmpresa}/${idGerencia}`
              : `/admin/config/${idEmpresa}/${idGerencia}`,
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
            url: currentUser?.isSuperAdmin
              ? `/superAdmin/config`
              : `/admin/config`,
            state: {
              empresa: {
                id: empresa?.id,
                nombre: empresa?.nombre,
              },
            },
          },
          {
            nombre: `${gerencia?.nombre}`,
            url: currentUser?.isSuperAdmin
              ? `/superAdmin/config/${empresa?.id}/${idGerencia}`
              : `/admin/config/${empresa?.id}/${idGerencia}`,
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
          { nombre: `${division?.nombre}`, 
            url: currentUser?.isSuperAdmin
                ? `/superAdmin/config/${empresa?.id}/${idGerencia}/${idDivision}`
                : `/admin/config/${empresa?.id}/${idGerencia}/${idDivision}`,
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
        ]}
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
