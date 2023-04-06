import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { IArrowTrendingUp, IArrowTrendingDown } from '@/common';

interface AnalyticsCardProps {
  title: string;
  transActionsCount?: number;
  eth?: number;
  usd?: number;
  percentage: number;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  transActionsCount,
  eth,
  usd,
  percentage,
}) => {
  const [isArrorDown, setArrowDown] = useState(false);

  useEffect(() => {
    if (percentage < 0) {
      setArrowDown(true);
    }
  }, [percentage]);

  return (
    <div className="card px-4 py-3 flex-1 border border-black/10 flex flex-col gap-2">
      <p className="text-sm text-black/50">{title}</p>
      {title === 'Transactions Count' ? (
        <div className="flex-grow font-black">{transActionsCount}</div>
      ) : (
        <div>
          <div className="flex gap-1">
            <div className=" font-black w-[50px] ">ETH</div>
            <div>{eth}</div>
          </div>
          <div className="flex gap-1">
            <div className=" font-black w-[50px] ">USD</div>
            <div>{usd}</div>
          </div>
        </div>
      )}
      <div className="flex gap-1 text-sm items-center">
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
      </div>
    </div>
  );
};

export default AnalyticsCard;
