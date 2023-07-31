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

      // Nueva función para calcular los datos del gráfico
    const calculateChartData = (data: DataJson, minDate: string, maxDate: string) => {
        const documentSums: { [key: string]: number } = {};

        for (const date in data) {
        // Verificar si la fecha actual está dentro del rango de fechas especificado
        if (date >= minDate && date <= maxDate) {
            for (const documentType in data[date]?.documento || {}) {
            const sum = data[date]?.documento[documentType]?.cant || 0;
            documentSums[documentType] = (documentSums[documentType] || 0) + sum;
            }
        }
        }

        const labels = Object.keys(documentSums);
        const dataValues = Object.values(documentSums);

        return { labels, data: dataValues };
    };

    // Actualizar los datos del gráfico cuando el componente se monte y cuando cambie el rango de fechas
    useEffect(() => {
        const { minDate, maxDate } = getMinMaxDates();
        const chartData = calculateChartData(dataJson, minDate, maxDate);
        setChartData({
        labels: chartData.labels,
        datasets: [
            {
            data: chartData.data,
            backgroundColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#A4A4A4', '#dc662a'],
            borderColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#A4A4A4', '#dc662a'],
            borderWidth: 1,
            },
        ],
        });
    }, []); // Array de dependencias vacío para que el efecto se ejecute solo una vez cuando el componente se monte

        // Función para calcular la suma de cada tipo de documento dentro del rango seleccionado
    const calculateDocumentSumsInRange = (startDate: Date | string, endDate: Date | string) => {
        const startDateString = startDate instanceof Date ? formatDateToISO(startDate) : startDate;
        const endDateString = endDate instanceof Date ? formatDateToISO(endDate) : endDate;

        const documentSums: { [key: string]: number } = {};

        for (const date in dataJson) {
        if (date >= startDateString && date <= endDateString) {
            for (const documentType in dataJson[date]?.documento || {}) {
            const sum = dataJson[date]?.documento[documentType]?.cant || 0;
            documentSums[documentType] = (documentSums[documentType] || 0) + sum;
            }
        }
        }

        return documentSums;
    };

    // Función para calcular el total de cada tipo de documento para una división y rango de fechas seleccionado
    const calculateDocumentTotalsForDivision = (
        division: string,
        startDate: Date | string,
        endDate: Date | string
    ) => {
        const startDateString = startDate instanceof Date ? formatDateToISO(startDate) : startDate;
        const endDateString = endDate instanceof Date ? formatDateToISO(endDate) : endDate;

        const documentTotals: { [key: string]: number } = {};

        for (const date in dataJson) {
        if (date >= startDateString && date <= endDateString) {
            const divisionData = dataJson[date]?.division?.[division];
            if (divisionData) {
            for (const documentType in divisionData.tipo || {}) {
                const sum = divisionData.tipo[documentType]?.cant || 0;
                documentTotals[documentType] = (documentTotals[documentType] || 0) + sum;
            }
            }
        }
        }

        return documentTotals;
    };

    const handleC = (values: PieC) => {

        const { desde, hasta, filtroDivision, filtroDocumento } = values;

      
        if (filtroDivision === 'documentosT') {
            // Calcular la suma de cada tipo de documento dentro del rango seleccionado
            const documentSums = calculateDocumentSumsInRange(desde , hasta);
      
            const labels = Object.keys(documentSums);
            const dataValues = Object.values(documentSums);
      
            // Actualizar el estado del gráfico con los nuevos datos
            setChartData({
              labels,
              datasets: [
                {
                  data: dataValues,
                  backgroundColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#A4A4A4', '#dc662a'],
                  borderColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#A4A4A4', '#dc662a'],
                  borderWidth: 1,
                },
              ],
            });
          } else {
            // Calcular el total de cada tipo de documento para la división seleccionada y el rango de fechas
            const divisionTotalData = calculateDocumentTotalsForDivision(filtroDivision, desde, hasta);

            const labels = Object.keys(divisionTotalData);
            const dataValues = Object.values(divisionTotalData);

            // Actualizar el estado del gráfico con los nuevos datos para la división seleccionada
            setChartData({
                labels,
                datasets: [
                {
                    data: dataValues,
                    backgroundColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#A4A4A4', '#dc662a'],
                    borderColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#A4A4A4', '#dc662a'],
                    borderWidth: 1,
                },
                ],
            });
          }
        onClose();
    };

  return (
        <>  
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
    
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', width: '100%', height: '80%' }}>
                <Pie data={chartData} />
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
