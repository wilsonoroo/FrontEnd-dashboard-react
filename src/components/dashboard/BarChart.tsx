import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
} as const;

const labels = ['Planta', 'Mina', 'Mantención', 'Acopio', 'Truck Shop', 'Patio de acopio', 'Planificación'];

// Datos de ejemplo para los datasets
const dataset1Data = [400, 600, 800, 200, 350, 700, 900];
const dataset2Data = [300, 500, 700, 400, 450, 550, 800];

export const data = {
  labels,
  datasets: [
    {
      label: 'Mes pasado',
      data: dataset1Data,
      backgroundColor: '#89FF00',
    },
    {
      label: 'Mes Actual',
      data: dataset2Data,
      backgroundColor: '#0B79F4',
    },
  ],
};

export function BarChart() {
  return (
    <div 
      style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', top: '0', left: '0' , width: '100%', height: '80%' }}    
    >
      <Bar options={options} data={data} />
    </div>
  );
}
