import { CustomSelect } from '@/common';
import moment from 'moment';
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
} from 'recharts';

const data = [
  {
    id: 0,
    Expenses: -100,
    Turnover: 300,
    'P&L': 200,
    Date: '1672099200',
  },
  {
    id: 1,
    Expenses: -400,
    Turnover: 300,
    'P&L': -100,
    Date: '1672099200',
  },
  {
    id: 2,
    Expenses: -200,
    Turnover: 600,
    'P&L': 400,
    Date: '1672099200',
  },
  {
    id: 3,
    Expenses: -230,
    Turnover: 530,
    'P&L': 300,
    Date: '1672099200',
  },
  {
    id: 4,
    Expenses: -750,
    Turnover: 650,
    'P&L': -100,
    Date: '1672099200',
  },
  {
    id: 5,
    Expenses: -600,
    Turnover: 400,
    'P&L': -200,
    Date: '1672099200',
  },
  {
    id: 6,
    Expenses: -300,
    Turnover: 300,
    'P&L': 0,
    Date: '1672099200',
  },
  {
    id: 7,
    Expenses: -150,
    Turnover: 350,
    'P&L': 200,
    Date: '1672099200',
  },
  {
    id: 8,
    Expenses: -50,
    Turnover: 450,
    'P&L': 400,
    Date: '1672099200',
  },
  {
    id: 9,
    Expenses: -250,
    Turnover: 500,
    'P&L': 250,
    Date: '1672099200',
  },
  {
    id: 10,
    Expenses: -75,
    Turnover: 475,
    'P&L': 350,
    Date: '1672099200',
  },
  {
    id: 11,
    Expenses: -275,
    Turnover: 225,
    'P&L': -50,
    Date: '1672099200',
  },
];

const COLORS = ['#3CAA2A', '#C60707', '#F1BB41'];

const convertDate = (timestamp: number) =>
  moment(new Date(timestamp * 1000)).format('MMM YYYY');

const AnalyticsComposedChart = () => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="py-1 px-3 rounded-md bg-black/10 border-none backdrop-blur text-xs font-bold w-32">
          {payload.map((pld: any, index: number) => (
            <div key={index} className="flex flex-row justify-between">
              <div className="text-xs font-bold text-black/70 leading-4">
                {pld.dataKey}
              </div>
              <div className="text-xs font-bold text-black">{pld.value}</div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CusomizedLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-row justify-between">
        <div className="flex gap-4">
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex gap-1 items-center">
              <div
                style={{
                  display: 'inline-block',
                  width: '12px',
                  height: index === 2 ? '1px' : '12px',
                  backgroundColor: COLORS[index],
                  border: index === 2 ? `3px solid ${COLORS[index]}` : 'none',
                  padding: index === 2 ? '0px' : '4px',
                }}
              />
              <div className="text-sm">
                <p className="font-bold">{entry.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-52">
          <CustomSelect
            label="Group By"
            options={[
              { name: '1 Month', value: '1 Month' },
              { name: '3 Month', value: '3 Month' },
              { name: '6 Month', value: '6 Month' },
              { name: '12 Month', value: '12 Month' },
            ]}
            selectedOption={{ name: '1 Month', value: '1 Month' }}
            onSelect={() => {}}
          />
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width={'100%'} height={300} min-width={300}>
        <ComposedChart data={data} barGap={200} stackOffset="sign">
          <defs>
            <linearGradient id="Turnover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#62BA52" stopOpacity={1} />
              <stop offset="100%" stopColor="#62BA52" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="Expenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D13636" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#D13636" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="8 3" opacity={0.7} vertical={false} />
          <XAxis
            dataKey="Date"
            tickFormatter={convertDate}
            tick={{
              stroke: 'black',
              opacity: '70%',
              strokeWidth: 1,
              transform: 'translate(0, 10)',
            }}
            style={{
              fontSize: '12px',
              fontFamily: 'satoshi',
              fontWeight: 'normal',
            }}
            tickSize={0}
            axisLine={{ stroke: '#000', opacity: '10%' }}
            padding={{ left: 20, right: 20 }}
            interval={0}
          />
          <YAxis
            type="number"
            tickCount={10}
            scale="linear"
            tick={{
              stroke: 'black',
              opacity: '70%',
              strokeWidth: 1,
              transform: 'translate(-16, 0)',
            }}
            tickSize={0}
            style={{
              fontSize: '12px',
              fontFamily: 'satoshi',
              fontWeight: 'normal',
            }}
            axisLine={{ stroke: '#000', opacity: '10%' }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeWidth: '1', stroke: '#000' }}
            wrapperStyle={{ outline: 'none' }}
          />
          <Legend
            verticalAlign="top"
            content={<CusomizedLegend />}
            align="left"
            height={40}
          />
          <ReferenceLine y={0} stroke="#000" opacity={0.3} />
          <Bar
            dataKey="Turnover"
            fill="url(#Turnover)"
            stackId="stack"
            barSize={40}
          />
          <Bar dataKey="Expenses" fill="url(#Expenses)" stackId="stack" />
          <Line
            dataKey="P&L"
            stroke="#F1BB41"
            strokeWidth={3}
            dot={false}
            activeDot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsComposedChart;
