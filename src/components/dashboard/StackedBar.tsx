import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import FormVaku from '../forms/FormVaku';
import { PieC } from '@/models/graficos/PieChar';
import useFilter from './useFilter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


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

const dataJson: DataJson = {
  "2023-07-24": {
    "documento": {
      "IS": {
        "cant": 21
      },
      "LV": {
        "cant": 22
      },
      "C5": {
        "cant": 22
      },
      "C6": {
        "cant": 22
      }
    },
    "turno": {
      "turnoNoche": {
        "tipo": {
          "IS": {
            "cant": 21
          },
          "LV": {
            "cant": 52
          },
          "C5": {
            "cant": 1
          }
        },
        "cant": 74
      },
      "turnoDia": {
        "cant": 25
      }
    },
    "division": {
      "division1": {
        "cant": 50,
        "tipo": {
          "IS": {
            "cant": 1
          },
          "LV": {
            "cant": 2
          },
          "C5": {
            "cant": 3
          }
        },
        "turno": {
          "turnoNoche": {
            "cant": 20
          },
          "turnoDia": {
            "cant": 30
          }
        }
      },
      "division2": {
        "cant": 50,
        "tipo": {
          "IS": {
            "cant": 4
          },
          "LV": {
            "cant": 15
          },
          "C5": {
            "cant": 10
          }
        },
        "turno": {
          "turnoNoche": {
            "cant": 20
          },
          "turnoDia": {
            "cant": 30
          }
        }
      },
    }
  },
  "2023-07-25": {
    "documento": {
      "IS": {
        "cant": 12
      },
      "LV": {
        "cant": 35
      },
      "C5": {
        "cant": 5
      }
    },
    "turno": {
      "turnoNoche": {
        "tipo": {
          "IS": {
            "cant": 21
          },
          "LV": {
            "cant": 52
          },
          "C5": {
            "cant": 1
          }
        },
        "cant": 74
      },
      "turnoDia": {
        "cant": 25
      }
    },
    "division": {
      "division1": {
        "cant": 40,
        "tipo": {
          "IS": {
            "cant": 4
          },
          "LV": {
            "cant": 5
          },
          "C5": {
            "cant": 6
          }
        },
        "turno": {
          "turnoNoche": {
            "cant": 15
          },
          "turnoDia": {
            "cant": 25
          }
        }
      },
      "division2": {
        "cant": 20,
        "tipo": {
          "IS": {
            "cant": 8
          },
          "LV": {
            "cant": 5
          },
          "C5": {
            "cant": 7
          }
        },
        "turno": {
          "turnoNoche": {
            "cant": 10
          },
          "turnoDia": {
            "cant": 10
          }
        }
      }
    }
  },
  "2023-07-26": {
    "documento": {
      "IS": {
        "cant": 12
      },
      "LV": {
        "cant": 35
      },
      "C5": {
        "cant": 5
      }
    },
    "turno": {
      "turnoNoche": {
        "tipo": {
          "IS": {
            "cant": 21
          },
          "LV": {
            "cant": 52
          },
          "C5": {
            "cant": 1
          }
        },
        "cant": 74
      },
      "turnoDia": {
        "cant": 25
      }
    },
    "division": {
      "division1": {
        "cant": 40,
        "tipo": {
          "IS": {
            "cant": 18
          },
          "LV": {
            "cant": 10
          },
          "C5": {
            "cant": 12
          }
        },
        "turno": {
          "turnoNoche": {
            "cant": 15
          },
          "turnoDia": {
            "cant": 25
          }
        }
      },
      "division2": {
        "cant": 20,
        "tipo": {
          "IS": {
            "cant": 8
          },
          "LV": {
            "cant": 5
          },
          "C5": {
            "cant": 7
          }
        },
        "turno": {
          "turnoNoche": {
            "cant": 10
          },
          "turnoDia": {
            "cant": 10
          }
        }
      }
    }
  },
  
  
}



// Function to generate a random color in hexadecimal format
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


