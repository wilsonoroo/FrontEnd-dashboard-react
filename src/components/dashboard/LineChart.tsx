import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
      },
    },
    title: {
      display: true,
      // text: 'Chart.js Line Chart',
    },
  },
} as const;

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// Datos de ejemplo para los datasets
const dataset1Data = [200, 350, 400, 600, 800, 700, 900];
const dataset2Data = [100, 200, 50, 400, 300, 250, 150];
const dataset3Data = [400, 550, 700, 300, 600, 500, 800];

export const data = {
  labels,
  datasets: [
    {
      label: 'Abiertos',
      data: dataset1Data,
      borderColor: '#0B79F4',
      backgroundColor: '#0B79F4',
    },
    {
      label: 'Cerradas',
      data: dataset2Data,
      borderColor: '#89FF00',
      backgroundColor: '#89FF00',
    },
    {
      label: 'En Mora',
      data: dataset3Data,
      borderColor: '#FF2200',
      backgroundColor: '#FF2200',
    },
  ],
};

const optionsMonths = labels.map((month) => ({ value: month, label: month }));

export function LineChart() {
  const [selectedMonths, setSelectedMonths] = useState([]); // Estados para almacenar los meses seleccionados

  const handleMonthChange = (selectedOptions) => {
    setSelectedMonths(selectedOptions);
  };

  // Filtrar los datos según el rango de meses seleccionado o mostrar todos los datos si no hay selección
  const filteredData = {
    labels,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      data: selectedMonths.length === 0
        ? dataset.data // Si no hay meses seleccionados, mostrar todos los datos
        : dataset.data.filter((_, index) => {
            const month = labels[index];
            return selectedMonths.some((opt) => opt.value === month);
          }),
    })),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '50%', marginBottom: '20px' }}>
        <label htmlFor="months">Selecciona el rango de meses a comparar:</label>
        <Select
          id="months"
          isMulti
          options={optionsMonths}
          value={selectedMonths}
          onChange={handleMonthChange}
        />
      </div>
      <div style={{ width: '80%', height: '300px' }}>
        <Line options={options} data={filteredData} />
      </div>
    </div>
  );
}
