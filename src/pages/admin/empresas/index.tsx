import { Box, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";

import useFetch from "@hooks/useFetch";
import { getEmpresasArray } from "@services/database/empresaServices";

import EmpresaView, { EmpresaAdd } from "@components/card/EmpresaCard";
import { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AgregarUsuario from "./agregarEmpresa";

export default function Empresas(props: { titulo: string }) {
  const { titulo } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const {
    data: empresas,
    firstLoading,
    refreshData,
    isLoading,
  } = useFetch(() => getEmpresasArray());

  useEffect(() => {
    console.log(empresas);
  }, [empresas]);

  const handlePresEmpresa = (e: any) => {
    navigate("/admin/empresas/" + e.id, { state: { e } });
  };

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Text fontSize="xl">{titulo}</Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
          gap="10px"
          mb="10px"
        >
          {empresas.map((item, index) => {
            return (
              <>
                <EmpresaView
                  onClick={(event) => handlePresEmpresa(event)}
                  avatar={item.url}
                  name={item?.nombre}
                  job={"a"}
                  key={item.id}
                  path={item?.key}
                  empresa={item}
                />
              </>
            );
          })}
          <EmpresaAdd
            onClick={onOpen}
            name={"Agregar nueva Empresa"}
            job={"a"}
            icon={MdAdd}
            key={2}
          />
        </SimpleGrid>
      </Box>
      <AgregarUsuario
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onAddFinish={(finish) => {
          if (finish) {
            refreshData();
          }
        }}
      />
    </>
  );
}
