import React from 'react';
import Image, { StaticImageData } from 'next/image';
import WyreIcon from '@/assets/wyre.svg';
import RampIcon from '@/assets/ramp.svg';

import * as DutchC from './styles';
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
    <DutchC.DepositFundMethodWrapper showCard={showCard}>
      <DutchC.DepositFundMethodHead onClick={onCard}>
        <div>
          <Image src={icon} alt={title} width={24} height={24} />
        </div>
        <DutchC.DepositFundMethod>
          <DutchC.TextDepositBold>{title}</DutchC.TextDepositBold>
          <DutchC.TextDepositSmall>{description}</DutchC.TextDepositSmall>
        </DutchC.DepositFundMethod>
        {showCard && type === 'card' && (
          <DutchC.IconCheck>
            <Icons.ICheckCircle size="large" />
          </DutchC.IconCheck>
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
