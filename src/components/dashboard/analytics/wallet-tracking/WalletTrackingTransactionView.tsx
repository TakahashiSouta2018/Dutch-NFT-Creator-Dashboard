import React, { useState } from 'react';
import Link from 'next/link';

import * as Dutch0x from './styles';
import { OptionSwitch } from '../option-switch';
import { Accordion } from '@/common/Accordion';
import { AnalyticsCard, CurrenciesInvolvedCard } from '../analytics-card';
import {
  AnalyticsTableControl,
  AnalyticsTableLayout,
} from '../analytics-tables';
import { Table, THead, TBody, TR, TD } from '@/common';
import { LRCIconSelector } from '../analytics-tables/lrc-icon-selector';
import * as Icons from '@/common/Icons';

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

const mockDataTable = [
  {
    dir: 'in',
    type: 'deposit',
    fromGroup: 'L1',
    from: 'Flufffy.loopring.eth',
    toGroup: 'L2',
    to: 'ex.eth',
    sold: { value: 234.34, id: 'eth' },
    value: 234.34,
    gas: { value: 234.34, id: 'usdt' },
    time: 'Mar 10, 20223 06:57:59',
  },
  {
    dir: 'out',
    type: 'trade',
    fromGroup: 'L1',
    from: 'Flufffy.loopring.eth',
    toGroup: 'L2',
    to: 'ex.eth',
    bought: { value: 261.34, id: 'usdc' },
    sold: { value: 234.34, id: 'eth' },
    gas: { value: 234.34, id: 'eth' },
    time: 'Mar 10, 20223 06:57:59',
  },
  {
    dir: 'out',
    type: 'trade',
    fromGroup: 'L1',
    from: 'Flufffy.loopring.eth',
    toGroup: 'L2',
    to: 'ex.eth',
    bought: { value: 234.34, id: 'eth' },
    value: 234.34,
    gas: { value: 234.34, id: 'usdt' },
    time: 'Mar 10, 20223 06:57:59',
  },
  {
    dir: 'in',
    type: 'trade',
    fromGroup: 'L1',
    from: 'Flufffy.loopring.eth',
    toGroup: 'L2',
    to: 'ex.eth',
    bought: { value: 234.34, id: 'eth' },
    sold: { value: 234.34, id: 'usdc' },
    value: 234.34,
    time: 'Mar 10, 20223 06:57:59',
  },
];

const InOrOut: React.FC<{ value: string }> = ({ value }) => {
  return (
    (value === 'in' && (
      <div className="uppercase w-fit rounded-sm bg-green-100 text-green-500 text-center text-xs px-2 flex items-center justify-center">
        <Icons.IArrowDown size="small" className="text-green-500" />
        in
      </div>
    )) || (
      <div className="uppercase w-fit rounded-sm bg-red-100 text-red-500 text-center text-xs px-2 flex items-center justify-center">
        <Icons.IArrowUp size="small" className="text-red-500" />
        out
      </div>
    )
  );
};

