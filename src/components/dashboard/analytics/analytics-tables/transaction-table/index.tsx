import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { useTheme } from 'next-themes';

import { Table, THead, TBody, TR, TD } from '@/common';

import * as Icons from '@/common/Icons';

import * as DutchC from './styles';
import { TransactionTypeEnum } from '@/helpers';

interface TransactactionTableProps {
  className?: string;
  isIcon?: boolean;
  data?: {
    type: TransactionTypeEnum;
    from?: string;
    to?: string;
    nftId: {
      src: string | StaticImageData;
      groupName: string;
      id: string;
    };
    units: number;
    price?: number;
    gas?: number;
    date?: string;
  }[];
}

const IconSelector = ({
  type,
  currentColor,
  className,
}: {
  type: TransactionTypeEnum;
  currentColor: string;
  className?: string;
}) => {
  const iconMatches = {
    [TransactionTypeEnum.TRANSFER]: Icons.ICustomTriagleX2,
    [TransactionTypeEnum.SECONDARY]: Icons.IShoppingBag,
    [TransactionTypeEnum.PRIMARY]: Icons.ICustomFire,
  };
  const Icon = iconMatches[type];
  return <Icon currentColor={currentColor} className={className} />;
};

const TransactionTable: React.FC<TransactactionTableProps> = ({
  data,
  isIcon,
  className = ' ',
}) => {
  const { theme } = useTheme();

  return (
    <DutchC.TransactionTableWrapper className={`${className}`}>
      <Table className="dark:text-white text-black border rounded-xl">
        <THead className="text-black/100 bg-black/5 dark:bg-white/5">
          <TR>
            {isIcon && <TD></TD>}
            <TD>Type</TD>
            <TD>From</TD>
            <TD>To</TD>
            <TD>NFT Id</TD>
            <TD className="text-right">Units</TD>
            <TD className="text-right">Price</TD>
            <TD className="text-right">Gas</TD>
            <TD>Time (EST)</TD>
          </TR>
        </THead>
        <TBody className="text-sm ">
          {data?.map((item, index) => (
            <TR key={index}>
              {isIcon && (
                <TD>
                  <IconSelector
                    type={item.type}
                    currentColor={theme === 'light' ? 'black' : 'white'}
                    className={
                      theme === 'light' ? 'text-black/100' : 'text-white/100'
                    }
                  />
                </TD>
              )}
              <TD>{item?.type}</TD>
              <TD>{item?.from}</TD>
              <TD>{item?.to}</TD>
              <TD>
                <DutchC.TransactionTableFlexRowWrapper>
                  {item?.nftId && (
                    <Image
                      src={item.nftId.src}
                      alt="nft"
                      width={48}
                      height={48}
                      className="border rounded-lg"
                    />
                  )}
                  <DutchC.TransactionTableFlexColWrapper>
                    <span>
                      {item?.nftId?.groupName} | {item?.nftId && item.nftId.id}
                    </span>
                    <span className="text-xs">{item?.nftId?.groupName}</span>
                  </DutchC.TransactionTableFlexColWrapper>
                </DutchC.TransactionTableFlexRowWrapper>
              </TD>
              <TD className="text-right">{item.units}</TD>
              <TD className="text-right">
                <DutchC.TransactionTableFlexRowWrapper className="justify-end">
                  {item?.price} {item?.price && <Icons.ICustomDiamond />}
                </DutchC.TransactionTableFlexRowWrapper>
              </TD>
              <TD>
                <DutchC.TransactionTableFlexRowWrapper className="justify-end">
                  {item?.gas} {item?.gas && <Icons.ICustomDiamond />}
                </DutchC.TransactionTableFlexRowWrapper>
              </TD>
              <TD>
                <DutchC.TransactionTableFlexRowWrapper>
                  {item.date}
                  {item?.date && (
                    <Icons.IArrowUpRight className="w-5 h-5 border bg-black/5 dark:bg-white/5 rounded-md" />
                  )}
                </DutchC.TransactionTableFlexRowWrapper>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </DutchC.TransactionTableWrapper>
  );
};

export default TransactionTable;
