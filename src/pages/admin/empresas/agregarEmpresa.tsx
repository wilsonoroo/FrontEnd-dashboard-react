import {
  Box,
  Button,
  Center,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  ModalContent,
  ModalOverlay,
  Progress,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { storage } from "@services/config";
import { addEmpresas } from "@services/database/empresaServices";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import UpLoadField from "./uploadField";

export default function AgregarUsuario(props: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAddFinish: (isFinish: boolean) => void;
}) {
  const { isOpen, onOpen, onClose, onAddFinish } = props;
  const [values, setValues] = useState({ id: "", nombre: "", url: "" });

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const firstField = React.useRef();

  const uploadImage = (values: { id: string; nombre: string; url: string }) => {
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setLoading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setValues({
            id: values.id,
            nombre: values.nombre,
            url: downloadURL,
          });

          addEmpresas({
            key: values.id,
            id: uuid(),
            nombre: values.nombre,
            url: downloadURL,
          });
          setLoading(false);
          onClose();
          onAddFinish(true);
        });
      }
    );
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size={"md"}
      >
        <DrawerOverlay />
        <Formik
          initialValues={values}
          onSubmit={(values) => {
            uploadImage(values);
          }}
        >
          {({ handleSubmit, errors, setFieldValue, submitForm }) => (
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Crear Nueva Empresa
              </DrawerHeader>

              <DrawerBody>
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
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                      <FormControl>
                        <FormLabel htmlFor="email">Id de Plataforma</FormLabel>
                        <Field
                          as={Input}
                          id="id"
                          name="id"
                          type="text"
                          variant="outline"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="email">Nombre</FormLabel>
                        <Field
                          as={Input}
                          id="nombre"
                          name="nombre"
                          type="text"
                          variant="outline"
                        />
                      </FormControl>
                      <UpLoadField
                        name={"url"}
                        id={"url"}
                        acceptedFileTypes={"image/png, image/jpeg"}
                        onChange={(e) => {
                          console.log(e.target.files[0]);
                          setFile(e.target.files[0]);
                          setFieldValue("url", e.target.files[0].name);
                        }}
                        onDeleteImage={() => {
                          setFieldValue("url", "");
                        }}
                        label={"Logo Empresa"}
                      />
                    </VStack>
                  </form>
                </Stack>
                <Box w="100%" p={4}>
                  <span>{progresspercent}%</span>
                  <Progress value={progresspercent} w="100%" size="sm" />
                </Box>
                <Container maxW="container.sm" bg="red.600" color="#262626">
                  {errors.id}
                </Container>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={(e) => {
                    console.log("on click", e);
                    submitForm();
                  }}
                >
                  Agregar
                </Button>
              </DrawerFooter>
            </DrawerContent>
          )}
        </Formik>
      </Drawer>
    </>
  );
}
