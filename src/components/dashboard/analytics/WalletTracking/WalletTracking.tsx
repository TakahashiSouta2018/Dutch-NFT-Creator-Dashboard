import React, { useState } from 'react';

import * as Dutch0x from './styles';
import { OptionSwitch } from '../option-switch';
import { Accordion } from '@/common/Accordion';
import { AnalyticsCard } from '../analytics-card';
import { AnalyticsPieChart } from '../charts';

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

const WalletTracking = () => {
  const [currentDayOption, setCurrentDayOption] = useState({
    id: 4,
    slug: 'All',
  });
  return (
    <div className="flex flex-col gap-6">
      <div className="overview flex flex-col gap-4">
        <div className="switch flex flex-col gap-2">
          <p className="font-bold">Overview</p>
          <div className="flex gap-4 items-center">
            <Dutch0x.DaySwitchWrapper>
              <div className="pr-1 flex gap-1">
                {dayOptions.map((option, i) => (
                  <OptionSwitch
                    key={i}
                    currentOption={currentDayOption}
                    option={option}
                    onCurrentOption={(option) => {
                      setCurrentDayOption(option);
                    }}
                  />
                ))}
              </div>
              <Accordion>Custom</Accordion>
            </Dutch0x.DaySwitchWrapper>
            <p className="text-xs text-black/70">
              The tracking shown is according to the timeline selected.
            </p>
          </div>
        </div>
        <div className="cards flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <p className="text-black/50 font-medium">
                Opening Balance (Apr 1, 2022)
              </p>
              <p className="font-bold">$ 502.30</p>
            </div>

            <div className="flex gap-2 items-center">
              <p className="text-black/50 font-medium">
                Opening Balance (Apr 1, 2022)
              </p>
              <p className="font-bold">$ 502.30</p>
            </div>
          </div>
          <Dutch0x.ContentOverviewCards>
            <AnalyticsCard
              title={'Turnover'}
              eth={0.3209}
              usd={523.2}
              percentage={5.74}
            />
            <AnalyticsCard
              title={'Expenses'}
              eth={0.1209}
              usd={189.91}
              percentage={-1.53}
            />
            <AnalyticsCard
              title={'Profit & Loss'}
              eth={0.2209}
              usd={265.91}
              percentage={7.2}
            />
          </Dutch0x.ContentOverviewCards>
        </div>
        <div className="charts flex flex-col gap-2"></div>
      </div>
      <div className="holdings flex w-full">
        <div className="hodingsTable flex-grow overflow-hidden"></div>
        <div className="flex flex-col gap-4">
          <p className="font-bold">Currency Holdings by %</p>
          <AnalyticsPieChart
            data={[
              { name: 'ETH', value: 1000 },
              { name: 'LRC', value: 300 },
              { name: 'USD', value: 500 },
            ]}
            totalTransaction={1800}
          />
        </div>
      </div>
      <div className="TransactionsTable flex flex-col gap-4"></div>
      <div className="analytics flex flex-col gap-4"></div>
    </div>
  );
};

export default WalletTracking;
