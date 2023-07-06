import {
  Alert,
  AlertIcon,
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
import { useEffect, useState } from "react";
import DrawerComponent from "../drawer/DrawerComponent";

interface AgregarFormProps<T> {
  isOpen: boolean;
  onClose: () => void;
  refreshData?: () => void;
  fieldsToExclude: string[];
  model: T;
  onSubmit: (values: T, resetForm: () => void) => void;
  loading: boolean;
  options?: any;
  titulo?: string;
  size?: string;
  initialValues?: T;
  grid?: { base: number; md: number; xl?: number; "2xl"?: number };
}
const FormVaku = <T extends VakuModel>({
  isOpen,
  onClose,
  titulo,
  fieldsToExclude,
  model,
  loading,
  onSubmit,
  options,
  size,
  initialValues,
}: // grid = { base: 1, md: 2 },
AgregarFormProps<T>) => {
  const validationSchema = model.getValidationSchema();
  const camposForm = model.getFormBuilder(options);
  const [initialValuesState, setInitialValuesState] = useState(initialValues);

  const handleSubmitForm = (values: any, resetForm: () => void) => {
    onSubmit(values, resetForm);
  };
  useEffect(() => {
    setInitialValuesState(initialValues);
  }, [initialValues]);

  return (
    <Formik
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize={true}
      initialValues={initialValuesState}
      onSubmit={async (values, { resetForm }) => {
        handleSubmitForm(values, resetForm);
      }}
    >
      {({
        handleSubmit,
        resetForm,
        errors,
        touched,
        values,
        setFieldValue,
      }) => {
        return (
          <DrawerComponent
            isOpen={isOpen}
            size={size}
            onClose={() => {
              resetForm();
              console.log("ejecuta on close");
              onClose();
            }}
            handleSubmit={() => {
              handleSubmit();
            }}
            titulo={titulo}
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
                {errors &&
                  Object.keys(errors).map((_key) => {
                    return (
                      <Alert status="error" variant="left-accent">
                        <AlertIcon />

                        {/* {errors[key].toString()} */}
                      </Alert>
                    );
                  })}
                <VStack spacing={4} align="flex-start" alignItems={"stretch"}>
                  <FormControls
                    errors={errors}
                    touched={touched}
                    fields={
                      initialValues
                        ? Object.keys(initialValues).filter((key) => {
                            return !fieldsToExclude.includes(key);
                          })
                        : []
                    }
                    values={values}
                    setFieldValue={setFieldValue}
                    getItemForm={getItemForm}
                    camposForm={camposForm}
                  />
                </VStack>
              </Box>
            </Stack>
          </DrawerComponent>
        );
      }}
    </Formik>
  );
};

export default FormVaku;
