import useAuth from "@/hooks/useAuth";
import { Box, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import { auth } from "@services/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOutview(props: { titulo: string }) {
  const { titulo } = props;
  const navigate = useNavigate();
  const [logger, setLogger] = useState(false);
  const user = useAuth();

  useEffect(() => {
    user.signOut().then(function () {});
    auth
      .signOut()
      .then(function () {
        // Sign-out successful.
        setLogger(false);
      })
      .catch(function (error) {
        // An error happened.
        console.error(error);
        setLogger(false);
      });
  }, []);

  useEffect(() => {
    if (!logger) {
      setTimeout(() => {
        navigate("/auth");
      }, 1000);
    }
  }, [logger, user]);

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

        <Flex width={"100%"} alignItems={"end"}>
          {/* titulo de la tabla  */}
          <Box>
            <Text
              fontSize="md"
              color={"secondaryGray.600"}
              mt={0}
              marginTop={"0px"}
            ></Text>
          </Box>
          <Spacer />
          {/* Contenido de la tabla */}
          {/* encabezado */}
        </Flex>
      </VStack>
    </>
  );
}
