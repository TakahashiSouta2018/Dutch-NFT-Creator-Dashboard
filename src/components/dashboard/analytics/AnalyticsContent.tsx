import React, { useState } from 'react';
import { AnalyticsSideBar } from './sidebar';
import { OutlineButton, Table, THead, TBody, TD, TR } from '@/common';
import { OptionSwitch } from './option-switch';
import { Accordion } from '@/common/Accordion';
import {
  AnalyticsTableControl,
  AnalyticsTransactionTable,
  AnalyticsTableLayout,
  AnalyticsTopRankingTable,
} from '@/components/dashboard/analytics/analytics-tables';
import {
  ShortcutContextMenu,
  ShortcutContextMenuItem,
} from '@/components/shared/shortcut-context-menu';

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

const mockDataTransaction = [
  {
    type: 'transfer',
    from: 'AAA',
    to: 'BBB',
    nftId: {
      src: MilkGif,
      groupName: 'Inkheads',
      id: 'Yung Zuck',
    },
    transferredTimes: 3,
    units: 3,
    royalityPercent: 30,
    royality: 0.131,
    price: 0.00082455,
    gas: 0.00024862345453245,
    date: 'Mar 10, 20223  06:57:59',
    link: '/home',
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
    transferredTimes: 3,
    royalityPercent: 50,
    royality: 0.31,
    units: 3,
    gas: 0.000248,
    date: 'Mar 10, 20223  06:57:59',
    link: '/home',
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
    link: '/home',
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
    royalityPercent: 70,
    royality: 0.131,
    gas: 0.000248,
    date: 'Mar 10, 20223  06:57:59',
    link: '/home',
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
    link: '/home',
  },
];

const mockDataSellerTopRanking = [
  {
    seller: 'aaaa',
    buyer: 'bbbb',
    total: 33,
    totalNFTsBuy: 11,
    totalTradeVolume: 12.6727836423123,
  },
  {
    seller: 'aaaa',
    buyer: 'bbbb',
    total: 33,
    totalNFTsBuy: 11,
    totalTradeVolume: 12.6727836423123,
  },
  {
    seller: 'aaaa',
    buyer: 'bbbb',
    total: 33,
    totalNFTsBuy: 11,
    totalTradeVolume: 12.6727836423123,
  },
  {
    seller: 'aaaa',
    buyer: 'bbbb',
    total: 33,
    totalNFTsBuy: 11,
    totalTradeVolume: 12.6727836423123,
  },
  {
    seller: 'aaaa',
    buyer: 'bbbb',
    total: 33,
    totalNFTsBuy: 11,
    totalTradeVolume: 12.6727836423123,
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
        <ShortcutContextMenu position="TL">
          <ShortcutContextMenuItem
            key="1"
            text="aaa"
            onClick={() => {
              console.log('234567890');
            }}
          />
        </ShortcutContextMenu>
        <div className="table">
          {/* all transactions */}
          <AnalyticsTableLayout>
            <AnalyticsTableControl
              type="All Transaction"
              title="All Transactions"
              date="Mar 1, 2022 - Feb 28 2023"
              resultNumber={2224}
              options={[
                { name: 'AA', value: 'aa' },
                { name: 'BB', value: 'bb' },
                { name: 'CC', value: 'cc' },
              ]}
              isDateShowable
              isResultShowable
              isSelectable
              isSearchable
              isPaginatiable
            />
            <AnalyticsTransactionTable
              isAll
              isFrom
              isTo
              isPrice
              isGas
              data={mockDataTransaction}
            />
          </AnalyticsTableLayout>
          {/* trades */}
          <AnalyticsTableLayout>
            <AnalyticsTableControl
              type="NFT Trade"
              title="All Trades"
              date="Mar 1, 2022 - Feb 28 2023"
              resultNumber={2224}
              options={[
                { name: 'AA', value: 'aa' },
                { name: 'BB', value: 'bb' },
                { name: 'CC', value: 'cc' },
              ]}
              isDateShowable
              isResultShowable
              isSelectable
              isSearchable
              isPaginatiable
            />
            <AnalyticsTransactionTable
              isFrom
              isTo
              isRoyality
              isPrice
              isGas
              data={mockDataTransaction}
            />
          </AnalyticsTableLayout>
          {/* primary sales */}
          <AnalyticsTableLayout>
            <AnalyticsTableControl
              type="Primary Sale"
              title="Primary Sales"
              date="Mar 1, 2022 - Feb 28 2023"
              resultNumber={2224}
              options={[
                { name: 'AA', value: 'aa' },
                { name: 'BB', value: 'bb' },
                { name: 'CC', value: 'cc' },
              ]}
              isDateShowable
              isResultShowable
              isSelectable
              isSearchable
              isPaginatiable
            />
            <AnalyticsTransactionTable
              isTo
              isPrice
              isGas
              data={mockDataTransaction}
            />
          </AnalyticsTableLayout>
          {/* royalities */}
          <AnalyticsTableLayout>
            <AnalyticsTableControl
              type="Royality"
              title="All Trades"
              date="Mar 1, 2022 - Feb 28 2023"
              resultNumber={2224}
              options={[
                { name: 'AA', value: 'aa' },
                { name: 'BB', value: 'bb' },
                { name: 'CC', value: 'cc' },
              ]}
              isDateShowable
              isResultShowable
              isSelectable
              isSearchable
              isPaginatiable
            />
            <AnalyticsTransactionTable
              isTo
              isRoyality
              isPrice
              data={mockDataTransaction}
            />
          </AnalyticsTableLayout>
          {/* transfer */}
          <AnalyticsTableLayout>
            <AnalyticsTableControl
              type="Transfer"
              title="All Trades"
              date="Mar 1, 2022 - Feb 28 2023"
              resultNumber={2224}
              options={[
                { name: 'AA', value: 'aa' },
                { name: 'BB', value: 'bb' },
                { name: 'CC', value: 'cc' },
              ]}
              isDateShowable
              isResultShowable
              isSelectable
              isSearchable
              isPaginatiable
            />
            <AnalyticsTransactionTable
              isFrom
              isTo
              isGas
              data={mockDataTransaction}
            />
          </AnalyticsTableLayout>
          {/* Most transfered NFTs */}
          <AnalyticsTableLayout>
            <AnalyticsTableControl
              type="Transfer"
              title="Most Transfered NFTs"
              isRanked
            />
            <AnalyticsTransactionTable
              isTransferredTimes
              data={mockDataTransaction}
            />
          </AnalyticsTableLayout>
          {/* Top Seller Ranking */}
          <AnalyticsTableLayout>
            <AnalyticsTableControl title="Top Sellers" isRanked />
            <AnalyticsTopRankingTable
              isSeller
              isTotal
              data={mockDataSellerTopRanking}
            />
          </AnalyticsTableLayout>
          {/* Top Buyer Ranking */}
          <AnalyticsTableLayout>
            <AnalyticsTableControl title="Top Buyers" isRanked />
            <AnalyticsTopRankingTable
              isBuyer
              isTotal
              data={mockDataSellerTopRanking}
            />
          </AnalyticsTableLayout>
          {/* Top Buyer (Total NFTs Buy) Ranking */}
          <AnalyticsTableLayout>
            <AnalyticsTableControl title="Top Buyers" isRanked />
            <AnalyticsTopRankingTable
              isBuyer
              isTotalNFTsBuy
              data={mockDataSellerTopRanking}
            />
          </AnalyticsTableLayout>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContent;
