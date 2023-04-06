import React from 'react';
import { BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';

import { TooltipProps } from 'recharts';

const mockData = Array.from(Array(80), (_, id) => {
  return {
    name: String(id),
    pv: Math.floor(100 * Math.random()),
  };
});

const CustomBarTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active) {
    return (
      <div className="py-1 px-3 rounded-md bg-black/10 border-none backdrop-blur text-xs font-bold">
        <div className="flex gap-1">
          <p className="text-black/70">Date</p>
          <p>{label}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-black/70">Turnover</p>
          <p>{payload?.[0].value}</p>
        </div>
      </div>
    );
  }

  return null;
};

const AnalyticsBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={mockData}
        margin={{
          top: 0,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip content={<CustomBarTooltip />} />
        <Bar dataKey="pv" fill="#000" opacity={0.1} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsBarChart;
