import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function InventoryChart() {
  const data = [
    { name: 'Insecticide', value: 35 },
    { name: 'Herbicide', value: 25 },
    { name: 'Fungicide', value: 20 },
    { name: 'Others', value: 20 },
  ];

  const COLORS = ['#1e5a35', '#2d7a4f', '#7dd3c0', '#a7e8d5'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
