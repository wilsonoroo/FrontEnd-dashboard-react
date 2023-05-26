import { Box, Stack, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";

import FormControls from "./FormControls";

// Make sure you import your VakuModel and ValidationSchema from the correct place.

import VakuModel from "@/models/Vaku";
import { getItemForm } from "@/utils/global";
import DrawerComponent from "../drawer/DrawerComponent";

interface AgregarFormProps<T> {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
  fieldsToExclude: string[];
  model: T;
  onSubmit: (values: T) => void;
}
const FormVaku = <T extends VakuModel>({
  isOpen,
  onClose,
  refreshData,
  fieldsToExclude,
  model,
  onSubmit,
}: AgregarFormProps<T>) => {
  //const FormVaku: React.FC<AgregarFormProps<T extends VakuModel>> = ({
  //   isOpen,
  //   onClose,
  //   refreshData,
  //   fieldsToExclude,
  //   model,
  //   onSubmit,
  // }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Assuming you've defined the functions obtenerClientes and obtenerEstados
  //   const { data: clientes, isLoading: isLoadingClientes } = useFetch(() =>
  //     obtenerClientes()
  //   );
  //   const { data: estados, isLoading: isLoadingEstados } = useFetch(() =>
  //     obtenerEstados()
  //   );

  //   useEffect(() => {
  //     // Logic to update 'result' and 'selectEstados' when 'clientes' and 'estados' change
  //   }, [clientes, estados]);

  const initialValues = model.getEmptyObject();
  const validationSchema = model.getValidationSchema();
  const camposForm = model.getFormBuilder();

  const handleSubmitForm = (values: any) => {
    onSubmit(values);
  };

  //   const handleSubmit = async (
  //     values: any,
  //     { resetForm }: { resetForm: () => void }
  //   ) => {
  //     setIsLoading(true);
  //     // TODO llamado a la funcion para el server
  //     setIsLoading(false);

  //     onClose();
  //   };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
    >
      {({ handleSubmit, errors, touched, values, setFieldValue }) => (
        <DrawerComponent
          isOpen={isOpen}
          onClose={onClose}
          handleSubmit={() => {
            console.log(errors);
            console.log(values);
            handleSubmit();
          }}
          isLoading={isLoading}
        >
          <Stack spacing="24px">
            <Box>
              <VStack spacing={4} align="flex-start">
                <FormControls
                  errors={errors}
                  touched={touched}
                  fields={Object.keys(initialValues).filter(
                    (key) => !fieldsToExclude.includes(key)
                  )}
                  values={values}
                  getItemForm={getItemForm}
                  camposForm={camposForm}
                />
              </VStack>
            </Box>
          </Stack>
        </DrawerComponent>
      )}
    </Formik>
  );
};

export default FormVaku;