export const opt = {
  // plugins: {
  //   title: {
  //     display: true,
  //     text: '',
  //   },
  // },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
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

export function StackedBar() {
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

  const tipoDocumentoLabels: { [key: string]: string } = {
    IS: "IS",
    LV: "LV",
    C5: "C5",
    // Agrega más etiquetas si es necesario
  };  

  // Obtener las fechas mínimas y máximas disponibles
  const { minDate, maxDate } = getMinMaxDates();
  const [filteredData, filterState, updateDates, processData, processDataDivision] = useFilter(dataJson, minDate, maxDate, tipoDocumentoLabels);
  const [dataUpdated, setDataUpdated] = useState(false);
  

  const [chartData, setChartData] = useState(() => {
    // Generar datos para el gráfico basados en todos los items del objeto "documento" de todas las fechas disponibles
    const todasLasFechas = Object.keys(dataJson);   
    const itemsDocumento = Object.keys(dataJson[todasLasFechas[0]].documento); // Suponemos que "todasLasFechas[0]" es la primera fecha en los datos

    const datasets = itemsDocumento.map((item) => {
      const datos = todasLasFechas.map((fecha) => dataJson[fecha].documento[item]?.cant || 0); // Usar 0 para datos faltantes
      return {
        label: item,
        data: datos,
        backgroundColor: getRandomColor(),
      };
    });

    return {
      labels: todasLasFechas,
      datasets: datasets,
    };
  });
  useEffect(() => {
    console.log('chartData:', chartData);
  }, [chartData]);
  

  interface DocumentDataByDate {
    [key: string]: DataItem;
  }
  
  const fetchDocumentData = (startDateString:any, endDateString:any) => {
    const filteredDates = Object.keys(dataJson).filter((date) => {
      return date >= startDateString && date <= endDateString;
    });
  
    // Creamos un objeto para almacenar los datos de cada tipo de documento por fecha
    const documentDataByDate = {};
  
    // Iteramos a través de las fechas filtradas y recopilamos los datos
    filteredDates.forEach((date) => {
      documentDataByDate[date] = dataJson[date]?.documento;
    });
  
    return documentDataByDate;
  };
 
  const fetchDivisionData = (division: string, startDateString: string, endDateString: string) => {
    const filteredDates = Object.keys(dataJson).filter((date) => {
      return date >= startDateString && date <= endDateString;
    });
  
    // Creamos un objeto para almacenar los datos de la división por fecha
    const divisionDataByDate = {};
  
    // Iteramos a través de las fechas filtradas y recopilamos los datos
    filteredDates.forEach((date) => {
      divisionDataByDate[date] = dataJson[date]?.division[division];
    });
  
    return divisionDataByDate;
  };

  const handleC = (values: PieC) => {
    const { desde, hasta, filtroDivision, filtroDocumento } = values;
  
    const startDateString = desde instanceof Date ? formatDateToISO(desde) : desde;
    const endDateString = hasta instanceof Date ? formatDateToISO(hasta) : hasta;
    
    if (filtroDivision === 'documentosT') {
      // Obtener los datos de los documentos según el rango de fechas seleccionado
      const documentDataByDate = fetchDocumentData(startDateString, endDateString);
  
      // Crear las listas de fechas, tipos de documentos y cantidades para el gráfico
      const labels = Object.keys(documentDataByDate);
      const datasets = Object.keys(dataJson[labels[0]]?.documento || {}).map((docType) => ({
        label: docType,
        data: labels.map((date) => dataJson[date]?.documento[docType]?.cant || 0),
        backgroundColor: getRandomColor(),
      }));
  
      // Actualizar el estado de chartData con los nuevos datos
      setChartData({
        labels: labels,
        datasets: datasets,
      });
      console.log(labels,datasets)
    } else {
      // Obtener los datos para la división seleccionada según el rango de fechas
      const divisionDataByDate = fetchDivisionData(filtroDivision, startDateString, endDateString);

      // Crear las listas de fechas y cantidades para el gráfico
      const labels = Object.keys(divisionDataByDate);
      const datasets = Object.keys(divisionDataByDate[labels[0]]?.tipo || {}).map((docType) => ({
        label: docType,
        data: labels.map((date) => divisionDataByDate[date]?.tipo[docType]?.cant || 0),
        backgroundColor: getRandomColor(),
      }));

      // Actualizar el estado de chartData con los nuevos datos
      setChartData({
        labels: labels,
        datasets: datasets,
      });
    }
  
    onClose();
  };

  
  // Función para convertir una fecha en formato ISO (yyyy-mm-dd)
  const formatDateToISO = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
        <Bar options={opt} data={chartData} />
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
  )
  
}
