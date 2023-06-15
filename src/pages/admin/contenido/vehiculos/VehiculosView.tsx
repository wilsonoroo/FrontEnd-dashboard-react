import {
  Box,
  Flex,
  Grid,
  Spacer,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { CellContext, createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "@/components/dataTable/DataTable";

import TableLayout from "@/components/dataTable/TableLayout";
import useFetch from "@/hooks/useFetch";

import { Divisiones } from "@/models/division/Disvision";
import { DocumentoVaku } from "@/models/documento/Documento";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirebaseRealtimeRepository } from "@/repositories/FirebaseRealtimeRepository";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VehiculosView(props: { titulo: string }) {
  const { titulo } = props;
  const { idEmpresa, idGerencia, idDivision } = useParams();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ordenSelect, setOrdenSelect] = useState<Divisiones>();
  const toast = useToast();
  const [isList, setIsList] = useState(true);
  const navigate = useNavigate();
  const newDivision = new Divisiones();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const divisionRepository = new FirebaseRealtimeRepository<DocumentoVaku>(
    `empresas/${idEmpresa}/gerencias/${idGerencia}/divisiones/${idDivision}/contenido/documentos`
  );

  const {
    data: division,
    firstLoading: loadingData,
    refreshData,
    isLoading,
  } = useFetch(() => divisionRepository.getAll(DocumentoVaku));

  const columnHelper = createColumnHelper<DocumentoVaku>();

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => (
        <Box px={5}>
          <Tag
            bg={"#fb8500"}
            color="#fff"
            alignItems={"center"}
            alignContent={"center"}
            size={"sm"}
          >
            <TagLabel>{info.getValue()}</TagLabel>
          </Tag>
        </Box>
      ),
      header: "ID.",
      size: 100,
      minSize: 120,
    }),
    columnHelper.accessor("correlativo", {
      cell: (info) => (
        <Box px={5}>
          <Tag
            bg={"#fb8500"}
            color="#fff"
            alignItems={"center"}
            alignContent={"center"}
            size={"sm"}
          >
            <TagLabel>{info.getValue()}</TagLabel>
          </Tag>
        </Box>
      ),
      header: "Correlativo",
      size: 100,
      minSize: 120,
    }),
    columnHelper.accessor("fechaValidacion", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "fecha Validacion",
      size: 300,
      minSize: 250,
    }),

    columnHelper.accessor("emisor", {
      cell: (info) => {
        const infoCasted = info as unknown as CellContext<UsuarioVaku, object>;
        const data = info.getValue() as UsuarioVaku | undefined;

        console.log(data);
        console.log(infoCasted);
        console.log(info.getValue());
        return (
          <span>
            <Text fontSize="sm">{`${data}`}</Text>
          </span>
        );
      },
      header: "emisor",
      size: 300,
      minSize: 250,
    }),

    columnHelper.accessor("estado", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "estado",
      size: 300,
      minSize: 250,
    }),
    columnHelper.accessor("fechaCreacion", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "fecha Creacion",
      size: 300,
      minSize: 250,
    }),
    columnHelper.accessor("fechaSubida", {
      cell: (info) => {
        return (
          <span>
            <Text fontSize="sm">{info.getValue()}</Text>
          </span>
        );
      },
      header: "fecha Subida",
      size: 300,
      minSize: 250,
    }),
    columnHelper.accessor("validadoPor", {
      cell: (info) => {
        const infoCasted = info as unknown as CellContext<UsuarioVaku, object>;
        const data = info.getValue() as UsuarioVaku | undefined;

        console.log(data);
        console.log(infoCasted);
        console.log(info.getValue());
        return (
          <span>
            <Text fontSize="sm">{`${data}`}</Text>
          </span>
        );
      },
      header: "validadoPor",
      size: 300,
      minSize: 250,
    }),
  ];
  const columns1 = [
    columnHelper.accessor("id", {
      cell: (info) => (
        <Box px={5}>
          <Tag
            bg={"#fb8500"}
            color="#fff"
            alignItems={"center"}
            alignContent={"center"}
            size={"sm"}
          >
            <TagLabel>{info.getValue()}</TagLabel>
          </Tag>
        </Box>
      ),
      header: "ID.",
      size: 100,
      minSize: 120,
    }),
    columnHelper.accessor("correlativo", {
      cell: (info) => (
        <Box px={5}>
          <Tag
            bg={"#fb8500"}
            color="#fff"
            alignItems={"center"}
            alignContent={"center"}
            size={"sm"}
          >
            <TagLabel>{info.getValue()}</TagLabel>
          </Tag>
        </Box>
      ),
      header: "Correlativo",
      size: 100,
      minSize: 120,
    }),

  ];

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
    </VStack>

    <>
      {!loadingData ? (
        <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
          <Grid templateColumns="repeat(1, 1fr)" gap={6}>
            <TableLayout
              titulo={"Vehiculos"}
              textButtonAdd={"Asignar Vehiculo"}
              onOpen={onOpenModal}
              onReload={refreshData}
            >
              <DataTable columns={columns} data={division} />
            </TableLayout>
          </Grid>
        </Box>
      ) : (
        <>Cargando..</>
      )}
    </>

    <Flex>
      <Modal isOpen={isModalOpen} onClose={onCloseModal} size="md">
        <ModalOverlay />
        <ModalContent
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <ModalHeader>Asignar Vehiculo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Agrega aquí el contenido del modal */}
            {!loadingData ? (
              <Box pt={{ base: "30px", md: "83px", xl: "40px" }}>
                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                  <TableLayout
                    titulo={"Vehiculos"}
                    textButtonAdd={"Asignar Vehiculo"}
                    onOpen={onOpenModal}
                    onReload={refreshData}
                  >
                    <DataTable columns={columns} data={division} />
                  </TableLayout>
                </Grid>
              </Box>
            ) : (
              <>Cargando..</>
            )}
          </ModalBody>
          <ModalFooter>
            {/* Agrega aquí el contenido del footer del modal */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  </>
  );
}
