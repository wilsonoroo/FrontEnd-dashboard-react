import { Box, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";

import useFetch from "@hooks/useFetch";

import { Empresa } from "@/models/empresa/Empresa";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import EmpresaView, { EmpresaAdd } from "@components/card/EmpresaCard";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AgregarUsuario from "./agregarEmpresa";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Empresas(props: { titulo: string }) {
  const { titulo } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const divisionRepository = new FirestoreRepository<Empresa>(`empresas`);

  const {
    data: empresas,
    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => divisionRepository.getAll());

  useEffect(() => {
    // console.log(empresas);
  }, [empresas]);

  const handlePresEmpresa = (e: any) => {
    navigate("/admin/empresas/" + e.id, { state: { e } });
  };

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Text fontSize="xl">{titulo}</Text>
        <motion.ul
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="10px"
            mb="10px"
          >
            {empresas ? (
              empresas.map((item, index) => {
                return (
                  <>
                    <motion.div key={index} className="item" variants={item}>
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
                  </>
                );
              })
            ) : (
              <></>
            )}
            <EmpresaAdd
              onClick={onOpen}
              name={"Agregar nueva Empresa"}
              job={"a"}
              icon={MdAdd}
              key={2}
            />
          </SimpleGrid>
        </motion.ul>
      </Box>
      <AgregarUsuario
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onAddFinish={(finish) => {
          console.log(finish);
          if (finish) {
            refreshData();
          }
        }}
      />
    </>
  );
}
