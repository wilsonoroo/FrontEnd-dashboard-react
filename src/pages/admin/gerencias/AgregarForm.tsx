// import {
//   Box,
//   Button,
//   Drawer,
//   DrawerBody,
//   DrawerCloseButton,
//   DrawerContent,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Stack,
//   VStack
// } from "@chakra-ui/react";
// import { ErrorMessage, Formik, getIn } from "formik";
// import { customAlphabet } from "nanoid";
// import { useEffect, useState } from "react";
// import useFetch from "../../../hooks/useFetch";

// import FormikReactSelectClientes from "@/components/select/SelectClientes";
// import VakuModel from "@/models/Vaku";
// import { CampoForm, CampoFormKey, getItemForm } from "../../../utils/global";

// export default function AgregarForm(props: {
//   isOpen: boolean;
//   onClose: () => void;
//   refreshData: () => void;
//   fieldsToExclude: string[];
//   model:VakuModel
// }) {

//   // const { isOpen, onClose, refreshData } = props;
//   // const [isLoading, setIsLoading] = useState(false);
//   // const [result, setResult] = useState([]);
//   // const [selectEstados, setSelectEstados] = useState([]);

//   // const nanoid = customAlphabet("1234567890ABCDEF", 10);

//   // const validationSchema = ordenSchema;
//   // const initialValues = new Orden().getEmptyObject();

//   // const fieldsToExclude = ["id", "clienteId","cliente", "estado", "productos"];

//   // const fields = Object.keys(initialValues).filter(key => !fieldsToExclude.includes(key));

//   // const { data: clientes, isLoading: isLoadingClientes } = useFetch(() =>
//   //   obtenerClientes()
//   // );
//   // const { data: estadps, isLoading: isLoadingEstados } = useFetch(() =>
//   //   obtenerEstados()
//   // );

//   // useEffect(() => {
//   //   if (clientes) {
//   //     const mapUser = clientes.map((item) => {
//   //       return {
//   //         label: item.nombre,
//   //         value: item.id,
//   //         ...item,
//   //       };
//   //     });

//   //     setResult(mapUser);
//   //   }
//   // }, [clientes]);

//   // useEffect(() => {
//   //   if (estadps) {
//   //     const mapUser = estadps.map((item) => {
//   //       return {
//   //         label: item.nombre,
//   //         value: item.id,
//   //         ...item,
//   //       };
//   //     });

//   //     setSelectEstados(mapUser);
//   //   }
//   // }, [estadps]);

//   // return (
//   //   <>
//   //     <Drawer size={"md"} isOpen={isOpen} placement="right" onClose={onClose}>
//   //       <Formik
//   //         validationSchema={validationSchema}
//   //         initialValues={{
//   //           id: nanoid(),
//   //           isEliminado: false,
//   //           estado: {},
//   //           clienteId: "",
//   //           cliente: {},
//   //           estadoId: "",
//   //           numeroOT: "",
//   //           descripcion: "",
//   //           destinoSanntiago: false,
//   //           tramiteAduanero: false,
//   //         }}
//   //         onSubmit={async (values, { resetForm }) => {
//   //           setIsLoading(true);
//   //           //TODO llamado a la funcion para el server
//   //           setIsLoading(false);

//   //           onClose();
//   //         }}
//   //       >
//   //         {({ handleSubmit, errors, touched, values, setFieldValue }) => (
//   //           <form onSubmit={handleSubmit}>
//   //             <DrawerOverlay />
//   //             <DrawerContent>
//   //               <DrawerCloseButton />
//   //               <DrawerHeader borderBottomWidth="1px">
//   //                 Crear gerencia
//   //               </DrawerHeader>
//   //               <DrawerBody>
//   //                 <Stack spacing="24px">
//   //                   <Box>
//   //                     <VStack spacing={4} align="flex-start">
//   //                       <FormControl
//   //                         isInvalid={errors.clienteId && touched.clienteId}
//   //                       >
//   //                         <FormLabel htmlFor="nombre">Cliente</FormLabel>

//   //                         <FormikReactSelectClientes
//   //                           nombre="cliente"
//   //                           isMulti={false}
//   //                           options={result}
//   //                           user={values?.clienteId}
//   //                         />
//   //                         <FormErrorMessage>
//   //                           {errors.clienteId}
//   //                         </FormErrorMessage>
//   //                       </FormControl>

//   //                       <FormControl
//   //                         isInvalid={errors.estadoId && touched.estadoId}
//   //                       >
//   //                         <FormLabel htmlFor="nombre">
//   //                           Estado del envio
//   //                         </FormLabel>

//   //                         <FormikReactSelectClientes
//   //                           nombre="estado"
//   //                           isMulti={false}
//   //                           options={selectEstados}
//   //                           user={values?.estadoId}
//   //                         />
//   //                         <FormErrorMessage>{errors.estadoId}</FormErrorMessage>
//   //                       </FormControl>

//   //                       {fields.map((field) =>
//   //                         field !== "id" &&
//   //                         field !== "clienteId" &&
//   //                         field !== "cliente" &&
//   //                         field !== "estado" &&
//   //                         field !== "productos" ? (
//   //                           <FormControl
//   //                             key={field}
//   //                             isInvalid={
//   //                               getIn(errors, field as string) &&
//   //                               getIn(touched, field as string)
//   //                             }
//   //                           >
//   //                             {getItemForm(camposForm[`${field}`])}
//   //                             <ErrorMessage name={field}>
//   //                               {(msg) => <div>{msg}</div>}
//   //                             </ErrorMessage>
//   //                           </FormControl>
//   //                         ) : (
//   //                           <></>
//   //                         )
//   //                       )}
//   //                     </VStack>
//   //                   </Box>
//   //                 </Stack>
//   //               </DrawerBody>
//   //               <DrawerFooter borderTopWidth="1px">
//   //                 <Button variant="outline" mr={3} onClick={onClose}>
//   //                   Cancelar
//   //                 </Button>
//   //                 <Button
//   //                   isLoading={isLoading}
//   //                   type="submit"
//   //                   colorScheme="vaku.700"
//   //                   bg={"vaku.700"}
//   //                   variant="solid"
//   //                   size="md"
//   //                   borderRadius={25}
//   //                 >
//   //                   Guardar
//   //                 </Button>
//   //               </DrawerFooter>
//   //             </DrawerContent>
//   //           </form>
//   //         )}
//   //       </Formik>
//   //     </Drawer>
//   //   </>
//   );
// }
