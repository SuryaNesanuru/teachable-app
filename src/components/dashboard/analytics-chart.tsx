"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', students: 65, revenue: 1200 },
  { name: 'Feb', students: 78, revenue: 1400 },
  { name: 'Mar', students: 90, revenue: 1800 },
  { name: 'Apr', students: 85, revenue: 1600 },
  { name: 'May', students: 95, revenue: 2000 },
  { name: 'Jun', students: 110, revenue: 2400 },
];

export function AnalyticsChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="students" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
