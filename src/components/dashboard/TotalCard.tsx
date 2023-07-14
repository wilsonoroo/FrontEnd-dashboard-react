import { Box, Text, BoxProps, TextProps, Flex, Image } from '@chakra-ui/react';

interface CardProps {
  title: string;
  description: {
    text: string;
    counter: number;
  };
  bottomDescription: {
    section1: {
      text: string;
      counter: number;
    };
    section2: {
      text: string;
      counter: number;
    };
    section3: {
      text: string;
      counter: number;
    };
  };
  boxProps?: BoxProps;
  textProps?: TextProps;
}

const Card: React.FC<CardProps> = ({ title, description, bottomDescription, boxProps, textProps }) => {
  return (
    <Box
      mt={2}
      mb={2}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={0}
      shadow="md"
      bg="white"
      w={400}
      {...boxProps}
    >
      <Flex h="50%"  {...boxProps}>
        <Box w="25%" bg="blue.200" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Image src={title} alt="I" w={8} h={8} mb={0} />
        </Box>
        <Box w="75%" bg="red.200" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Text {...textProps}>{description.text}</Text>
          <Text fontSize="sm" mt={2} {...textProps}>
            {description.counter}
          </Text>
        </Box>
      </Flex>
      <Flex h="50%" {...boxProps}>
        <Box w="33.33%" bg="green.200" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Text fontSize="sm" mt={2} {...textProps}>
            {bottomDescription.section1.text}
          </Text>
          <Text fontSize="sm" mt={2} {...textProps}>
            {bottomDescription.section1.counter}
          </Text>
        </Box>
        <Box w="33.33%" bg="yellow.200" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Text fontSize="sm" mt={2} {...textProps}>
            {bottomDescription.section2.text}
          </Text>
          <Text fontSize="sm" mt={2} {...textProps}>
            {bottomDescription.section2.counter}
          </Text>
        </Box>
        <Box w="33.33%" bg="purple.200" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Text fontSize="sm" mt={2} {...textProps}>
            {bottomDescription.section3.text}
          </Text>
          <Text fontSize="sm" mt={2} {...textProps}>
            {bottomDescription.section3.counter}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Card;

