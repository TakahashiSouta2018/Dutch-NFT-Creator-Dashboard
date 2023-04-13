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
  percentage?: number;
  className?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  transActionsCount,
  eth,
  usd,
  lrc,
  percentage,
  className,
}) => {
  const [isArrorDown, setArrowDown] = useState(false);

  useEffect(() => {
    if (percentage && percentage < 0) {
      setArrowDown(true);
    }
  }, [percentage]);

  return (
    <Dutch0x.AnalyticsCardWrapper className={className}>
      <p className="text-sm text-black/50 dark:font-white">{title}</p>
      {title === 'Transactions Count' ? (
        <div className="flex-grow text-black dark:text-white">
          {transActionsCount ? transActionsCount : '-'}
        </div>
      ) : (
        <div>
          <div className="flex gap-1">
            <div className=" text-black dark:text-white w-[50px] ">ETH</div>
            <div>{eth ? eth : '-'}</div>
          </div>
          {!!lrc && (
            <div className="flex gap-1">
              <div className=" text-black dark:text-white w-[50px] ">LRC</div>
              <div>{lrc ? lrc : '-'}</div>
            </div>
          )}

          <div className="flex gap-1">
            <div className=" text-black dark:text-white w-[50px] ">USD</div>
            <div>{usd ? usd : '-'}</div>
          </div>
        </div>
      )}
      {percentage && (
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
      )}
    </Dutch0x.AnalyticsCardWrapper>
  );
};

export default AnalyticsCard;
