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
    //   borderWidth="1px"
    //   borderRadius="lg"
      overflow="hidden"
      p={0}
    //   shadow="md"
      bg="white"
      w={400}
      {...boxProps}
    >
      <Flex h="50%"  {...boxProps}>
        <Box w="25%" bg="" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Image src={title} alt="I" w={8} h={8} mb={0} />
        </Box>
        <Box w="75%" bg="" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Text fontSize="lg" {...textProps}>{description.text}</Text>
          <Text fontWeight="bold" fontSize="lg" mt={2} {...textProps}>
            {description.counter}
          </Text>
        </Box>
      </Flex>
      <Flex h="50%" {...boxProps}>
        <Box w="33.33%" bg="" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Text mt={2} {...textProps}>
            {bottomDescription.section1.text}
          </Text>
          <Text fontWeight="bold" px={5} bg="#f5f5f5" fontSize="md" mt={2} borderRadius="10px"  {...textProps}>
            {bottomDescription.section1.counter}
          </Text>
        </Box>
        <Box w="33.33%" bg="" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Text mt={2} {...textProps}>
            {bottomDescription.section2.text}
          </Text>
          <Text fontWeight="bold" px={5} bg="#f5f5f5" fontSize="md" mt={2} borderRadius="10px" {...textProps}>
            {bottomDescription.section2.counter}
          </Text>
        </Box>
        <Box w="33.33%" bg="" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Text mt={2} {...textProps}>
            {bottomDescription.section3.text}
          </Text>
          <Text fontWeight="bold" px={5} bg="#f5f5f5" fontSize="md" mt={2} borderRadius="10px" {...textProps}>
            {bottomDescription.section3.counter}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Card;

