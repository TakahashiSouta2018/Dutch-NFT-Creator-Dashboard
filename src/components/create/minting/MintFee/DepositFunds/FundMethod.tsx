import React from 'react';
import Image, { StaticImageData } from 'next/image';
import WyreIcon from '@/assets/wyre.svg';
import RampIcon from '@/assets/ramp.svg';

import * as DutchC from './style';
import * as Icons from '@/common/Icons';
import DepositContentCard from './Card';

interface FundMethodProps {
  icon: StaticImageData;
  type: string;
  title: string;
  description: string;
  onCard?: () => void;
  showCard?: boolean;
  onBalance?: () => void;
}

const FundMethod: React.FC<FundMethodProps> = ({
  icon,
  type,
  title,
  description,
  onCard,
  showCard,
  onBalance,
}) => {
  return (
    <DutchC.DepositFundMethodWrapper
      style={
        showCard
          ? { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
          : { backgroundColor: 'white' }
      }
    >
      <DutchC.DepositFundMethodHead onClick={onCard}>
        <DutchC.DepositImageWrapper>
          <Image src={icon} alt={title} width={24} height={24} />
        </DutchC.DepositImageWrapper>
        <DutchC.DepositFundMethod>
          <DutchC.TextDepositBold>{title}</DutchC.TextDepositBold>
          <DutchC.TextDepositSmall>{description}</DutchC.TextDepositSmall>
        </DutchC.DepositFundMethod>
        {showCard && type === 'card' && (
          <div className="absolute right-0 top-0">
            <Icons.ICheckCircle size="large" />
          </div>
        )}
      </DutchC.DepositFundMethodHead>
      {showCard && type === 'card' && (
        <DutchC.DepositFundMethodContent>
          <DepositContentCard
            icon={WyreIcon}
            title="Buy with Wyre"
            onBalance={onBalance}
          />
          <DepositContentCard
            icon={RampIcon}
            title="Buy with Ramp"
            onBalance={onBalance}
          />
        </DutchC.DepositFundMethodContent>
      )}
    </DutchC.DepositFundMethodWrapper>
  );
};

export default FundMethod;
