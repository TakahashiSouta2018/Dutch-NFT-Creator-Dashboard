import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { Table, THead, TBody, TR, TD } from '@/common';

import * as Icons from '@/common/Icons';

import * as DutchC from './styles';
import { TransactionTypeEnum } from '@/helpers';

interface TransactactionTableProps {
  className?: string;
  isAll?: boolean;
  isFrom?: boolean;
  isTo?: boolean;
  isUnits?: boolean;
  isRoyality?: boolean;
  isPrice?: boolean;
  isGas?: boolean;
  isTransferredTimes?: boolean;
  data?: {
    type: string;
    from?: string;
    to?: string;
    nftId: {
      src: string | StaticImageData;
      groupName: string;
      id: string;
    };
    royalityPercent?: number;
    royality?: number;
    units?: number;
    transferredTimes?: number;
    price?: number;
    gas?: number;
    date?: string;
    link: string;
  }[];
}

const iconMatches = {
  Transfer: Icons.ICustomTriagleX2,
  'NFT trades': Icons.IShoppingBag,
  'Primary sales': Icons.ICustomFire,
};

type IType = keyof typeof iconMatches;

const IconSelector = ({
  type,
  currentColor,
  className,
}: {
  type: IType;
  currentColor: string;
  className?: string;
}) => {
  const Icon = iconMatches[type];
  return <Icon currentColor={currentColor} className={className} />;
};

const TransactionTable: React.FC<TransactactionTableProps> = ({
  data,
  className = ' ',
  isAll,
  isFrom,
  isTo,
  isGas,
  isPrice,
  isRoyality,
  isTransferredTimes,
  isUnits,
}) => {
  const { theme } = useTheme();

  return (
    <DutchC.TransactionTableWrapper className={`${className}`}>
      <Table className="dark:text-white text-black border rounded-xl table-fixed">
        <THead className="!text-black/100 dark:!text-white/100 bg-black/10 dark:bg-white/10">
          <TR>
            {isAll && (
              <>
                <TD></TD>
                <TD>Type</TD>
              </>
            )}
            {isFrom && <TD>From</TD>}
            {isTo && <TD>To</TD>}
            <TD>NFT Id</TD>
            {isUnits && <TD className="text-right">Units</TD>}
            {isRoyality && (
              <>
                <TD className="text-right">Royalities(%)</TD>
                <TD className="text-right">Royalities</TD>
              </>
            )}
            {isTransferredTimes && <TD className="text-center">Times</TD>}
            {isPrice && <TD className="text-right">Price</TD>}
            {isGas && <TD className="text-right">Gas</TD>}
            <TD className="w-0">Time (EST)</TD>
          </TR>
        </THead>
        <TBody className="text-sm">
          {data?.map((item, index) => (
            <TR key={index}>
              {isAll && (
                <>
                  <TD>
                    <IconSelector
                      type={item.type as IType}
                      currentColor={theme === 'light' ? 'black' : 'white'}
                    />
                  </TD>
                  <TD>{item?.type}</TD>
                </>
              )}
              {isFrom && <TD>{item?.from}</TD>}
              {isTo && <TD>{item?.to}</TD>}
              <TD className="w-fit">
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
              {isUnits && <TD className="text-right">{item.units}</TD>}
              {isRoyality && (
                <>
                  <TD className="text-right">
                    {(item?.royalityPercent && item.royalityPercent) || 0}(%)
                  </TD>
                  <TD className="text-right">
                    {item?.royality && (
                      <DutchC.TransactionTableFlexRowWrapper className="justify-end">
                        {item.royality} <Icons.ICustomDiamondBlue />
                      </DutchC.TransactionTableFlexRowWrapper>
                    )}
                  </TD>
                </>
              )}
              {isTransferredTimes && (
                <TD className="text-center">
                  <DutchC.TransactionTableFlexRowWrapper className="justify-center">
                    {item?.transferredTimes || 0}
                  </DutchC.TransactionTableFlexRowWrapper>
                </TD>
              )}
              {isPrice && (
                <TD className="text-right">
                  <DutchC.TransactionTableFlexRowWrapper className="justify-end">
                    {item?.price} {item?.price && <Icons.ICustomDiamondBlue />}
                  </DutchC.TransactionTableFlexRowWrapper>
                </TD>
              )}
              {isGas && (
                <TD>
                  <DutchC.TransactionTableFlexRowWrapper className="justify-end">
                    {item?.gas} {item?.gas && <Icons.ICustomDiamondBlue />}
                  </DutchC.TransactionTableFlexRowWrapper>
                </TD>
              )}
              <TD className="whitespace-nowrap">
                <DutchC.TransactionTableFlexRowWrapper className="  ">
                  {item.date}
                  {item?.date && (
                    <Link href={item.link} className="hover:bg-black/">
                      <Icons.IArrowUpRight className="text-black dark:text-white w-5 h-5 border bg-black/5 dark:bg-white/5 rounded-md" />
                    </Link>
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
