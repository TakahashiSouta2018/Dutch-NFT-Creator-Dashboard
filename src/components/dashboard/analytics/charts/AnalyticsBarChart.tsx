import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { TooltipProps } from 'recharts';

const dataColors = ['#449975', '#E16D40'];

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
          <p>{!!payload && payload[0].name}</p>
        </div>
        <div className="flex gap-0.5">
          <p className="text-black/70 flex">Turnover</p>
          <div className="flex flex-col">
            {!!payload &&
              payload?.map((item, i) => (
                <div className="flex gap-1 items-center" key={i}>
                  <div
                    className={`bg-[${dataColors[i]}] rounded-full w-2 h-2`}
                  />
                  {payload?.[i].value}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

type BartChartType = {
  date: string;
  uv: number;
  pv?: number;
};

interface BarChartProps {
  data: BartChartType[];
  barColors?: string[];
  colorable?: boolean;
}

const AnalyticsBarChart: React.FC<BarChartProps> = ({
  data,
  barColors,
  colorable,
}) => {
  const dataKeys = Object.keys(data[0]).slice(1);
  console.error(dataKeys);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          {!!barColors &&
            barColors.map((color: string, index: number) => (
              <linearGradient
                key={index}
                id={`colorUv${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor="#fff" stopOpacity={0.9} />
              </linearGradient>
            ))}
        </defs>
        <Tooltip content={<CustomBarTooltip />} />
        {colorable && <XAxis dataKey="date" />}
        {colorable && <YAxis />}
        {dataKeys.map((key, i) => (
          <Bar
            key={i}
            dataKey={key}
            opacity={
              colorable || (barColors && barColors?.length > 1) ? 1 : 0.1
            }
            fill={`${barColors && barColors[i]}`}
          >
            {colorable &&
              barColors?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#colorUv${index})`} />
              ))}
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsBarChart;
