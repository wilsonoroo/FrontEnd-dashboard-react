import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { BarChart } from '@/components/dashboard/BarChart';
import { PieChart } from './PieChart';
import { LineChart } from './LineChart';
// import TotalCard from './TotalCard';
import ScrollCards from './ScrollCards';
import StatsUsers from './StatsUsers';

export const App = () => {

  const data = [
    {
      id: '1',
      title: 'Título 1',
      description: {
        text: 'Descripción 1',
        counter: 110,
      },
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
      description: {
        text: 'Descripción 2',
        counter: 210,
      },
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
      description: {
        text: 'Descripción 3',
        counter: 310,
      },
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
      description: {
        text: 'Descripción 4',
        counter: 410,
      },
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
      description: {
        text: 'Descripción 5',
        counter: 510,
      },
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
      description: {
        text: 'Descripción 6',
        counter: 610,
      },
      section1: 'Sección 1',
      section2: 'Sección 2',
      section3: 'Sección 3',
      counter1: 130,
      counter2: 140,
      counter3: 150,
    },
  ];

  const data1 = [
    {
      nivel: 'Nivel 1',
      descripcion: 'Administra la cuenta de la empresa',
      activosDisponibles: 15,
    },
    {
      nivel: 'Nivel 2',
      descripcion: 'Realiza tareas de soporte técnico',
      activosDisponibles: 10,
    },
    {
      nivel: 'Nivel 3',
      descripcion: 'Maneja la logística de envíos',
      activosDisponibles: 8,
    },
    {
      nivel: 'Nivel 4',
      descripcion: 'Desarrolla nuevas funcionalidades',
      activosDisponibles: 5,
    },
    {
      nivel: 'Nivel 5',
      descripcion: 'Lidera el equipo de desarrollo',
      activosDisponibles: 3,
    },
    {
      nivel: 'Nivel 6',
      descripcion: 'Toma decisiones estratégicas',
      activosDisponibles: 2,
    },
  ];
  
  

  return (
    <Box bg="white" p={4} borderRadius="md" boxShadow="md">

      <Flex mb={2} p={0} borderRadius="md" boxShadow="md" >
        <ScrollCards data={data} />
      </Flex>
      <Box  >  
      {/* <Box  height="calc(100vh - 64px)">    */}
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gridTemplateRows="repeat(2, 1fr)" gap={4} height="100%">

          <Box gridRow="1" gridColumn="2" bg="white" borderRadius="md" boxShadow="md" p={4}>
            {/* <Text fontSize="xl" fontWeight="bold" mb={4}>STATS</Text> */}
            <StatsUsers data={data1} />
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