import React, { useState } from 'react';

import { Button } from '../Button';

import * as DutchC from './styles';

import * as Icons from '@/common/Icons';

export const Pagination: React.FC<{
  totalPage?: number;
  onChange: (value: number) => void;
}> = ({ totalPage = 1, onChange }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const handlePageChange =
    (step: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      let newPageNum = Math.max(pageNumber + step, 1);
      setPageNumber(Math.min(newPageNum, totalPage));
      onChange(newPageNum);
    };

  return (
    <DutchC.PaginationWrapper className=" min-w">
      <DutchC.PaginationLabel>Page</DutchC.PaginationLabel>
      {/* pre button */}
      <DutchC.PaginationButton
        onClick={handlePageChange(-1)}
        disabled={pageNumber === 1}
      >
        <Icons.IChevronLeft />
      </DutchC.PaginationButton>
      <DutchC.PaginationCurrentPage>{pageNumber}</DutchC.PaginationCurrentPage>
      {/* next button */}
      <DutchC.PaginationButton
        onClick={handlePageChange(1)}
        disabled={pageNumber === totalPage}
      >
        <Icons.IChevronRight />
      </DutchC.PaginationButton>
    </DutchC.PaginationWrapper>
  );
};
