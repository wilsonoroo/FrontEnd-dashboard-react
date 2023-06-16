// Chakra imports
import {
  Box,
  Center,
  Flex,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";
// Custom components
import Card from "../card/Card";

// Custom icons

export default function Default(props: {
  avatar: string;
  name: string;
  job: string;
  path: string;
  empresa?: any;
  onClick: (path: string) => void;
}) {
  const { avatar, name, job, onClick, empresa, path, ...rest } = props;
  const textColor = useColorModeValue("secondaryGray.700", "white");
  const bg = useColorModeValue("white", "#1B254B");
  const shadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "none"
  );

  const relativePath = "empresa/" + path;

  return (
    <>
      <LinkBox
        as="article"
        maxW="sm"
        p="5"
        borderWidth="0px"
        rounded="md"
        key={"item"}
        onClick={() => {
          onClick(empresa);
        }}
      >
        <Card
          boxShadow={shadow}
          py="px"
          bg={bg}
          {...rest}
          _hover={{ shadow: "lg" }}
        >
          <LinkOverlay>
            <Flex p={0} w="full" alignItems="center" justifyContent="center">
              <Box
                w="xl"
                bg="white"
                rounded="lg"
                overflow="hidden"
                mx="auto"
                py={2}
              >
                <Image
                  w="full"
                  h={50}
                  px={5}
                  fit="scale-down"
                  src={avatar}
                  alt="avatar"
                />

                {/* <Box py={5} textAlign="center">
                  <Text
                    color={textColor}
                    fontSize={{ base: "md", xl: "sm", "3xl": "md" }}
                    fontWeight="700"
                  >
                    {name}
                  </Text>
                </Box> */}
              </Box>
            </Flex>

            {/* <Flex align="center">
              <Flex justifyContent="center" alignItems="center">
                <Avatar
                  // h={{ base: "48px", xl: "36px", "2xl": "48px" }}
                  // w={{ base: "48px", xl: "36px", "2xl": "48px" }}
                  src={avatar}
                  showBorder={true}
                  colorScheme={"facebook"}
                  variant="roundedSquare"
                  me="20px"
                  size="lg"
                />
                <Flex direction="column" align="start">
                  <Text
                    color={textColor}
                    fontSize={{ base: "md", xl: "sm", "3xl": "md" }}
                    fontWeight="700"
                  >
                    {name}
                  </Text>
                </Flex>
              </Flex>
            </Flex> */}
          </LinkOverlay>
        </Card>
      </LinkBox>
    </>
  );
}

export function EmpresaAdd(props: {
  name: string;
  job: string;
  icon: any;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  const { name, job, icon, onClick, ...rest } = props;
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const bg = useColorModeValue("white", "#1B254B");
  const shadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "none"
  );

  const relativePath = "empresa/";

  return (
    <>
      <LinkBox
        as="article"
        maxW="sm"
        p="5"
        borderWidth="0px"
        rounded="md"
        key={"item"}
        onClick={onClick}
      >
        <LinkOverlay>
          <Flex p={0} w="full" alignItems="center" justifyContent="center">
            <Box
              w="xl"
              rounded="lg"
              overflow="hidden"
              border="1px"
              borderStyle={"dashed"}
              borderWidth={2}
              borderColor={textColor}
              mx="auto"
              py={2}
            >
              <Center h={50}>
                <Icon as={icon} width={50} height={50} color="gray" />
              </Center>

              <Box py={5} textAlign="center">
                <Text
                  color={textColor}
                  fontSize={{ base: "md", xl: "sm", "3xl": "md" }}
                  fontWeight="700"
                >
                  {name}
                </Text>
              </Box>
            </Box>
          </Flex>

          {/* <Flex align="center">
              <Flex justifyContent="center" alignItems="center">
                <Avatar
                  // h={{ base: "48px", xl: "36px", "2xl": "48px" }}
                  // w={{ base: "48px", xl: "36px", "2xl": "48px" }}
                  src={avatar}
                  showBorder={true}
                  colorScheme={"facebook"}
                  variant="roundedSquare"
                  me="20px"
                  size="lg"
                />
                <Flex direction="column" align="start">
                  <Text
                    color={textColor}
                    fontSize={{ base: "md", xl: "sm", "3xl": "md" }}
                    fontWeight="700"
                  >
                    {name}
                  </Text>
                </Flex>
              </Flex>
            </Flex> */}
        </LinkOverlay>
      </LinkBox>
    </>
  );
}
