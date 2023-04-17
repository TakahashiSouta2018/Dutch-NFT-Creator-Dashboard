import React, { useState } from 'react';

import * as DutchC from './styles';
import { Table, THead, TBody, TR, TD } from '@/common';
import { OptionSwitch } from '../option-switch';
import { Accordion } from '@/common/Accordion';
import { AnalyticsCard } from '../analytics-card';
import {
  AnalyticsComposedChart,
  AnalyticsPieChart,
  GasFeeAnalyticsChart,
} from '../charts';
import {
  AnalyticsTableControl,
  AnalyticsTableLayout,
} from '../analytics-tables';
import { LRCIconSelector } from '../analytics-tables/lrc-icon-selector';
import { WalletTrackingTransactionView } from './WalletTrackingTransactionView';
import { TotalGasCard } from '../total-gas-card';

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

interface DataType {
  token: string;
  lrcId: string;
  symbol: string;
  quantity: number;
  price: number;
  value: number;
}

const mockDataHolding: DataType[] = [];
// [
//   {
//     token: 'Ether',
//     lrcId: 'eth',
//     symbol: 'ETH',
//     quantity: 0.243,
//     price: 234.202,
//     value: 242.242231,
//   },
//   {
//     token: 'Loopring',
//     lrcId: 'lrc',
//     symbol: 'LRC',
//     quantity: 0.243,
//     price: 234.202,
//     value: 242.242231,
//   },
//   {
//     token: 'USD Coin',
//     lrcId: 'usdc',
//     symbol: 'USDC',
//     quantity: 0.243,
//     price: 234.202,
//     value: 242.242231,
//   },
// ];

const WalletTracking = () => {
  const [currentDayOption, setCurrentDayOption] = useState({
    id: 4,
    slug: 'All',
  });
  return (
    <DutchC.WalletTrackingWrapper>
      <DutchC.WalletTrackingContainer>
        <DutchC.WalletTrackingUnitWrapper>
          <p className="font-bold text-black dark:text-white">Overview</p>
          <div className="flex gap-4 items-center">
            <DutchC.DaySwitchWrapper>
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
            </DutchC.DaySwitchWrapper>
            <p className="text-xs text-black/70 dark:text-white/70">
              The tracking shown is according to the timeline selected.
            </p>
          </div>
        </DutchC.WalletTrackingUnitWrapper>
        <DutchC.WalletTrackingUnitWrapper>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <p className="text-black/50 dark:text-white/50 font-medium">
                Opening Balance (Apr 1, 2022)
              </p>
              <p className="font-bold text-black dark:text-white">$ 502.30</p>
            </div>

            <div className="flex gap-2 items-center">
              <p className="text-black/50 dark:text-white/50 font-medium">
                Opening Balance (Apr 1, 2022)
              </p>
              <p className="font-bold text-black dark:text-white">$ 502.30</p>
            </div>
          </div>
          <DutchC.ContentOverviewCards>
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
          </DutchC.ContentOverviewCards>
        </DutchC.WalletTrackingUnitWrapper>
        <DutchC.WalletTrackingUnitWrapper>
          <div className="flex gap-2 items-center">
            <p className="font-bold text-sm dark:white">Profit & Loss Trends</p>
            <p className="text-xs dark:white">Apr 1, 2022 - Mar 31 2023</p>
          </div>
          <AnalyticsComposedChart
            composedChartData={[]}
            dayOption={currentDayOption.slug}
          />
        </DutchC.WalletTrackingUnitWrapper>
      </DutchC.WalletTrackingContainer>
      <DutchC.WalletTrackingHoldings>
        <DutchC.WalletTrackingUnitWrapper className="flex-grow">
          <p className="font-bold dark:text-white">Holdings</p>
          <AnalyticsTableLayout>
            <AnalyticsTableControl
              isSwitch
              isResultShowable
              resultNumber={234}
              isSearchable
              searchInputPlaceholder="Token"
              isPaginatiable
            />
            <div className="relative w-full">
              {!mockDataHolding.length && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 dark:text-white">
                  No data available
                </div>
              )}
              <Table className="dark:text-white text-black border rounded-xl table-fixed min-h-[100px]">
                <THead className="!text-black/100 dark:!text-white/100 bg-black/10 dark:bg-white/10">
                  <TR>
                    <TD>Token</TD>
                    <TD>Symbol</TD>
                    <TD>Quantity</TD>
                    <TD>Price</TD>
                    <TD>Value</TD>
                  </TR>
                </THead>
                <TBody className="text-sm">
                  {mockDataHolding?.map((item: DataType, index: number) => (
                    <TR key={index}>
                      <TD className="flex gap-2 items-center">
                        <LRCIconSelector id={item.lrcId} />
                        {item.token}
                      </TD>
                      <TD>{item.symbol}</TD>
                      <TD>{item.quantity}</TD>
                      <TD>{item.price}</TD>
                      <TD>{item.value}</TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
          </AnalyticsTableLayout>
        </DutchC.WalletTrackingUnitWrapper>
        <DutchC.WalletTrackingUnitWrapper>
          <p className="font-bold dark:text-white">Currency Holdings by %</p>
          <AnalyticsPieChart data={undefined} totalTransaction={1800} />
        </DutchC.WalletTrackingUnitWrapper>
      </DutchC.WalletTrackingHoldings>
      <DutchC.WalletTrackingContainer>
        <WalletTrackingTransactionView />
      </DutchC.WalletTrackingContainer>
      <DutchC.WalletTrackingContainer>
        <div className="font-bold dark:white">Gas Fee Analytics</div>
        <DutchC.GasFeeChartWrapper>
          <TotalGasCard />
          <GasFeeAnalyticsChart />
        </DutchC.GasFeeChartWrapper>
      </DutchC.WalletTrackingContainer>
    </DutchC.WalletTrackingWrapper>
  );
};

export default WalletTracking;
