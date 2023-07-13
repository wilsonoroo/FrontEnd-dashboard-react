import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
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
  return (
    <Box  h="200px" display="flex" flexDirection="row" >
      {data.map((item, index) => (
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
          {index !== data.length - 1 && <Divider orientation="vertical" mx={0} />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ScrollCards;
