import React, { useState } from 'react';
import { AnalyticsSideBar } from './sidebar';
import {
  OutlineButton,
  Table,
  THead,
  TBody,
  TD,
  TR,
  CustomSelect,
} from '@/common';
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

import { TotalGasCard } from './total-gas-card';
import { WalletTracking } from './WalletTracking';
import { NFTTracking } from './nft-tracking';
import * as DutchC from './styles';

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

const composedChartData = Array.from(Array(12), (_, id) => {
  return   {
    id: 0,
    Expenses: Math.floor(-100 * Math.random()),
    Turnover: Math.floor(100 * Math.random()),
    'P&L': 200,
    Date: '1672099200',
  }
})

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
  const [currentTracking, setCurrentTracking] = useState(0);

  return (
    <DutchC.AnalyticsContentWrapper>
      <AnalyticsSideBar
        onCurrentTracking={(currentValue: string) => {
          setCurrentTracking(Number(currentValue));
        }}
      />
      <DutchC.AnalyticsContentMain>
        {currentTracking ? <WalletTracking /> : <NFTTracking />}
      </DutchC.AnalyticsContentMain>
    </DutchC.AnalyticsContentWrapper>
  );
};

export default AnalyticsContent;
