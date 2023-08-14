import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { PieC } from '@/models/graficos/PieChar';
import { BsFilter } from 'react-icons/bs';
import FormVaku from '../forms/FormVaku';
import  dataJson  from '../dashboard/jsoncrack.json';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DataProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

interface DataItem {
    documento: {
      [key: string]: {
        cant: number;
      };
    };
    turno: {
      turnoNoche: {
        tipo: {
          [key: string]: {
            cant: number;
          };
        };
        cant: number;
      };
      turnoDia: {
        cant: number;
      };
    };
    division: {
      [key: string]: {
        cant: number;
        tipo: {
          [key: string]: {
            cant: number;
          };
        };
        turno: {
          turnoNoche: {
            cant: number;
          };
          turnoDia: {
            cant: number;
          };
        };
      };
    };
}
  
interface DataJson {
    [key: string]: DataItem;
}

// export const data: DataProps = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };


console.log(dataJson)

const getUniqueDivisions = (data: DataJson): string[] => {
    const uniqueDivisions: string[] = [];
  
    for (const date in data) {
      const divisions = Object.keys(data[date]?.division || {});
      divisions.forEach((division) => {
        if (!uniqueDivisions.includes(division)) {
          uniqueDivisions.push(division);
        }
      });
    }
  
    return uniqueDivisions;
};
  
const getMinMaxDates = () => {
const dates = Object.keys(dataJson);
const minDate = dates.reduce((min, date) => (date < min ? date : min), dates[0]);
const maxDate = dates.reduce((max, date) => (date > max ? date : max), dates[0]);
return { minDate, maxDate };
};

const formatDateToISO = (date: Date) => {
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
return `${year}-${month}-${day}`;
};

export function PieChart1() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const newC = new PieC();
    const [pieC, setPieC] = useState<PieC>(newC);

    const [options, setOptions] = useState({
        filtroDivision: [
          { nombre: "division1", displayName: "Division 1" },
          { nombre: "division2", displayName: "Division 2" },   
          { nombre: "division3", displayName: "Division 3" },    
        ],
      });
      useEffect(() => {
        const divisionesUnicas = getUniqueDivisions(dataJson);
    
        // Agregar una nueva división al comienzo del arreglo
        const nuevaDivision = { nombre: "documentosT", displayName: "Total de documentos" };
        const opcionesConNuevaDivision = [nuevaDivision, ...divisionesUnicas.map((division) => ({ nombre: division, displayName: division }))];
    
        setOptions({
          filtroDivision: opcionesConNuevaDivision,
        });
    }, []);

    // Define el estado inicial del objeto chartData utilizando useState
    const [chartData, setChartData] = useState({       
        
        labels: [], // Agrega etiquetas iniciales si las tienes, de lo contrario, un arreglo vacío
        datasets: [
        {
            data: [], // Agrega datos iniciales si los tienes, de lo contrario, un arreglo vacío
            backgroundColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#A4A4A4', '#dc662a'],
            borderColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#A4A4A4', '#dc662a'],
            borderWidth: 1,
        },
        ],
    });

    const calculateChartData = (data: DataJson, startDate: Date | string, endDate: Date | string, divisionFilter?: string) => {
        const startDateString = startDate instanceof Date ? formatDateToISO(startDate) : startDate;
        const endDateString = endDate instanceof Date ? formatDateToISO(endDate) : endDate;

        const chartData: DataProps = {
        labels: [],
        datasets: [
            {
            label: '# Cantidad',
            data: [],
            backgroundColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#D2D4D6', '#dc662a'],
            borderColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#D2D4D6', '#dc662a'],
            borderWidth: 1,
            },
        ],
        };

        const dataSums: { [key: string]: number } = {};

        for (const date in data) {
            if (date >= startDateString && date <= endDateString) {
                // Verificar si hay datos específicos de la división según el filtro
                const divisionData = data[date]?.division?.[divisionFilter || ''];
                const documentData = data[date]?.documento;

                // Si hay datos específicos de la división, calcular la suma de documentos por tipo
                if (divisionData) {
                    for (const documentType in divisionData.tipo || {}) {
                        const sum = divisionData.tipo[documentType]?.cant || 0;
                        dataSums[documentType] = (dataSums[documentType] || 0) + sum;
                    }
                // Si no hay datos específicos de la división, calcular la suma de documentos sin filtro de división
                } else if (documentData) {
                    for (const documentType in documentData) {
                        const sum = documentData[documentType]?.cant || 0;
                        dataSums[documentType] = (dataSums[documentType] || 0) + sum;
                    }
                }
            }
        }

         // Actualizar las etiquetas y valores de chartData con los datos calculados
        chartData.labels = Object.keys(dataSums);
        chartData.datasets[0].data = Object.values(dataSums);

        return chartData;
    };

    useEffect(() => {
        const { minDate, maxDate } = getMinMaxDates();
        const initialChartData = calculateChartData(dataJson, minDate, maxDate);
        setChartData(initialChartData);
    }, []);

    const handleC = (values: PieC) => {
        const { desde, hasta, filtroDivision, filtroDocumento } = values;
    
        let chartData;
        if (filtroDivision === 'documentosT') {
          chartData = calculateChartData(dataJson, desde, hasta);
        } else {
          chartData = calculateChartData(dataJson, desde, hasta, filtroDivision);
        }
    
        setChartData(chartData);
        onClose();
    };

    const legendOptions = {
      display: true,
      labels: {
        usePointStyle: true,
      },
    };
  
    const opt = {
      plugins: {
        legend: legendOptions,
      },
    };
      
  return (
        <>  
          <div style={{ 
            display: 'grid',
            borderRadius: 'md',
            boxShadow: 'md',
            width: '100%', // Ancho del 33.33% de la página
            minWidth: '400px', // Un ancho mínimo para evitar que sea demasiado pequeño
            height: '550px',
            padding: '16px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ marginRight: '10px' }}>
                <IconButton
                    aria-label="Filter"
                    icon={<BsFilter size={24} color="gray" />}
                    onClick={() => {
                    onOpen();
                    }}
                />
                </div>
            </div>
    
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1px', width: '100%', height: '90%' }}>
                <Pie data={chartData} options={opt} style={{ maxWidth: '100%' }}/>
            </div>
          </div>

          <FormVaku<PieC>
              titulo={'Filter'}
              isOpen={isOpen}
              onClose={() => {
              onClose();
              }}
              fieldsToExclude={['id']}
              model={pieC}
              initialValues={pieC} // Pasamos startDate y endDate aquí
              onSubmit={handleC}
              loading={loading}
              options={options}
              size="xl"
              grid={{ base: 1, md: 2 }}
          />
        </>
    );
}
