import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";
// import VehiculosView from "./vehiculos/VehiculosViewDivision";
import Headers from "@/components/header/header";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Divisiones } from "@/models/division/Disvision";
import { Empresa } from "@/models/empresa/Empresa";
import { Gerencia } from "@/models/gerencia/Gerencia";
import { DocumentoVaku } from "@/models/documento/Documento";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";

export default function DocumentosSuperAdmin(props: { titulo: string }) {
  const { titulo } = props;

  const isVersionRealtime = import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? true
    : false;

  const [tabIndex, setTabIndex] = useState(0);
  const [empresa, setEmpresa] = useState<Empresa>();
  const [gerencia, setGerencia] = useState<Gerencia>();
  const [division, setDivision] = useState<Divisiones>();
  const [documento, setDocumento] = useState<DocumentoVaku>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { idEmpresa, idGerencia, idDivision } = useParams();
  let location = useLocation();

  const isHome = location.pathname.includes("home");

  const { currentUser } = useContext(AuthContext);

  let empresaRepository: any;
  let gerenciaRepository: any;
  let divisonRepository: any;
  let usuariosRepository: any;
  let divisionEmpresa: any;
  let documentosRepository: any;

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
    documentosRepository = new FirebaseRealtimeRepository<DocumentoVaku>(
      `empresaCompact/${idEmpresa}/config/documentos`
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
  // console.log(divisonRepository)

  const {
    data: documentos,
    firstLoading,
    refreshData,
    isLoading,
  } = useFetch(() => documentosRepository.getAll(DocumentoVaku));

  console.log(documentos)

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Headers
        titulo={"Documentos"}
        tituloBajo={`Division: ${gerencia?.nombre}`}
        onOpen={onOpen}
        rutas={[
        {
            nombre: "Home",
            url: currentUser?.isSuperAdmin ? `/superAdmin/` : `/admin/`,
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
            ? `/superAdmin/config/${idEmpresa}/${idGerencia}`
            : `/admin/config/${idEmpresa}/${idGerencia}`,
            state: {
            empresa: {
                id: empresa?.id,
                nombre: empresa?.nombre,
            },
            },
        },
        ]}
        showButtonAdd={false}
        // textButton="Agregar División"
        subtitulo={""}
      />
      <>
        {documentos.map((item, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => {
              setDocumento(item);
            }}
          >
            {item.displayName}
          </Button>
        ))}
      </>
      {documento && (
        <div>
          <h2>{documento.displayName}</h2>
          {/* <h2>{documento.tipo}</h2> */}
          {documento.mandantes && (
            // <div>
            //   Mandantes: {Object.keys(documento.mandantes).join(", ")}
            // </div>
            <div>
              Mandantes:
              {Object.keys(documento.mandantes).map((mandante, index) => (
                <div key={index}>{mandante}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
