import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { BarChart } from '@/components/dashboard/BarChart';
import { PieChart1 } from './PieChart1';
import { LineChart}  from './LineChart';
// import TotalCard from './TotalCard';
import ScrollCards from './ScrollCards';
import StatsUsers from './StatsUsers';
import herramientas from "./icon/herramientas_de_mano.svg"
import icon from "./icon/icono hombre.svg"
import iconDoc from "./icon/icono instructivo de seguridad.svg"
import iconVehiculo from "./icon/icono vehículo liviano 1.svg"
import { StackedBar } from './StackedBar';

export const App = () => {

  const data2 = [
    {
      id: '1',
      title: icon,
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
      title: iconDoc,
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
      title: herramientas,
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
      title: iconVehiculo,
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
      nivel: 'Nivel 0',
      descripcion: 'Administra la cuenta de la empresa',
      activosDisponibles: 15,
    },
    {
      nivel: 'Nivel 1',
      descripcion: 'Asigna y gestiona la información',
      activosDisponibles: 10,
    },
    {
      nivel: 'Nivel 2',
      descripcion: 'Validadores de documentos',
      activosDisponibles: 8,
    },
    {
      nivel: 'Nivel 3',
      descripcion: 'Elabora y participa en documentos',
      activosDisponibles: 5,
    },
    {
      nivel: 'Nivel 4',
      descripcion: 'Lidera el equipo de desarrollo',
      activosDisponibles: 3,
    },
   
  ];
  


  return (
    <Box bg="white" p={4} borderRadius="md" boxShadow="md">
      

      <Flex mb={2} p={0} borderRadius="md" boxShadow="md" >
        <ScrollCards data={data2} />
      </Flex>
      <Box  >  
      {/* <Box  height="calc(100vh - 64px)">    */}
          {/* Contenedor para ambas filas */}
      <Box display="grid" gridTemplateRows="repeat(2, 1fr)" gap={4} height="100%">
        {/* Primera fila */}
        <Box display="grid" gridTemplateColumns="60% 40%" gap={2} bg="white" borderRadius="md"  p={0}>
          <Box bg="white" borderRadius="md" boxShadow="md" p={4}>
            <StackedBar />
          </Box>

          <Box bg="white" borderRadius="md" boxShadow="md" p={4}>
            <StatsUsers data={data1} />
          </Box>
        </Box>

        {/* Segunda fila */}
        <Box display="grid" gridTemplateColumns="40% 60%" gap={2} bg="white" borderRadius="md"  p={0}>
          <Box bg="white" borderRadius="md" boxShadow="md" p={4}>
            <PieChart1 />
          </Box>

          <Box bg="white" borderRadius="md" boxShadow="md" p={4}>
            <LineChart />
          </Box>
        </Box>
      </Box>
      </Box>
    </Box>
  );
};
