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

const TableViewPrimarySales: React.FC = () => {
  return (
    <>
      <AnalyticsTableLayout>
        <AnalyticsTableControl
          type="Primary Sale"
          title="Primary Sales"
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
          isTo
          isPrice
          isGas
          data={mockDataTransaction}
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
    </>
  );
};

export default TableViewPrimarySales;
