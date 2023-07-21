import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Select from 'react-select';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dataJson = {
  "1": {
    "documento": {
      "tipo": {
        "IS": {
          "cantidad": "10"
        },
        "LV": {
          "cantidad": "12"
        }
      },
      "cantidad": "22"
    },
    "otro": {}
  },
  "2": {
    "documento": {
      "tipo": {
        "IS": {
          "cantidad": "30"
        },
        "LV": {
          "cantidad": "12"
        }
      },
      "cantidad": "42"
    },
    "otro": {}
  },
  "3": {
    "documento": {
      "tipo": {
        "IS": {
          "cantidad": "55"
        },
        "LV": {
          "cantidad": "12"
        }
      },
      "cantidad": "67"
    },
    "otro": {}
  }
};

const getDatasetsFromJson = (json, selectedItems) => {
  const datasets = [];
  const labels = [];
  
  // Separate dataset for "Documento" bar
  const documentoDataset = {
    label: 'Documento',
    data: [],
    backgroundColor: '#FF5733',
  };

  selectedItems.forEach((selectedItem) => {
    const data = json[selectedItem];
    labels.push(selectedItem);

    const documentoTotal = parseInt(data.documento.cantidad);
    documentoDataset.data.push(documentoTotal);

    const tipos = data.documento.tipo;
    Object.keys(tipos).forEach((tipoKey) => {
      const cantidad = parseInt(tipos[tipoKey].cantidad);
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
  const [selectedItems, setSelectedItems] = useState(allItems);

  const handleFilterChange = (selectedOptions) => {
    const selectedItems = selectedOptions.map((option) => option.value);
    setSelectedItems(selectedItems);
  };

  const { datasets, labels } = getDatasetsFromJson(dataJson, selectedItems);

  const data = {
    labels,
    datasets,
  };

  const options = allItems.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <div>
      {/* Filter Select */}
      <Select
        isMulti
        options={options}
        value={options.filter((option) => selectedItems.includes(option.value))}
        onChange={handleFilterChange}
        styles={{ container: (provided) => ({ ...provided, marginBottom: '10px' }) }}
      />

      {/* Chart */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', top: '0', left: '0', width: '100%', height: '80%' }}>
        <Bar data={data} />
      </div>
    </div>
  );
}
