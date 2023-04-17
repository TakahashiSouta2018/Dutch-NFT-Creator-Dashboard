import React from 'react';

import {
  AllTransactionsI,
  TransactionTypeEnum,
  getAllTransactionDuration,
  getTradeNftsUtils,
} from '@/helpers';

import {
  AnalyticsTableLayout,
  AnalyticsTableControl,
  AnalyticsTransactionTable,
  AnalyticsTopRankingTable,
} from '..';

import MilkGif from '@/assets/milk.gif';

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

const TableViewTransfers: React.FC = () => {
  return (
    <>
      <AnalyticsTableLayout>
        <AnalyticsTableControl
          type="Transfer"
          title="All Trades"
          date="Mar 1, 2022 - Feb 28 2023"
          resultNumber={2224}
          options={[
            { name: 'All', value: 'All' },
            { name: 'NFT Tracking', value: 'NFT Tracking' },
            { name: 'Wallet Tracking', value: 'Wallet Tracking' },
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
    </>
  );
};

export default TableViewTransfers;
