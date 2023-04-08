import React, { useEffect, useState } from 'react';
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

import { AnalyticsCard } from './analytics-card';
import {
  AnalyticsAreaChart,
  AnalyticsBarChart,
  AnalyticsPieChart,
} from './charts';
import { TypeCard } from './transaction-type-card';
import MilkGif from '@/assets/milk.gif';
import { useLazyQuery } from '@apollo/client';
import { NFT_ID_TRANSACTIONS } from '@/graphql/queries';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { TrackListTypeEnum } from '../ducks';
import { LoopringService } from '@/lib/LoopringService';
import { AnalyticPieChartDataI, TradeNFTI } from '@/types';
import { ethers } from 'ethers';
import {
  AllTransactionsI,
  TransactionTypeEnum,
  getAllTransactionDuration,
  getTradeNftsUtils,
} from '@/helpers';

import * as Dutch0x from './styles';
import { BarChart } from 'recharts';

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
const mockDataTransaction = [
  {
    type: TransactionTypeEnum.TRANSFER,
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
    type: TransactionTypeEnum.SECONDARY,
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
    type: TransactionTypeEnum.SECONDARY,
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
    type: TransactionTypeEnum.TRANSFER,
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
const mockAreaDataOne = Array.from(Array(6), (_, id) => {
  return {
    date: '1672104200',
    uv: Math.floor(50 * Math.random()) + 500,
    pv: Math.floor(50 * Math.random()) + 500,
  };
});

const mockAreaDataTwo = Array.from(Array(60), (_, id) => {
  return {
    date: '1672104200',
    uv: Math.floor(50 * Math.random()) + 500,
  };
});

const mockBarData = Array.from(Array(60), (_, id) => {
  return {
    date: '1672104200',
    uv: Math.floor(100 * Math.random()),
    pv: Math.floor(100 * Math.random()),
  };
});

const mockRoyalityBarData = [
  {
    date: '0-5',
    uv: 0.001,
  },
  {
    date: '6',
    uv: 0.005,
  },
  {
    date: '7',
    uv: 0.003,
  },
  {
    date: '8',
    uv: 0.01,
  },
  {
    date: '9',
    uv: 0.02,
  },
  {
    date: '10',
    uv: 0.025,
  },
];

const SwitchTransOptions = (params: string) => {
  switch (params) {
    case 'All Transactions':
      return mockAreaDataOne;
    default:
      return mockAreaDataTwo;
  }
};

const AnalyticsContent = () => {
  const [currentTransOption, setCurrentTransOption] = useState({
    id: 0,
    slug: 'All Transactions',
  });
  const [currentDayOption, setCurrentDayOption] = useState({
    id: 4,
    slug: 'All',
  });
  const [totalTransactionCount, setTransActionsCount] = useState(0);
  const [ethTurnOver, setEthTurnOver] = useState(0);
  const [lrcTurnOver, setLrcTurnOver] = useState(0);
  const [lrcTotalRoyalty, setLrcTotalRoyalty] = useState(0);
  const [ethTotalRoyalty, setEthTotalRoyalty] = useState(0);
  const [nftIds, setNftIds] = useState<string[]>([]);
  const [analyticPieChartData, setAnalyticPieChartData] = useState<
    AnalyticPieChartDataI[]
  >([]);
  const [allTransactions, setAllTransactions] = useState<AllTransactionsI[]>(
    []
  );

  const { trackList } = useAppSelector((state) => {
    const { trackList } = state.dashboardPageReducer;
    return { trackList };
  }, shallowEqual);

  const { accountInfo } = useAppSelector((state) => {
    const { accountInfo } = state.webAppReducer;
    return { accountInfo };
  }, shallowEqual);

  const loopringService = new LoopringService();

  const [getData, { loading }] = useLazyQuery<{
    tradeNFTs: TradeNFTI[];
    transferNFTs: any;
  }>(NFT_ID_TRANSACTIONS, {
    variables: {
      nftIds,
    },
    onCompleted(data) {
      if (data && data.transferNFTs && data.tradeNFTs) {
        const {
          totalRoyatliesLRC,
          totalRoyatliesETH,
          totalTurnoverETH,
          totalTurnoverLRC,
          primarySales,
          secondaryTrade,
          allTransactions,
        } = getTradeNftsUtils(
          data.tradeNFTs,
          String(accountInfo?.accInfo.owner)
        );

        setLrcTotalRoyalty(totalRoyatliesLRC);
        setEthTotalRoyalty(totalRoyatliesETH);
        setEthTurnOver(totalTurnoverETH);
        setLrcTurnOver(totalTurnoverLRC);

        setAllTransactions(allTransactions);
        setTransActionsCount(data.transferNFTs.length + data.tradeNFTs.length);
        setAnalyticPieChartData([
          { name: 'Trades', value: secondaryTrade.length },
          { name: 'Primary Sales', value: primarySales.length },
          { name: 'Transfers', value: data.transferNFTs.length },
        ]);
      }
    },
    onError(error) {
      console.log({ error });
    },
  });

  const selectedTrackLists = trackList.filter((item) => item.isSelected);

  useEffect(() => {
    (async () => {
      let ids: string[] = [];

      const collectionIds = selectedTrackLists
        .filter((item) => item.type === TrackListTypeEnum.COLLECTION)
        .map((item) => item.id);

      if (collectionIds.length > 0) {
        if (!accountInfo) return;

        const nftsInfo = await loopringService.getUserNFTCollection({
          accountInfo,
          tokensAddress: collectionIds,
          offset: 0,
          limit: 50,
        });

        if (nftsInfo && nftsInfo.nfts && nftsInfo.nfts.length > 0) {
          ids = nftsInfo.nfts.map((nft) => nft.nftId);
        }
      } else {
        ids = selectedTrackLists.map((item) => item.id);
      }
      getData();
      setNftIds(ids);
    })();
  }, [selectedTrackLists.length]);

  const mockAreaData = SwitchTransOptions(currentTransOption.slug);

  return (
    <Dutch0x.AnalyticsContentWrapper>
      <AnalyticsSideBar />
      <Dutch0x.AnalyticsContentMain>
        <Dutch0x.ContentSwitch>
          <Dutch0x.ContentSwitchInner>
            <Dutch0x.TransactionSwitchWrapper>
              {transOptions.map((option, i) => (
                <OptionSwitch
                  key={i}
                  currentOption={currentTransOption}
                  option={option}
                  onCurrentOption={(option) => {
                    setCurrentTransOption(option);
                  }}
                />
              ))}
            </Dutch0x.TransactionSwitchWrapper>
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
          </Dutch0x.ContentSwitchInner>
          <div className="flex gap-2 items-center">
            <OutlineButton size="small">Inkheads</OutlineButton>
            <p className="text-xs text-black/70">
              The tracking shown is according to the timeline selected.
            </p>
          </div>
        </Dutch0x.ContentSwitch>
        <Dutch0x.ContentOverviewWrapper>
          <div className="font-bold text-black">Overview</div>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <AnalyticsCard
                title={currentTransOption.slug + ' Count'}
                transActionsCount={totalTransactionCount}
                percentage={5.74}
              />
              {currentTransOption.id > 2 ? (
                <></>
              ) : (
                <AnalyticsCard
                  title={
                    currentTransOption.slug === 'All Transactions'
                      ? 'Turnover'
                      : currentTransOption.slug + ' Volume'
                  }
                  eth={ethTurnOver}
                  lrc={lrcTurnOver}
                  usd={1146.91}
                  percentage={-3.7}
                />
              )}
              {currentTransOption.slug === 'Primary Sales' ? (
                <></>
              ) : (
                <AnalyticsCard
                  title={'Royalties Earned'}
                  eth={ethTotalRoyalty}
                  lrc={lrcTotalRoyalty}
                  usd={431.86}
                  percentage={5.1}
                />
              )}
            </div>
            <div className="flex gap-6">
              <div
                className={`flex flex-col gap-2 ${
                  currentTransOption.id === 0 || currentTransOption.id === 3
                    ? 'w-2/3'
                    : 'w-full'
                }`}
              >
                <div className="font-bold text-sm text-black/70">
                  Transactions Count vs Timeline
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="w-full h-[250px]">
                    <AnalyticsAreaChart data={mockAreaData} />
                  </div>
                  <div className="py-2 flex flex-col gap-2 w-[95%]">
                    <div className="w-full h-[100px]">
                      <AnalyticsBarChart
                        data={mockBarData}
                        barColors={
                          currentTransOption.id === 0
                            ? ['#449975', '#E16D40']
                            : ['#000']
                        }
                      />
                    </div>
                    <p className="font-bold text-center text-sm text-black/70">
                      Turnover
                    </p>
                  </div>
                </div>
              </div>
              {currentTransOption.slug === 'All Transactions' && (
                <div className="flex flex-col gap-4 w-1/3">
                  <p className="font-bold text-sm text-black/70">
                    By transaction types
                  </p>
                  <AnalyticsPieChart
                    data={analyticPieChartData}
                    totalTransaction={totalTransactionCount}
                  />
                </div>
              )}
              {currentTransOption.slug === 'Royalties' && (
                <div className="flex flex-col gap-4 w-1/3">
                  <p className="font-bold text-sm text-black/70">
                    Royalties Earned (ETH) for Percentage groups
                  </p>
                  <div className="w-[400px] h-[400px]">
                    <AnalyticsBarChart
                      data={mockRoyalityBarData}
                      barColors={[
                        '#E16D40',
                        '#6661A3',
                        '#449975',
                        '#F8D483',
                        '#49AABF',
                        '#BB5EB2',
                      ]}
                      colorable={true}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Dutch0x.ContentOverviewWrapper>
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
      </Dutch0x.AnalyticsContentMain>
    </Dutch0x.AnalyticsContentWrapper>
  );
};

export default AnalyticsContent;
