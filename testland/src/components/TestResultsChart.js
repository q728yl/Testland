import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

const TestResultsChart = ({ acCount, waCount, tleCount, reCount, mleCount }) => {
  const data = [
    { name: 'AC', value: acCount },
    { name: 'WA', value: waCount },
    { name: 'TLE', value: tleCount },
    { name: 'RE', value: reCount },
    { name: 'MLE', value: mleCount },
  ];

    const COLORS = ['#00FF00', '#FFA500', '#FFFF00', '#FF0000', '#800080'];


  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default TestResultsChart;
