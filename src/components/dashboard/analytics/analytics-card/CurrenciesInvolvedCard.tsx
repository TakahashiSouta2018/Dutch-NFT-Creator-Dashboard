import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { IArrowTrendingUp, IArrowTrendingDown } from '@/common';
import { LRCIconSelector } from '../analytics-tables/lrc-icon-selector';

import * as Dutch0x from './styles';

interface CurrenciesInvolvedCardProps {
  data: {
    token?: string;
    tokenId: string;
    value: number;
    price: number;
  }[];
  className?: string;
}

const CurrenciesInvolvedCard: React.FC<CurrenciesInvolvedCardProps> = ({
  data,
  className,
}) => {
  return (
    <Dutch0x.AnalyticsCardWrapper className={className}>
      <p className="text-sm text-black/50">Currencies Involved</p>
      <div>
        {data.map((item, index) => (
          <>
            <div className="flex gap-1 items-center justify-between">
              <div className="w-[50px] ">{item?.token}</div>
              <div className="flex items-center gap-2">
                <LRCIconSelector id={item.tokenId} />
                {item.value}
              </div>
              <div className="text-opacity-50 text-right">${item.price}</div>
            </div>
          </>
        ))}
      </div>
    </Dutch0x.AnalyticsCardWrapper>
  );
};

export default CurrenciesInvolvedCard;
