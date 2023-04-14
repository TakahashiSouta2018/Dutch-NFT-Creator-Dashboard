import React from 'react';
import { useTheme } from 'next-themes';

import { Table, THead, TBody, TR, TD } from '@/common';

import * as DutchC from './styles';

import * as Icons from '@/common/Icons';

interface TopRankingTableProps {
  className?: string;
  isSeller?: boolean;
  isBuyer?: boolean;
  isTotal?: boolean;
  isTotalNFTsBuy?: boolean;
  data?: {
    seller?: string;
    buyer?: string;
    total?: number;
    totalNFTsBuy?: number;
    totalTradeVolume: number;
  }[];
}

const TopRankingTable: React.FC<TopRankingTableProps> = ({
  data,
  className = ' ',
  isSeller,
  isBuyer,
  isTotal,
  isTotalNFTsBuy,
}) => {
  const { theme } = useTheme();

  return (
    <DutchC.TopRankingTableWrapper className={`${className}`}>
      {!data && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 dark:text-white">
          No data available
        </div>
      )}
      <Table className="dark:text-white text-black border rounded-xl table-auto">
        <THead className="!text-black/100 dark:!text-white/100 bg-black/5 dark:bg-white/5">
          <TR>
            {isSeller && <TD>Seller</TD>}
            {isBuyer && <TD>Buyer</TD>}
            {isTotal && <TD>Total</TD>}
            {isTotalNFTsBuy && <TD>Total NFTs Buy</TD>}
            <TD className="text-right">Total Trade Volume</TD>
          </TR>
        </THead>
        <TBody className="text-sm">
          {data?.map((item, index) => (
            <TR key={index}>
              {isSeller && <TD>{item?.seller}</TD>}
              {isBuyer && <TD>{item?.buyer}</TD>}
              {isTotal && <TD>{item.total}</TD>}
              {isTotalNFTsBuy && <TD>{item.totalNFTsBuy}</TD>}
              <TD className="text-right flex items-center gap-x-1 justify-end">
                {item.totalTradeVolume}
                <Icons.ICustomDiamond currentColor="white" />
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </DutchC.TopRankingTableWrapper>
  );
};

export default TopRankingTable;
