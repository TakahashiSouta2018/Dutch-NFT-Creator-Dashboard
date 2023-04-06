import React, { useState } from 'react';
import { AnalyticsSideBar } from './sidebar';
import { OutlineButton } from '@/common';
import { OptionSwitch } from './option-switch';
import { Accordion } from '@/common/Accordion';

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
          <div className="flex flex-col gap4">
            <div className="flex"></div>
            <div className="flex gap-6"></div>
          </div>
        </div>
        <div className="table"></div>
      </div>
    </div>
  );
};

export default AnalyticsContent;
