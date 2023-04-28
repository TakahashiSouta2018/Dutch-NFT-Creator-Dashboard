import React, { useState } from 'react';

import { SearchInput, CustomSelect, Pagination, Select } from '@/common';
import { OptionSwitch } from '../../option-switch';

import * as DutchC from './styles';

interface TableControlProps {
  type?:
    | 'All Transaction'
    | 'NFT Trade'
    | 'Primary Sale'
    | 'Royality'
    | 'Transfer';
  title?: string;
  date?: string;
  resultNumber?: number;
  options?: { name: string; value: string }[];
  selectedOption?: { name: string; value: string };
  searchInputPlaceholder?: string;

  isSwitch?: boolean;
  isSearchable?: boolean;
  isPaginatiable?: boolean;
  isSelectable?: boolean;
  isRanked?: boolean;
  isResultShowable?: boolean;
  isDateShowable?: boolean;
  onChange: (currentHolding: any) => void;
}

const switchOptions = [
  {
    id: 0,
    slug: 'Collections',
  },
  {
    id: 1,
    slug: 'NFTs',
  },
  {
    id: 2,
    slug: 'Investments',
  },
];

const selectOptions = [
  {
    name: 'All Transactions',
    value: 'All Transactions',
  },
  {
    name: 'Deposit',
    value: 'Deposit',
  },
  {
    name: 'Trade',
    value: 'Trade',
  },
  {
    name: 'Withdrawal',
    value: 'Withdrawal',
  },
  {
    name: 'Royality',
    value: 'Royality',
  },
  {
    name: 'Swap',
    value: 'Swap',
  },
  {
    name: 'Transfer',
    value: 'Transfer',
  },
  {
    name: 'NFT Mint',
    value: 'NFT Mint',
  },
  {
    name: 'NFT Transfer',
    value: 'NFT Transfer',
  },
  {
    name: 'NFT Trade',
    value: 'NFT Trade',
  },
  {
    name: 'NFT Primary Sale',
    value: 'NFT Primary Sale',
  },
  {
    name: 'Other',
    value: 'Other',
  },
];

const TableControl: React.FC<TableControlProps> = (p: TableControlProps) => {
  const [selectTrackingValue, setSelectTrackingValue] =
    useState('NFT Tracking');
  const [selectRanking, setSelectRanking] = useState('top-5');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [totalPage, setTotalPage] = useState(3);
  const [switchOption, setSwitchOption] = useState({
    id: 0,
    slug: 'Collections',
  });

  return (
    <>
      <DutchC.TransactionTableControlWrapper>
        <DutchC.TransactionTableControlLeft>
          {p.title && (
            <DutchC.TransactionTableControlTitle>
              {p.title}
            </DutchC.TransactionTableControlTitle>
          )}
          {p.isSwitch && (
            <DutchC.TrackSwitchWrapper>
              {switchOptions.map((option, i) => (
                <OptionSwitch
                  key={i}
                  currentOption={switchOption}
                  option={option}
                  onCurrentOption={(option) => {
                    setSwitchOption(option);
                    p.onChange(option);
                  }}
                />
              ))}
            </DutchC.TrackSwitchWrapper>
          )}
          {p.isRanked && (
            <div>
              <Select
                className="border-none"
                options={[
                  { key: 'top-5', value: 'Top 5' },
                  { key: 'top-10', value: 'Top 10' },
                  { key: 'top-20', value: 'Top 20' },
                ]}
                onChange={(e) => setSelectRanking(e.currentTarget.value)}
              />
            </div>
          )}
          {p.isDateShowable && (
            <DutchC.TransactionTableControlDate>
              {p.date}
            </DutchC.TransactionTableControlDate>
          )}
        </DutchC.TransactionTableControlLeft>
        <DutchC.TransactionTableControlRight>
          <DutchC.TransactionTableControlFilter>
            {p.isResultShowable && (
              <DutchC.TransactionTableControlResults>
                {p.resultNumber} results
              </DutchC.TransactionTableControlResults>
            )}
            {/* Search input */}
            {p.isSearchable && (
              <SearchInput
                placeholder={p?.searchInputPlaceholder}
                value={searchInputValue}
                onChange={(e) => {
                  setSearchInputValue(e.currentTarget.value);
                }}
              />
            )}
            {/* Select */}
            {p?.isSelectable && (
              <CustomSelect
                label="Type"
                options={selectOptions}
                value={selectTrackingValue}
                onChange={(value) => setSelectTrackingValue(value)}
              />
            )}
          </DutchC.TransactionTableControlFilter>
          {/* Pagination */}
          {p.isPaginatiable && (
            <Pagination
              onChange={(value) => console.log(value)}
              totalPage={totalPage}
            />
          )}
        </DutchC.TransactionTableControlRight>
      </DutchC.TransactionTableControlWrapper>
    </>
  );
};

export default TableControl;
