import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "@layouts/auth/Default";
import * as yup from "yup";
// Assets
import { useContext } from "react";

import illustration from "@assets/vakumanos.png";
import InputVaku from "@components/fields/InputField";
import InputVakuPass from "@components/fields/InputFieldPassword";
import { useFormik } from "formik";

import { AuthContext } from "@contexts/AuthContextFb";
import useAuth from "@hooks/useAuth";

function SignIn() {
  // Chakra color mode

  const [error, setError] = useState(false);

  const textColor = useColorModeValue("vaku.500", "white");
  const textColorSecondary = "vaku.500";

  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const navigate = useNavigate();
  const authVaku = useAuth();

  const validationSchema = yup.object({
    email: yup.string().required("Este campo es requerido"),
    password: yup.string().required("Este campo es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoginLoading(true);
        await authVaku.signIn(values.email, values.password);
        setLoginLoading(false);
        // await signInWithEmailAndPassword(auth, values.email, values.password);
        // navigate("/admin");
      } catch (error) {
        console.log(error);
        setError(true);
      }
    },
  });
  const { currentUser } = useContext(AuthContext);

  if (currentUser && !!currentUser?.permisos?.administrador) {
    return <Navigate to={"/admin"} />;
  }

  return (
    <DefaultAuth illustrationBackground={illustration}>
      <form onSubmit={formik.handleSubmit}>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w="100%"
          mx={{ base: "auto", lg: "0px" }}
          me="auto"
          h="100%"
          alignItems="start"
          justifyContent="center"
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "14vh" }}
          flexDirection="column"
        >
          <Box me="auto">
            <Text fontSize="4xl" as={"b"} color={textColorSecondary}>
              Acceso Vaku
            </Text>

            <Text
              mb="36px"
              ms="4px"
              color={textColorSecondary}
              fontWeight="400"
              fontSize="md"
            >
              Ingresa tu correo y contraseña para entrar
            </Text>
          </Box>
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "100%", md: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
          >
            <FormControl>
              <InputVaku
                label="Correo electronico"
                id={"email"}
                name={"email"}
                extra={<Text color={brandStars}>*</Text>}
                placeholder={"Correo electrónico"}
                type={"text"}
                color={textColor}
                mb={undefined}
                value={formik.values["email"]}
                onChange={formik.handleChange}
              />

              <InputVakuPass
                label="Contraseña"
                id={"password"}
                name={"password"}
                extra={<Text color={brandStars}>*</Text>}
                placeholder={"Contraseña"}
                type={"text"}
                color={textColor}
                mb={undefined}
                value={formik.values["password"]}
                onChange={formik.handleChange}
              />

              <Flex justifyContent="space-between" align="center" mb="24px">
                <NavLink to="/auth/forgot-password">
                  <Text color={textColorBrand} fontSize="sm" fontWeight="500">
                    ¿Olvidaste tu contraseña?
                  </Text>
                </NavLink>
              </Flex>
              <Button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
                type="submit"
                bg={"#0B79F4"}
                colorScheme="vaku"
                _hover={{ bg: "vaku.300" }}
                isLoading={loginLoading}
                // onClick={handleLogin}
              >
                Iniciar Sesion
              </Button>
            </FormControl>
          </Flex>
        </Flex>
      </form>
    </DefaultAuth>
  );
}

export default SignIn;
