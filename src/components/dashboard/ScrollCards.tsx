import React, { useState } from 'react';
import { Box, Divider, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import TotalCard from './TotalCard';

interface Data {
  id: string;
  title: string;
  description: string;
  section1: string;
  section2: string;
  section3: string;
  counter1: number;
  counter2: number;
  counter3: number;
}

interface ScrollCardsProps {
  data: Data[];
}

const ScrollCards: React.FC<ScrollCardsProps> = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const visibleData = data.slice(currentSlide, currentSlide + 4);
  const showPrevArrow = currentSlide > 0;
  const showNextArrow = currentSlide < data.length - 4;

  return (
    <Box borderRadius="lg" bg="white" w="100%" h="200px" display="flex" flexDirection="row" justifyContent="center" position="relative">
      {showPrevArrow && (
        <IconButton
          // w="40px"
          aria-label="Previous"
          onClick={handlePrevSlide}
          position="absolute"
          left="0"
          top="50%"
          transform="translateY(-50%)"
          zIndex="1"
          borderRadius="50%"
          bg="white"
          color="black"
          // border="2px solid white"
          boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.2)"
          _hover={{ bg: "gray.100" }}
          icon={<ChevronLeftIcon boxSize={6}/>}
        />
      )}

      {visibleData.map((item, index) => (
        <React.Fragment key={item.id}>
          <TotalCard
            title={item.title}
            description={{
              text: item.description,
              counter: item.counter1,
            }}
            bottomDescription={{
              section1: { text: item.section1, counter: item.counter2 },
              section2: { text: item.section2, counter: item.counter3 },
              section3: { text: item.section3, counter: item.counter1 },
            }}
          />
          {index !== visibleData.length - 1 && (
            <Divider
              orientation="vertical"
              mx={0}
              borderWidth="1px"
              height="140px"
              borderColor="black"
              alignSelf="center"
              
            />
          )}
        </React.Fragment>
      ))}

      {showNextArrow && (
        <IconButton
          // w="40px"
          aria-label="Next"
          onClick={handleNextSlide}
          position="absolute"
          right="0"
          top="50%"
          transform="translateY(-50%)"
          zIndex="1"
          borderRadius="50%"
          bg="white"
          color="black"
          // border="2px solid white"
          boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.2)"
          _hover={{ bg: "gray.100" }}
          icon={<ChevronRightIcon boxSize={6}/>}
        />
      )}
    </Box>
  );
};

export default ScrollCards;
