import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { BarChart } from '@/components/dashboard/BarChart';
import { PieChart } from './PieChart';
import { LineChart } from './LineChart';
// import TotalCard from './TotalCard';
import ScrollCards from './ScrollCards';

export const App = () => {

  const data = [
    {
      id: '1',
      title: 'Título 1',
      description: 'Descripción 1',
      section1: 'Sección 1',
      section2: 'Sección 2',
      section3: 'Sección 3',
      counter1: 10,
      counter2: 20,
      counter3: 30,
    },
    {
      id: '2',
      title: 'Título 2',
      description: 'Descripción 2',
      section1: 'Sección 1',
      section2: 'Sección 2',
      section3: 'Sección 3',
      counter1: 40,
      counter2: 50,
      counter3: 60,
    },
    {
      id: '3',
      title: 'Título 3',
      description: 'Descripción 3',
      section1: 'Sección 1',
      section2: 'Sección 2',
      section3: 'Sección 3',
      counter1: 70,
      counter2: 80,
      counter3: 90,
    },
    {
      id: '4',
      title: 'Título 4',
      description: 'Descripción 4',
      section1: 'Sección 1',
      section2: 'Sección 2',
      section3: 'Sección 3',
      counter1: 100,
      counter2: 110,
      counter3: 120,
    },
    {
      id: '5',
      title: 'Título 5',
      description: 'Descripción 5',
      section1: 'Sección 1',
      section2: 'Sección 2',
      section3: 'Sección 3',
      counter1: 130,
      counter2: 140,
      counter3: 150,
    },
    {
      id: '6',
      title: 'Título 6',
      description: 'Descripción 6',
      section1: 'Sección 1',
      section2: 'Sección 2',
      section3: 'Sección 3',
      counter1: 130,
      counter2: 140,
      counter3: 150,
    },
  ];
  

  return (
    <Box bg="white" p={4} borderRadius="md" boxShadow="md">

      <Flex mb={2}   p={2} borderRadius="md" boxShadow="md" >
        <ScrollCards data={data} />
      </Flex>
      <Box  height="calc(100vh - 64px)">   
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gridTemplateRows="repeat(2, 1fr)" gap={4} height="100%">

          <Box gridRow="1" gridColumn="2" bg="white" borderRadius="md" boxShadow="md" p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>STATS</Text>
          </Box>

          <Box gridRow="1" gridColumn="1" bg="white" borderRadius="md" boxShadow="md" p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Bar Chart</Text>
            <BarChart />
          </Box>

          <Box gridRow="2" gridColumn="1" bg="white" borderRadius="md" boxShadow="md" p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Pie Chart</Text>
            <PieChart />
          </Box>

          <Box gridRow="2" gridColumn="2" bg="white" borderRadius="md" boxShadow="md" p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Line Chart</Text>
            <LineChart />
          </Box>

        </Box>
      </Box>
    </Box>
  );
};
