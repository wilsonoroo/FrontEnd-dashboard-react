import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

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

export function LineChart() {
  return (
    <div
      style={{
        // position: 'absolute',
        bottom: '0',
        right: '0',
        width: '100%',
        height: '80%',
      }}
    >
      <Line options={options} data={data} />
    </div>
  );
}
