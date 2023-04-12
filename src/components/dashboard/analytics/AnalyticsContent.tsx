import React, { useEffect, useState } from 'react';
import { AnalyticsSideBar } from './sidebar';
import { OutlineButton, Table, THead, TBody, TD, TR } from '@/common';
import { OptionSwitch } from './option-switch';
import { Accordion } from '@/common/Accordion';
import { AnalyticsTableSelector } from '@/components/dashboard/analytics/analytics-tables';

import { AnalyticsCard } from './analytics-card';
import {
  AnalyticsAreaChart,
  AnalyticsBarChart,
  AnalyticsComposedChart,
  AnalyticsPieChart,
  GasFeeAnalyticsChart,
} from './charts';
import { TypeCard } from './transaction-type-card';
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
import { TotalGasCard } from './total-gas-card';
import { WalletTracking } from './WalletTracking';

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

const mockAreaDataOne = Array.from(Array(6), (_, id) => {
  return {
    date: `1483232400`,
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
  const [currentTracking, setCurrentTracking] = useState(0);

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
      <AnalyticsSideBar
        onCurrentTracking={(currentValue: string) => {
          setCurrentTracking(Number(currentValue));
        }}
      />
      <Dutch0x.AnalyticsContentMain>
        {currentTracking ? (
          <WalletTracking />
        ) : (
          <div className="nft-tracking">
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
              <Dutch0x.ContentIdkHead>
                <OutlineButton size="small">Inkheads</OutlineButton>
                <p className="text-xs text-black/70">
                  The tracking shown is according to the timeline selected.
                </p>
              </Dutch0x.ContentIdkHead>
            </Dutch0x.ContentSwitch>
            <Dutch0x.ContentOverviewWrapper>
              <div className="font-bold text-black">Overview</div>
              <Dutch0x.ContentOverviewInner>
                <Dutch0x.ContentOverviewCards>
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
                </Dutch0x.ContentOverviewCards>
                <Dutch0x.ContentOverviewCharts>
                  <Dutch0x.ContentOverviewChartsMain
                    className={
                      currentTransOption.id === 0 || currentTransOption.id === 3
                        ? 'w-2/3'
                        : 'w-full'
                    }
                  >
                    <Dutch0x.ChartsMainTitle>
                      Transactions Count vs Timeline
                    </Dutch0x.ChartsMainTitle>
                    <Dutch0x.ChartsWrapper>
                      <Dutch0x.AreaChartsWrapper>
                        <AnalyticsAreaChart
                          data={mockAreaData}
                          dayOption={currentDayOption.slug}
                        />
                      </Dutch0x.AreaChartsWrapper>
                      <Dutch0x.BarChartsWrapper>
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
                      </Dutch0x.BarChartsWrapper>
                    </Dutch0x.ChartsWrapper>
                  </Dutch0x.ContentOverviewChartsMain>
                  {currentTransOption.slug === 'All Transactions' && (
                    <Dutch0x.ContentOverviewChartsRight>
                      <p className="font-bold text-sm text-black/70">
                        By transaction types
                      </p>
                      <AnalyticsPieChart
                        data={analyticPieChartData}
                        totalTransaction={totalTransactionCount}
                      />
                    </Dutch0x.ContentOverviewChartsRight>
                  )}
                  {currentTransOption.slug === 'Royalties' && (
                    <Dutch0x.ContentOverviewChartsRight>
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
                    </Dutch0x.ContentOverviewChartsRight>
                  )}
                </Dutch0x.ContentOverviewCharts>
              </Dutch0x.ContentOverviewInner>
            </Dutch0x.ContentOverviewWrapper>

            <div className="table w-full">
              <AnalyticsTableSelector currentTransOption={currentTransOption} />
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-x-2">
                  <div className="text-black/70 text-sm font-bold whitespace-nowrap dark:text-white inline-flex items-center justify-center">
                    Profit & Loss Trends
                  </div>
                  <div className="text-sm text-black/70 font-normal whitespace-nowrap dark:text-white/70 inline-flex items-center justify-center">
                    Apr 1 2022 - Mar 31 2023
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="w-full">
                    <AnalyticsComposedChart />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-x-2">
                  <div className="text-black text-base font-bold whitespace-nowrap dark:text-white inline-flex items-center justify-center">
                    Gas Fee Analytics
                  </div>
                </div>
                <div className="divide-y divide-black/10 border border-black/10 rounded-lg">
                  <TotalGasCard />
                  <div className="pt-3">
                    <GasFeeAnalyticsChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dutch0x.AnalyticsContentMain>
    </Dutch0x.AnalyticsContentWrapper>
  );
};

export default AnalyticsContent;
