import React, { useState } from 'react';

import {
  SearchInput,
  CustomSelect,
  Pagination,
  Select,
  TextInput,
} from '@/common';

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
  isSearchable?: boolean;
  isPaginatiable?: boolean;
  isSelectable?: boolean;
  isRanked?: boolean;
  isResultShowable?: boolean;
  isDateShowable?: boolean;
  isInvolvedCurrencies?: boolean;
  isNFTsCount?: boolean;
}

const TableControl: React.FC<TableControlProps> = (p: TableControlProps) => {
  const [isInvolvedChecked, setIsInvolvedChecked] = useState(false);
  const [isNFTsCountChecked, setIsNFTsCountChecked] = useState(false);

  return (
    <>
      <DutchC.TransactionTableControlWrapper>
        <DutchC.TransactionTableControlLeft>
          <DutchC.TransactionTableControlTitle>
            {p.title}
          </DutchC.TransactionTableControlTitle>
          {p.isRanked && (
            <div>
              <Select
                className="border-none"
                options={[
                  { key: 'top-5', value: 'Top 5' },
                  { key: 'top-10', value: 'Top 10' },
                  { key: 'top-20', value: 'Top 20' },
                ]}
              />
            </div>
          )}
          {p.isDateShowable && (
            <DutchC.TransactionTableControlDate>
              {p.date}
            </DutchC.TransactionTableControlDate>
          )}
          {p.isInvolvedCurrencies && (
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={isInvolvedChecked}
                onChange={() => {
                  setIsInvolvedChecked(!isInvolvedChecked);
                }}
                name="isInvolved"
              />
              <label htmlFor="isInvolved">Involved Currencies</label>
            </div>
          )}
          {p.isNFTsCount && (
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={isNFTsCountChecked}
                onChange={() => {
                  setIsNFTsCountChecked(!isNFTsCountChecked);
                }}
                name="isNFTsCountChecked"
              />
              <label htmlFor="isNFTsCountChecked">NFTs Count</label>
            </div>
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
              <SearchInput placeholder="Search" onChange={() => {}} />
            )}
            {/* Select */}
            {p?.isSelectable && (
              <CustomSelect
                label="Type"
                options={p.options}
                selectedOption={p.selectedOption}
                onSelect={() => {}}
              />
            )}
          </DutchC.TransactionTableControlFilter>
          {/* Pagination */}
          {p.isPaginatiable && <Pagination totalPage={3} />}
        </DutchC.TransactionTableControlRight>
      </DutchC.TransactionTableControlWrapper>
    </>
  );
};

export default TableControl;
