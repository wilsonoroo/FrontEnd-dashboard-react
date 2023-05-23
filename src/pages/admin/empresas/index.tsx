import { Box, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";

import useFetch from "@hooks/useFetch";
import { getEmpresasArray } from "@services/database/empresaServices";
import { useEffect } from "react";

import EmpresaView, { EmpresaAdd } from "@components/card/EmpresaCard";
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
    console.log(empresas, firstLoading);
  }, [empresas]);

  const handlePresEmpresa = (e: any) => {
    console.log(e);

    navigate("/admin/empresas/" + e.id, { state: { e } });
  };

  console.log("Empresas");

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
                  key={index}
                  path={item?.id}
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
