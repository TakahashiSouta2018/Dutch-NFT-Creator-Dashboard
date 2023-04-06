import React, { useState } from 'react';
import { AnalyticsSideBar } from './sidebar';
import { OutlineButton, Table, THead, TBody, TD, TR } from '@/common';
import { OptionSwitch } from './option-switch';
import { Accordion } from '@/common/Accordion';
import {
  AnalyticsTableControl,
  AnalyticsTransactionTable,
  AnalyticsTableLayout,
} from '@/components/dashboard/analytics/analytics-tables';

import { AnalyticsCard } from './analytics-card';
import {
  AnalyticsAreaChart,
  AnalyticsBarChart,
  AnalyticsPieChart,
} from './charts';
import { TypeCard } from './transaction-type-card';

const transOptions = [
  {
    id: 0,
    slug: 'All Transactions',
  },
  {
    id: 1,
    slug: 'Trades',
  },
  {
    id: 2,
    slug: 'Primary Sales',
  },
  {
    id: 3,
    slug: 'Royalties',
  },
  {
    id: 4,
    slug: 'Transfers',
  },
];

const dayOptions = [
  {
    id: 0,
    slug: '7D',
  },
  {
    id: 1,
    slug: '1M',
  },
  {
    id: 2,
    slug: '6M',
  },
  {
    id: 3,
    slug: '1Y',
  },
  {
    id: 4,
    slug: 'All',
  },
];

// mockdata for analytics-transaction table
import MilkGif from '@/assets/milk.gif';

const mockData = [
  {
    type: 'transfer',
    from: 'AAA',
    to: 'BBB',
    nftId: {
      src: MilkGif,
      groupName: 'Inkheads',
      id: 'Yung Zuck',
    },
    units: 3,
    price: 0.00085,
    gas: 0.000248,
    date: 'Mar 10, 20223  06:57:59',
  },
  {
    type: 'nft-trade',
    from: 'AAA',
    to: 'BBB',
    nftId: {
      src: MilkGif,
      groupName: 'Inkheads',
      id: 'Yung Zuck',
    },
    units: 3,
    gas: 0.000248,
    date: 'Mar 10, 20223  06:57:59',
  },
  {
    type: 'primary-sale',
    from: 'AAA',
    to: 'BBB',
    nftId: {
      src: MilkGif,
      groupName: 'Inkheads',
      id: 'Yung Zuck',
    },
    units: 3,
    price: 0.00085,
    gas: 0.000248,
    date: 'Mar 10, 20223  06:57:59',
  },
  {
    type: 'transfer',
    from: 'AAA',
    to: 'BBB',
    nftId: {
      src: MilkGif,
      groupName: 'Inkheads',
      id: 'Yung Zuck',
    },
    units: 3,
    gas: 0.000248,
    date: 'Mar 10, 20223  06:57:59',
  },
  {
    type: 'nft-trade',
    from: 'AAA',
    to: 'BBB',
    nftId: {
      src: MilkGif,
      groupName: 'Inkheads',
      id: 'Yung Zuck',
    },
    units: 3,
    price: 0.00085,
    date: 'Mar 10, 20223  06:57:59',
  },
];

const AnalyticsContent = () => {
  const [currentTransOption, setCurrentTransOption] = useState(0);
  const [currentDayOption, setCurrentDayOption] = useState(0);

  return (
    <div className="flex gap-6">
      <AnalyticsSideBar />
      <div className="flex-grow flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="flex gap-1 border border-black/10 rounded-lg">
              {transOptions.map((option, i) => (
                <OptionSwitch
                  key={i}
                  currentOptionId={currentTransOption}
                  option={option}
                  onCurrentOption={(id) => {
                    setCurrentTransOption(id);
                  }}
                />
              ))}
            </div>
            <div className="flex divide-x divide-black/10 border border-black/10 rounded-lg">
              <div className="pr-1 flex gap-1">
                {dayOptions.map((option, i) => (
                  <OptionSwitch
                    key={i}
                    currentOptionId={currentDayOption}
                    option={option}
                    onCurrentOption={(id) => {
                      setCurrentDayOption(id);
                    }}
                  />
                ))}
              </div>
              <Accordion>Custom</Accordion>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <OutlineButton size="small">Inkheads</OutlineButton>
            <p className="text-xs text-black/70">
              The tracking shown is according to the timeline selected.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold text-black">Overview</div>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <AnalyticsCard
                title="Transactions Count"
                transActionsCount={2383}
                percentage={5.74}
              />
              <AnalyticsCard
                title="Turnover"
                eth={8.639575000002}
                usd={1146.91}
                percentage={-3.7}
              />
              <AnalyticsCard
                title="Royalties Earned"
                eth={0.6973799999999}
                usd={431.86}
                percentage={5.1}
              />
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col gap-2 w-2/3">
                <div className="font-bold text-sm text-black/70">
                  Transactions Count vs Timeline
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="w-full h-[250px]">
                    <AnalyticsAreaChart />
                  </div>
                  <div className="py-2 flex flex-col gap-2 w-[95%]">
                    <div className="w-full h-[100px]">
                      <AnalyticsBarChart />
                    </div>
                    <p className="font-bold text-center text-sm text-black/70">
                      Turnover
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-1/3">
                <p className="font-bold text-sm text-black/70">
                  By transaction types
                </p>
                <AnalyticsPieChart />
              </div>
            </div>
          </div>
        </div>
        <div className="table">
          <AnalyticsTableLayout>
            <AnalyticsTableControl
              type="All Transaction"
              title="All Transaction"
              date="Mar 1, 2022 - Feb 28 2023"
              resultNumber={2224}
              options={[
                { name: 'AA', value: 'aa' },
                { name: 'BB', value: 'bb' },
                { name: 'CC', value: 'cc' },
              ]}
              isSearchable
              isPaginatiable
            />
            <AnalyticsTransactionTable isIcon data={mockData} />
          </AnalyticsTableLayout>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContent;
