import {
  Box,
  Center,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";

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
  loading: boolean;
}
const FormVaku = <T extends VakuModel>({
  isOpen,
  onClose,
  refreshData,
  fieldsToExclude,
  model,
  loading,
  onSubmit,
}: AgregarFormProps<T>) => {
  const initialValues = model.getEmptyObject();
  const validationSchema = model.getValidationSchema();
  const camposForm = model.getFormBuilder();

  const handleSubmitForm = (values: any) => {
    onSubmit(values);
  };

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
          isLoading={loading}
        >
          {loading ? (
            <ModalContent h="100%" w="100%">
              <ModalOverlay
                bg="whiteAlpha"
                w="100%"
                backdropFilter="auto"
                backdropInvert="0%"
                backdropBlur="10px"
              >
                <Center h="100%">
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="vaku.500"
                    size="xl"
                  />
                </Center>
              </ModalOverlay>
            </ModalContent>
          ) : (
            <></>
          )}
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
                  setFieldValue={setFieldValue}
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
