import React from 'react';
import { Box, Divider, Grid, Text } from '@chakra-ui/react';

interface StatsUsersProps {
  data: {
    nivel: string;
    descripcion: string;
    activosDisponibles: number;
  }[];
}

const StatsUsers: React.FC<StatsUsersProps> = ({ data }) => {
  const getColorForLevel = (nivel: string) => {
    // Define the color mapping for each level
    const colorMap: { [key: string]: string } = {
      "Nivel 0": '#FFD600',
      "Nivel 1": '#c705b5',
      "Nivel 2": '#89FF00',
      "Nivel 3": '#0B79F4',
      "Nivel 4": '#003560',
    };

    return colorMap[nivel] || 'gray';
  };

  return (
    <Box 
      position="relative" 
      width="600px" 
      style={{ 
        display: 'grid',
        borderRadius: 'md',
        boxShadow: 'md',
        width: "100%", 
        minWidth: '400px', // Un ancho mínimo para evitar que sea demasiado pequeño
        height: '550px',
        padding: '16px',
        alignItems: "center",
      }}
    >
    {/* Divider */}
    <Divider
      orientation="vertical"
      borderColor="black"
      borderWidth="1px"
      position="absolute"
      top="0"
      bottom="0"
      left="54%"
      transform="translateX(-50%)"
      height="490px" // Puedes ajustar el largo del divider aquí
      mt="55px" // Ajusta el valor para centrar el divider verticalmente
    />

    {/* Header */}
    <Text fontSize="xl" fontWeight="bold" mb={2} mt={2}>
      Roles activos por Usuarios
    </Text>
    <Grid templateColumns="1fr 1fr" gap={4} >
      <Box p={4}>
        <Text fontSize="xl" >
          Rol
        </Text>
      </Box>
      <Box p={4}>
        <Text 
          fontSize={{
            base: "md",    
            md: "md",      
            lg: "xl",    
          }}
          align="center"
        >
          Activos/Disponibles
        </Text>
      </Box>
    </Grid>
    {data.map((item, index) => (
      <Grid key={index} templateColumns="1fr 1fr" gap={4}>
        <Box p={2}>
          <Grid templateColumns="1fr 1fr" gap={2} alignItems="center" justifyContent="center">
            <Box>
              <Text 
                fontSize={{
                  base: "md",    // Tamaño de fuente en pantallas pequeñas
                  md: "md",      // Tamaño de fuente en pantallas medianas
                  lg: "xl",     // Tamaño de fuente en pantallas grandes
                }}
                fontWeight="bold" 
                mb={2} 
                align="center"
              >
                <span
                  style={{
                    background: getColorForLevel(item.nivel), // Apply the background color based on the level
                    borderRadius: '15px',
                    padding: '4px 20px',
                  }}
                >
                  {item.nivel}
                </span>
              </Text>
            </Box>
            <Box>
              <Text 
                fontSize="md" 
                mb={2} 
                align="center"
              >
                {item.descripcion}
              </Text>
            </Box>
          </Grid>
        </Box>
        <Box p={4}>
          <Box>
            <Text fontSize="xl" mb={2} fontWeight="bold" align="center">
              {item.activosDisponibles}
            </Text>
          </Box>
        </Box>
      </Grid>
    ))}
    </Box>
  );
};

export default StatsUsers;
