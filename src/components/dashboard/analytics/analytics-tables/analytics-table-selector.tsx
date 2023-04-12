import React from 'react';

import {
  TableViewAllTrans,
  TableViewPrimarySales,
  TableViewRoyalities,
  TableViewTrades,
  TableViewTransfers,
} from './table-views';

interface TableSelectProps {
  currentTransOption: {
    id: number;
    slug: string;
  };
}

const AnalyticsTableSelector: React.FC<TableSelectProps> = ({
  currentTransOption,
}) => {
  return (
    <>
      {/* All Transactions */}
      {currentTransOption.slug === 'All Transactions' && <TableViewAllTrans />}
      {/* trades */}
      {currentTransOption.slug === 'Trades' && <TableViewTrades />}
      {/* primary sales */}
      {currentTransOption.slug === 'Primary Sales' && <TableViewPrimarySales />}
      {/* royalities */}
      {currentTransOption.slug === 'Royalties' && <TableViewRoyalities />}
      {/* transfer */}
      {currentTransOption.slug === 'Transfers' && <TableViewTransfers />}
    </>
  );
};

export default AnalyticsTableSelector;
