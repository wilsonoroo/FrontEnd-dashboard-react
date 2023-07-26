import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Select from 'react-select';
import { BsFilter } from 'react-icons/bs';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import FormVaku from '../forms/FormVaku';
import { BarC } from "../../models/graficos/BarChar"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dataJson= {
  "2023-01-01": {
    "documento": {
      "IS": {
        "cant": 21
      },
      "LV": {
        "cant": 22
      },
      "C5": {
        "cant": 22
      }
    },
    "turno": {
      "turnoNoche": {
        "tipo": {
          "is": {
            "cant": 21
          },
          "lv": {
            "cant": 52
          },
          "c5": {
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
          "is": {
            "cant": 25
          },
          "lv": {
            "cant": 15
          },
          "c5": {
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
      "division2": {}
    }
  },
  "2023-01-02": {
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
        "IS": {
          "cant": 8
        },
        "LV": {
          "cant": 10
        },
        "C5": {
          "cant": 4
        },
        "cant": 22
      },
      "turnoDia": {
        "cant": 30
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

const getDatasetsFromJson = (dataJson, selectedItems) => {
  const datasets = [];
  const labels = [];

  // Separate dataset for "Documento" bar
  const documentoDataset = {
    label: 'Documento',
    data: [],
    backgroundColor: '#FF5733',
  };

  selectedItems.forEach((selectedItem) => {
    const data = dataJson[selectedItem];
    labels.push(selectedItem);

    const documentoTotal = data.documento.IS.cant + data.documento.LV.cant + data.documento.C5.cant;
    documentoDataset.data.push(documentoTotal);

    const tipos = data.documento;
    Object.keys(tipos).forEach((tipoKey) => {
      const cantidad = tipos[tipoKey].cant;
      const datasetIndex = datasets.findIndex((dataset) => dataset.label === tipoKey);
      if (datasetIndex === -1) {
        datasets.push({
          label: tipoKey,
          data: [cantidad],
          backgroundColor: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
        });
      } else {
        datasets[datasetIndex].data.push(cantidad);
      }
    });
  });

  // Add the "Documento" dataset to the other datasets
  datasets.push(documentoDataset);

  return { datasets, labels };
};

export function BarChart() {
  const allItems = Object.keys(dataJson);
  const { datasets, labels } = getDatasetsFromJson(dataJson, allItems);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const newC = new BarC();
  const [barC, setBarC] = useState<BarC>(newC);
  const [options, setOptions] = useState({
    filtro: [
      { nombre: "documento", displayName: "Documento" },
      { nombre: "turno", displayName: "Turno" },   
      { nombre: "division", displayName: "Division" },    
    ],
  });
  useEffect(() => {
    setOptions({
      filtro: [
        { nombre: "documento", displayName: "Documento" },
        { nombre: "turno", displayName: "Turno" },   
        { nombre: "division", displayName: "Division" },    
      ],      
    });
  }, []);

  const data = {
    labels,
    datasets,
  };

  const handleC = (values: BarC) => {
    // const { desde, hasta } = values;

    // const startDateString = desde instanceof Date ? desde.toISOString() : desde;
    // const endDateString = hasta instanceof Date ? hasta.toISOString() : hasta;

    // setStartDate(startDateString);
    // setEndDate(endDateString);


    // onClose();}
    console.log("gg")
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
    
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', width: '100%', height: '80%' }}>
        <Bar data={data} />
      </div>

      <FormVaku<BarC>
        titulo={"Filter"}
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        fieldsToExclude={["id"]}
        model={barC}
        initialValues={barC} // Pasamos startDate y endDate aquí
        onSubmit={handleC}
        loading={loading}
        options={options}
        size="xl"
        grid={{ base: 1, md: 2 }}
      />
    </>
  );
}