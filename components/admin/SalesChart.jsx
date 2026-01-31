import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function SalesChart({ data }) {
  const chartData = data && data.length > 0 ? data : [
    { _id: 1, revenue: 45000 },
    { _id: 2, revenue: 52000 },
    { _id: 3, revenue: 48000 },
    { _id: 4, revenue: 61000 },
    { _id: 5, revenue: 55000 },
    { _id: 6, revenue: 67000 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf1" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip
          contentStyle={{
            background: '#fff',
            border: '1px solid #e8ecf1',
            borderRadius: '6px',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#1e5a35"
          strokeWidth={2}
          dot={{ fill: '#1e5a35', r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
