import { guardarGerenciasEmpresas } from "@/services/database/gerenciasServices";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import useFetch from "@hooks/useFetch";
import { getUsuarios } from "@services/database/usuariosServices";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { ItemUser } from "./ItemUser";
import SelectColors from "./SelectColor";
import FormikReactSelect from "./SelectUser";

export default function AgregarGerenciaForm(props: {
  setDataGerencia: any;
  empresa: string;
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
}) {
  const { setDataGerencia, empresa, isOpen, onClose, refreshData } = props;
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const {
    data: usuarios,

    isLoading: isLoadingUsuarios,
  } = useFetch(() => getUsuarios(empresa));

  useEffect(() => {
    if (usuarios) {
      console.log(usuarios);
      const mapUser = usuarios.map((item) => {
        console.log(item);
        return {
          label: (
            <ItemUser
              name={item.displayName}
              displayName={item.displayName}
              fotografia={{
                url: item.fotografia?.url,
              }}
              cargo={item.cargo}
            />
          ),
          value: item.id,
          ...item,
        };
      });
      mapUser;
      setResult(mapUser);
    }
  }, [usuarios]);

  const validationSchema = yup.object({
    nombre: yup
      .string()
      .min(3, "El nombre debe tener al menos 2 caracteres")
      .max(20, "El nombre debe tener menos de 15 caracteres")
      .required("El nombre es requerido")
      .test(
        "no-numbers",
        "El nombre no puede tener numeros",
        (value) => !/\d/.test(value)
      ),
  });

  //   const { displayName, fotografia, cargo } = props;
  //   return (
  //     <Flex
  //       justify="space-between"
  //       direction={{
  //         base: "row",
  //         md: "column",
  //         lg: "row",
  //         xl: "column",
  //         "2xl": "row",
  //       }}
  //       mb="5"
  //       py={"2"}
  //       px={"0"}
  //     >
  //       <Box display={"flex"}>
  //         <Box
  //           // not work: transition={{ ... }}
  //           padding="2"
  //           display="flex"
  //           pr={3}
  //           justifyItems={"center"}
  //         >
  //           <WrapItem>
  //             <Avatar
  //               name="Dan Abrahmov"
  //               src={props.fotografia.url}
  //               borderColor={"#fff"}
  //             />
  //           </WrapItem>
  //         </Box>

  //         <Box
  //           // not work: transition={{ ... }}
  //           padding="0"
  //           display="flex"
  //           pr={0}
  //         >
  //           <HStack
  //             flexDirection={"column"}
  //             display={"flex"}
  //             justifyContent={"center"}
  //             alignItems="baseline"
  //           >
  //             <Box>
  //               <Text
  //                 fontWeight="bold"
  //                 me="14px"
  //                 isTruncated={false}
  //                 noOfLines={2}
  //                 maxWidth={"160px"}
  //               >
  //                 {displayName}
  //               </Text>
  //             </Box>
  //             <Box maxW={"160px"} maxWidth={"160px"}>
  //               <Text
  //                 color="secondaryGray.600"
  //                 fontSize={{
  //                   base: "sm",
  //                 }}
  //                 isTruncated
  //                 noOfLines={1}
  //                 fontWeight="400"
  //                 me="14px"
  //                 maxWidth={"160px"}
  //               >
  //                 {cargo}
  //               </Text>
  //             </Box>
  //           </HStack>
  //         </Box>
  //       </Box>
  //     </Flex>
  //   );
  // };

  return (
    <>
      <Drawer size={"md"} isOpen={isOpen} placement="right" onClose={onClose}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            nombre: "",
            isEliminado: false,
            encargados: [],
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values, empresa);
            setIsLoading(true);
            setDataGerencia({ loading: true });

            guardarGerenciasEmpresas(values, empresa)
              .then(() => {
                toast({
                  title: `Se ha creado la gerencia ${values.nombre}`,
                  position: "top",
                  status: "success",
                  isClosable: true,
                });
                refreshData();
                resetForm();
              })
              .catch((err) => {
                console.log(err);
              });
            setIsLoading(false);
            onClose();
            /* alert(JSON.stringify(values, null, 2)); */
          }}
        >
          {({ handleSubmit, errors, touched, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  Crear gerencia
                </DrawerHeader>
                <DrawerBody>
                  <Stack spacing="24px">
                    <Box>
                      <VStack spacing={4} align="flex-start">
                        <FormControl
                          isInvalid={errors.nombre && touched.nombre}
                        >
                          <FormLabel htmlFor="nombre">Nombre</FormLabel>
                          <Field
                            as={Input}
                            id="nombre"
                            name="nombre"
                            type="text"
                            placeholder="Ingresa el nombre"
                          />
                          <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                        </FormControl>

                        <FormControl
                          isInvalid={errors.nombre && touched.nombre}
                        >
                          {/* <SelectUserCard
                            titulo={"Listado Usuarios"}
                            value={{
                              value: "",
                              user: values?.encargados,
                            }}
                          /> */}
                          <FormLabel htmlFor="nombre">Encargado</FormLabel>

                          <FormikReactSelect
                            name="encargados"
                            isMulti={true}
                            options={result}
                            user={values?.encargados}
                          />
                          <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                        </FormControl>

                        <SelectColors value="#fff" />

                        {/* <Select
                          className="basic-single"
                          classNamePrefix="select"
                          isClearable={true}
                          isSearchable={true}
                          name="color"
                          options={result}
                          components={{ Option }}
                        /> */}
                        {/* <Field name="tags">
                          <Autocomplete
                            options={options}
                            result={result}
                            placeholder="Autocomplete"
                            setResult={(options: Option[]) => {
                              setFieldValue("tags", options);
                              setResult(options);
                            }}
                          />
                        </Field> */}
                      </VStack>
                    </Box>
                  </Stack>
                </DrawerBody>
                <DrawerFooter borderTopWidth="1px">
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    isLoading={isLoading}
                    type="submit"
                    colorScheme="secondaryGray"
                  >
                    Guardar
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </form>
          )}
        </Formik>
      </Drawer>
    </>
  );
}
