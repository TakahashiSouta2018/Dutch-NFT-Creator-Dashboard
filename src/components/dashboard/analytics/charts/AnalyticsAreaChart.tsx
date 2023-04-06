import React from 'react';
import moment from 'moment';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    time: '1672099200',
    uv: 510,
  },
  {
    time: '1672099500',
    uv: 600,
  },
  {
    time: '1672100200',
    uv: 575,
  },
  {
    time: '1672101200',
    uv: 530,
  },
  {
    time: '1672102200',
    uv: 580,
  },
  {
    time: '1672103200',
    uv: 610,
  },
  {
    time: '1672104200',
    uv: 580,
  },
];

const convertDate = (timestamp: number) =>
  moment(new Date(timestamp * 1000)).format("MMM YY'");

const AnalyticsAreaChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#62ba52" stopOpacity={1} />
            <stop offset="95%" stopColor="#62ba52" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="8 3"
          strokeOpacity={0.7}
          vertical={false}
        />
        <XAxis
          dataKey="time"
          tickFormatter={convertDate}
          tick={{
            stroke: 'black',
            opacity: '70%',
            strokeWidth: 1,
            transform: 'translate(0, 10)',
          }}
          tickSize={0}
          axisLine={{ stroke: '#000', opacity: '10%' }}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis
          type="number"
          domain={[475, 625]}
          ticks={[...Array.from(Array(7), (_, id) => id * 25 + 475)]}
          scale="linear"
          tick={{
            stroke: 'black',
            opacity: '70%',
            strokeWidth: 1,
            transform: 'translate(-16, 0)',
          }}
          tickSize={0}
          axisLine={{ stroke: '#000', opacity: '10%' }}
        />
        <Tooltip />
        <Area
          dataKey="uv"
          stroke="#3caa2a"
          strokeWidth={3}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsAreaChart;
