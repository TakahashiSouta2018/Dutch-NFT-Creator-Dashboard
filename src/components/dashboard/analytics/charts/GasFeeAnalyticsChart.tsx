import React from 'react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ComposedChart,
  ResponsiveContainer,
  Line,
  Surface,
  Symbols,
  BarChart,
  Cell,
  Label,
} from 'recharts';

const data = [
  {
    id: 0,
    name: 'eth',
    value: 42.902576,
    fee: 0.00060053,
  },
  {
    id: 1,
    name: 'lrc',
    value: 23.902576,
    fee: 45.902,
  },
  {
    id: 2,
    name: 'usdt',
    value: 9.902576,
    fee: 10.2576,
  },
];

const COLORS = ['#E16D40', '#6661A3', '#449975'];

const GasFeeAnalyticsChart = () => {
  const CustomizedTick = (payload: any) => {
    const { x, y, payload: payloadData } = payload;

    return (
      <g transform={`translate(${x},${y - 5})`}>
        <text x={0} y={0} textAnchor="end">
          <tspan className="font-bold font-sm" dx={-10}>
            {payloadData.value}
          </tspan>
        </text>
        <text x={0} y={0} textAnchor="end">
          <tspan className="font-normal font-sm" dx={-10} dy={20}>
            ${data[payload.index].value}
          </tspan>
        </text>
      </g>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={192}>
        <BarChart
          data={data}
          layout={'vertical'}
          barSize={42}
          barCategoryGap={16}
          margin={{
            top: 0,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <defs>
            {data.map((_, index) => (
              <linearGradient
                key={index}
                id={`cell-${index}`}
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
              >
                <stop offset="0%" stopColor={COLORS[index]} stopOpacity={0.2} />
                <stop offset="100%" stopColor={COLORS[index]} stopOpacity={1} />
              </linearGradient>
            ))}
          </defs>
          <XAxis
            type="number"
            domain={[0, 60]}
            ticks={[10, 20, 30, 40, 50, 60]}
            tickCount={7}
            tickLine={false}
            axisLine={false}
            orientation="top"
            tick={{
              stroke: 'black',
              opacity: '70%',
              strokeWidth: 1,
              transform: 'translate(0, -6)',
            }}
            style={{
              fontSize: '12px',
              fontFamily: 'satoshi',
              fontWeight: 'normal',
            }}
          />
          <YAxis
            dataKey="fee"
            width={150}
            type={'category'}
            axisLine={{ stroke: '#000', opacity: '10%' }}
            tickLine={false}
            interval={0}
            tick={
              <CustomizedTick
                x={undefined}
                y={undefined}
                stroke={undefined}
                payload={undefined}
              />
            }
          >
            <Label
              value="Currencies Involved"
              position="top"
              opacity={0.5}
              x={0}
              dx={-10}
              textAnchor="end"
              dy={-5}
              style={{
                fontSize: '14px',
                fontWeight: 'normal',
                paddingRight: '16px',
                gap: '16px',
              }}
            />
          </YAxis>
          <Bar dataKey="value" fill={'#000'}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={`url(#cell-${index})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GasFeeAnalyticsChart;
