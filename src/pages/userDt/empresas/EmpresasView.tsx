import { Box, Grid, Skeleton, useDisclosure } from "@chakra-ui/react";

import useFetch from "@hooks/useFetch";

import Headers from "@/components/header/header";
import { AuthContext } from "@/contexts/AuthContextFb";
import { Empresa } from "@/models/empresa/Empresa";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import EmpresaView from "@components/card/EmpresaCard";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const itemAnim = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// TODO aliminar clase
export default function EmpresasUsuarioDtView(props: { titulo: string }) {
  const { titulo } = props;
  const isVersionRealtime = import.meta.env.VITE_FIREBASE_DATABASE_URL
    ? true
    : false;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  let empresasRepository: any;
  if (isVersionRealtime) {
    empresasRepository = new FirebaseRealtimeRepository<Empresa>(
      `empresaCompact`
    );
  } else {
  }

  const {
    data: empresas,

    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => empresasRepository.getAll(Empresa));
  console.log(
    "🚀 ~ file: EmpresasView.tsx:55 ~ EmpresasUsuarioDtView ~ empresas:",
    empresas
  );

  useEffect(() => {}, [empresas]);

  const handlePresEmpresa = (e: any) => {
    console.log("🚀 ~ file: EmpresasView.tsx:76 ~ handlePresEmpresa ~ e:", e);
    const isUserDt = currentUser?.isUserDt;

    if (isUserDt) {
      if (e.versionDataBase !== 1) {
        navigate("empresa/" + e.id, { state: { empresa: e } });
      } else {
        navigate("v1/empresas/" + e.id, { state: { empresa: e } });
      }
    } else {
      navigate("/admin/empresas/" + e.id, { state: { empresa: e } });
    }
  };

  return (
    <>
      <Headers
        titulo={"Empresas"}
        subtitulo={
          "En esta sección se especifica los detalles de cada gerencia"
        }
        refreshData={refreshData}
        onOpen={onOpen}
        rutas={[
          { nombre: "Home", url: "/" },
          { nombre: "Empresas", url: "/empresas" },
        ]}
        showButtonAdd={false}
      />
      <Box pt={{ base: "30px", md: "83px", xl: "30px" }}>
        {isLoading ? (
          <Grid
            templateColumns={{
              base: "repeat(3, 1fr)",
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
              xl: "repeat(4, 1fr)",
              "2xl": "repeat(6, 2fr)",
            }}
            templateRows={{
              base: "2fr",
              lg: "1fr",
              sm: "1fr",
            }}
            gap={{ base: "2", sm: "1", xl: "2", "2xl": "4" }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_item, index) => {
              return (
                <Skeleton key={index}>
                  <Box width={250} height={130}></Box>
                </Skeleton>
              );
            })}
          </Grid>
        ) : (
          <motion.div
            className="container"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <Grid
              templateColumns={{
                base: "repeat(3, 1fr)",
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(2, 1fr)",
                xl: "repeat(4, 1fr)",
                "2xl": "repeat(6, 2fr)",
              }}
              templateRows={{
                base: "2fr",
                lg: "1fr",
                sm: "1fr",
              }}
              gap={{ base: "2", sm: "1", xl: "2", "2xl": "4" }}
            >
              {empresas ? (
                empresas.map((item, index) => {
                  return (
                    <motion.div
                      key={index}
                      className="item"
                      variants={itemAnim}
                    >
                      <EmpresaView
                        onClick={(event) => handlePresEmpresa(event)}
                        avatar={item.url}
                        name={item?.nombre}
                        job={"a"}
                        key={item.id}
                        path={item?.key}
                        empresa={item}
                      />
                    </motion.div>
                  );
                })
              ) : (
                <></>
              )}
            </Grid>
          </motion.div>
        )}
      </Box>
    </>
  );
}
