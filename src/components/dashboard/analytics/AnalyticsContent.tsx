import React, { useEffect, useState } from 'react';
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
const mockData = [
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
    price: 0.00085,
    gas: 0.000248,
    date: 'Mar 10, 20223  06:57:59',
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
    gas: 0.000248,
    price: 0.00085,
    date: 'Mar 10, 20223  06:57:59',
  },
  {
    type: TransactionTypeEnum.PRIMARY,
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
    type: TransactionTypeEnum.TRANSFER,
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
    type: TransactionTypeEnum.SECONDARY,
    from: 'AAA',
    to: 'BBB',
    nftId: {
      src: MilkGif,
      groupName: 'Inkheads',
      id: 'Yung Zuck',
    },
    units: 3,
    gas: 0.000248,
    price: 0.00085,
    date: 'Mar 10, 2023  06:57:59',
  },
];

const AnalyticsContent = () => {
  const [currentTransOption, setCurrentTransOption] = useState(0);
  const [currentDayOption, setCurrentDayOption] = useState(0);
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
      console.log({ data });

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

        // setAllTransactions(mockData)
        // setTransActionsCount(4000)
        // setAnalyticPieChartData([
        //   { name: 'Trades', value: 1458 },
        //   { name: 'Primary Sales', value: 952 },
        //   { name: 'Transfers', value: 752 },
        // ])
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

  return (
    <Dutch0x.AnalyticsContentWrapper>
      <AnalyticsSideBar />
      <Dutch0x.AnalyticsContentMain>
        <Dutch0x.ContentSwitch>
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
        </Dutch0x.ContentSwitch>
        <Dutch0x.ContentOverviewWrapper>
          <div className="font-bold text-black">Overview</div>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <AnalyticsCard
                title="Transactions Count"
                transActionsCount={totalTransactionCount}
                percentage={5.74}
              />
              <AnalyticsCard
                title="Turnover"
                eth={ethTurnOver}
                lrc={lrcTurnOver}
                usd={1146.91}
                percentage={-3.7}
              />
              <AnalyticsCard
                title="Royalties Earned"
                eth={ethTotalRoyalty}
                lrc={lrcTotalRoyalty}
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
                <AnalyticsPieChart
                  data={analyticPieChartData}
                  totalTransaction={totalTransactionCount}
                />
              </div>
            </div>
          </div>
        </Dutch0x.ContentOverviewWrapper>
        <div className="table">
          <AnalyticsTableLayout>
            <AnalyticsTableControl
              type="All Transaction"
              title="All Transaction"
              date={getAllTransactionDuration(allTransactions)}
              resultNumber={2224}
              options={[
                {
                  name: TransactionTypeEnum.PRIMARY,
                  value: TransactionTypeEnum.PRIMARY,
                },
                {
                  name: TransactionTypeEnum.SECONDARY,
                  value: TransactionTypeEnum.SECONDARY,
                },
                {
                  name: TransactionTypeEnum.TRANSFER,
                  value: TransactionTypeEnum.TRANSFER,
                },
              ]}
              isSearchable
              isPaginatiable
            />
            <AnalyticsTransactionTable isIcon data={allTransactions} />
          </AnalyticsTableLayout>
        </div>
      </Dutch0x.AnalyticsContentMain>
    </Dutch0x.AnalyticsContentWrapper>
  );
};

export default AnalyticsContent;
