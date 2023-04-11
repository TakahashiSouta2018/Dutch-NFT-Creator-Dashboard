import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { IArrowTrendingUp, IArrowTrendingDown } from '@/common';

import * as Dutch0x from './styles';

interface AnalyticsCardProps {
  title: string;
  transActionsCount?: number;
  eth?: number;
  lrc?: number;
  usd?: number;
  percentage: number;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  transActionsCount,
  eth,
  usd,
  lrc,
  percentage,
}) => {
  const [isArrorDown, setArrowDown] = useState(false);

  useEffect(() => {
    if (percentage < 0) {
      setArrowDown(true);
    }
  }, [percentage]);

  return (
    <Dutch0x.AnalyticsCardWrapper>
      <p className="text-sm text-black/50">{title}</p>
      {title === 'Transactions Count' ? (
        <div className="flex-grow font-black">{transActionsCount}</div>
      ) : (
        <div>
          <div className="flex gap-1">
            <div className=" font-black w-[50px] ">ETH</div>
            <div>{eth}</div>
          </div>
          {!!lrc && (
            <div className="flex gap-1">
              <div className=" font-black w-[50px] ">LRC</div>
              <div>{lrc}</div>
            </div>
          )}

          <div className="flex gap-1">
            <div className=" font-black w-[50px] ">USD</div>
            <div>{usd}</div>
          </div>
        </div>
      )}
      <Dutch0x.AnalyticsCardTrending>
        {isArrorDown ? (
          <IArrowTrendingDown color="accent-red" />
        ) : (
          <IArrowTrendingUp color="accent-green" />
        )}
        <p
          className={clsx(
            isArrorDown ? 'text-accent-red' : 'text-accent-green'
          )}
        >
          {percentage}%
        </p>
        <p className="text-black">than last year</p>
      </Dutch0x.AnalyticsCardTrending>
    </Dutch0x.AnalyticsCardWrapper>
  );
};

export default AnalyticsCard;
