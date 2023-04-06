import React from 'react';

import { Table, THead, TBody, TD, TR } from '@/common';
import {
  AnalyticsTableControl,
  AnalyticsTransactionTable,
  AnalyticsTableLayout,
} from '@/components/dashboard/analytics/analytics-tables';

import MilkGif from '@/assets/milk.gif';

const Test: React.FC = () => {
  const mockData = [
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
      price: 0.00085,
      gas: 0.000248,
      date: 'Mar 10, 20223  06:57:59',
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
      gas: 0.000248,
      date: 'Mar 10, 20223  06:57:59',
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
      gas: 0.000248,
      date: 'Mar 10, 20223  06:57:59',
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
    },
  ];

  return (
    <AnalyticsTableLayout className="p-[100px]">
      <AnalyticsTableControl
        type="All Transaction"
        title="All Transaction"
        date="Mar 1, 2022 - Feb 28 2023"
        resultNumber={2224}
        options={[
          { name: 'AA', value: 'aa' },
          { name: 'BB', value: 'bb' },
          { name: 'CC', value: 'cc' },
        ]}
        isSearchable
        isPaginatiable
      />
      <AnalyticsTransactionTable isIcon data={mockData} />
    </AnalyticsTableLayout>
  );
};

export default Test;
