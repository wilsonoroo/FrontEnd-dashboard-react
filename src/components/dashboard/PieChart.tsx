import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['LV', 'IS', 'CS', 'PT', 'ERT', 'REM', 'IO'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3, 8],
      backgroundColor: [
        '#0B79F4',
        '#FFD600',
        '#89FF00',
        '#003560',
        '#FF2200',
        '#A4A4A4',
        '#dc662a',
      ],
      borderColor: [
        '#0B79F4',
        '#FFD600',
        '#89FF00',
        '#003560',
        '#FF2200',
        '#A4A4A4',
        '#dc662a',
      ],
      borderWidth: 1,
    },
  ],
};

export function PieChart() {
  return (
    <div 
     style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80%' }}
    >
      <Pie data={data} />
    </div>
  );
}
