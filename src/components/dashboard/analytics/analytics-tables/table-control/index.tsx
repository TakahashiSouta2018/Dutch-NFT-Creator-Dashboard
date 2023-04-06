import React from 'react';

import { SearchInput, CustomSelect, Pagination } from '@/common';

import * as DutchC from './styles';

interface TableControlProps {
  type:
    | 'All Transaction'
    | 'NFT Trade'
    | 'Primary Sale'
    | 'Royality'
    | 'Transfer';
  title: string;
  date?: string;
  resultNumber?: number;
  options?: { name: string; value: string }[];
  selectedOption?: { name: string; value: string };
  isSearchable?: boolean;
  isPaginatiable?: boolean;
}

const TableControl: React.FC<TableControlProps> = (p: TableControlProps) => {
  return (
    <>
      <DutchC.TransactionTableControlWrapper>
        <DutchC.TransactionTableControlLeft>
          <DutchC.TransactionTableControlTitle>
            {p.title}
          </DutchC.TransactionTableControlTitle>
          <DutchC.TransactionTableControlDate>
            {p.date}
          </DutchC.TransactionTableControlDate>
        </DutchC.TransactionTableControlLeft>
        <DutchC.TransactionTableControlRight>
          <DutchC.TransactionTableControlFilter>
            <DutchC.TransactionTableControlResults>
              {p.resultNumber} results
            </DutchC.TransactionTableControlResults>
            {/* Search input */}
            {p.isSearchable && (
              <SearchInput placeholder="Search" onChange={() => {}} />
            )}
            {/* Select */}
            <CustomSelect
              label="Type"
              options={p.options}
              selectedOption={p.selectedOption}
              onSelect={() => {}}
            />
          </DutchC.TransactionTableControlFilter>
          {/* Pagination */}
          {p.isPaginatiable && <Pagination totalPage={3} />}
        </DutchC.TransactionTableControlRight>
      </DutchC.TransactionTableControlWrapper>
    </>
  );
};

export default TableControl;