export const WalletTrackingTransactionView = () => {
  const [timezone, setTimezone] = useState('EST');
  const [currentDayOption, setCurrentDayOption] = useState({
    id: 4,
    slug: 'All',
  });
  const [analyticsTableData, setAnalyticsTableData] = useState(mockDataTable);

  return (
    <div className="flex flex-col gap-6">
      <div className="overview flex flex-col gap-4">
        <div className="switch flex flex-col gap-2">
          <p className="font-bold">Transactions</p>
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
          <Dutch0x.ContentOverviewCards>
            <AnalyticsCard title={'Incoming'} eth={0.3209} usd={523.2} />
            <AnalyticsCard title={'Outgoing'} eth={0.1209} usd={189.91} />
            <AnalyticsCard
              title={'Difference (In-Out)'}
              eth={0.2209}
              usd={265.91}
            />
          </Dutch0x.ContentOverviewCards>
          <Dutch0x.ContentOverviewCards>
            <CurrenciesInvolvedCard
              data={[
                {
                  token: 'ETH',
                  tokenId: 'eth',
                  value: 0.423425,
                  price: 34.234534,
                },
                {
                  token: 'LRC',
                  tokenId: 'lrc',
                  value: 0.423425,
                  price: 34.234534,
                },
                {
                  token: 'USDT',
                  tokenId: 'usdt',
                  value: 0.423425,
                  price: 34.234534,
                },
              ]}
            />
            <CurrenciesInvolvedCard
              data={[
                {
                  token: 'ETH',
                  tokenId: 'eth',
                  value: 0.423425,
                  price: 34.234534,
                },
                {
                  token: 'LRC',
                  tokenId: 'lrc',
                  value: 0.423425,
                  price: 34.234534,
                },
                {
                  token: 'USDT',
                  tokenId: 'usdt',
                  value: 0.423425,
                  price: 34.234534,
                },
              ]}
            />
            <CurrenciesInvolvedCard
              data={[
                {
                  token: 'ETH',
                  tokenId: 'eth',
                  value: 0.423425,
                  price: 34.234534,
                },
                {
                  token: 'LRC',
                  tokenId: 'lrc',
                  value: 0.423425,
                  price: 34.234534,
                },
                {
                  token: 'USDT',
                  tokenId: 'usdt',
                  value: 0.423425,
                  price: 34.234534,
                },
              ]}
            />
          </Dutch0x.ContentOverviewCards>
          <AnalyticsTableLayout>
            <AnalyticsTableControl
              isSwitch
              isResultShowable
              resultNumber={234}
              isSearchable
              searchInputPlaceholder="Token"
              isPaginatiable
            />
            <Table className="dark:text-white text-black border rounded-xl table-fixed">
              <THead className="!text-black/100 dark:!text-white/100 bg-black/10 dark:bg-white/10">
                <TR>
                  <TD></TD>
                  <TD>Type</TD>
                  <TD>From</TD>
                  <TD>To</TD>
                  <TD>Bought (In)</TD>
                  <TD>Sold (Out)</TD>
                  <TD>Value</TD>
                  <TD>Gas</TD>
                  <TD>Time({timezone})</TD>
                </TR>
              </THead>
              <TBody className="text-sm">
                {analyticsTableData?.map((item, index) => (
                  <TR key={index}>
                    <TD>
                      <InOrOut value={item.dir} />
                    </TD>
                    <TD className="first-letter:uppercase">{item.type}</TD>
                    <TD>
                      <div className="flex w-fit items-center px-1 gap-x-1">
                        <div className="bg-black/10 px-1">{item.fromGroup}</div>
                        {item.from}
                      </div>
                    </TD>
                    <TD>
                      <div className="flex w-fit items-center px-1 gap-x-1">
                        <div className="bg-black/10 px-1">{item.toGroup}</div>
                        {item.to}
                      </div>
                    </TD>
                    <TD>
                      <div className="flex items-center gap-x-1">
                        {(item?.bought && (
                          <>
                            {item.bought?.value}
                            <LRCIconSelector id={item.bought.id} />
                          </>
                        )) ||
                          '-'}
                      </div>
                    </TD>
                    <TD>
                      <div className="flex items-center gap-x-1">
                        {(item?.sold && (
                          <>
                            {item.sold?.value}
                            <LRCIconSelector id={item.sold.id} />
                          </>
                        )) ||
                          '-'}
                      </div>
                    </TD>
                    <TD> {(item?.value && '$ ' + item.value) || '-'}</TD>
                    <TD>
                      <div className="flex items-center gap-x-1">
                        {(item?.gas && (
                          <>
                            {item.gas?.value}
                            <LRCIconSelector id={item.gas.id} />
                          </>
                        )) ||
                          '-'}
                      </div>
                    </TD>
                    <TD>{item.time}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </AnalyticsTableLayout>
        </div>
        <div className="charts flex flex-col gap-2"></div>
      </div>
    </div>
  );
};
