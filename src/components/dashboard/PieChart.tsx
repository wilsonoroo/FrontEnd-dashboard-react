import React, { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { BsFilter } from 'react-icons/bs';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import FormVaku from '../forms/FormVaku';
import { PieC } from "../../models/graficos/PieChar"
import useFilter from './useFilter'; // Importamos el custom hook

ChartJS.register(ArcElement, Tooltip, Legend);

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

export function PieChart() {
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

  // Utilizar el custom hook useFilter para el filtrado y obtener las funciones processData y processDataDivision
  const [filteredData, filterState, updateDates, processData, processDataDivision] = useFilter(dataJson, minDate, maxDate, tipoDocumentoLabels);

  const [dataUpdated, setDataUpdated] = useState(false);

  // Utilizamos useMemo para memoizar los resultados de la función processData
  // const { labels, data } = useMemo(() => processData(), [filteredData]);

  useEffect(() => {
    // Ejecutar processData para mostrar los datos para el rango de fechas disponibles
    const { labels, data } = processData();

    // Actualiza el estado solo cuando los datos han cambiado
    if (!dataUpdated) {
      setChartData((prevChartData) => ({
        ...prevChartData,
        labels: labels,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: data,
          },
        ],
      }));
      setDataUpdated(true);
    }

  }, [filteredData, dataUpdated, processData])

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

  

 
  // Actualizar la función handleC para llamar a processDataDivision y actualizar los datos del gráfico
  const handleC = (values: PieC) => {
    
    const { desde, hasta, filtroDivision, filtroDocumento } = values;

    const startDateString = desde instanceof Date ? formatDateToISO(desde) : desde;
    const endDateString = hasta instanceof Date ? formatDateToISO(hasta) : hasta;

    updateDates(startDateString, endDateString);

    if (filtroDivision === 'documentosT') {
      const { labels, data } = processData();
      // console.log(labels, data, desde, hasta)
      setChartData({
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#A4A4A4', '#dc662a'],
            borderColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#A4A4A4', '#dc662a'],
            borderWidth: 1,
          },
        ],
      });
      console.log("documentosT", labels, data)
    } else {
      const { labels, data } = processDataDivision(filtroDivision);
      setChartData({
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#A4A4A4', '#dc662a'],
            borderColor: ['#0B79F4', '#FFD600', '#89FF00', '#003560', '#FF2200', '#A4A4A4', '#dc662a'],
            borderWidth: 1,
          },
        ],
      });
      console.log("filtroDivision", labels, data)
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


      {loading ? (
        <p>Loading...</p> // Puedes reemplazar este mensaje con un spinner o un componente de carga más sofisticado
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', width: '100%', height: '80%' }}>
          <Pie data={chartData} />
        </div>
      )}

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