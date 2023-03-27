import React from 'react';
import WyreIcon from '@/assets/wyre.png';
import RampIcon from '@/assets/ramp.png';

import * as DutchC from './styles';
import * as Icons from '@/common/Icons';
import DepositContentCard from './Card';
import { useTheme } from 'next-themes';

interface FundMethodProps {
  type: string;
  title: string;
  description: string;
  onCard?: () => void;
  showCard?: boolean;
}

const FundMethod: React.FC<FundMethodProps> = ({
  type,
  title,
  description,
  onCard,
  showCard,
}) => {
  const { theme } = useTheme();
  return (
    <DutchC.DepositFundMethodWrapper showCard={showCard}>
      <DutchC.DepositFundMethodHead onClick={onCard}>
        <div>
          {type === 'card' && (
            <Icons.ICustomCard
              currentColor={theme == 'dark' ? 'white' : 'black'}
            />
          )}
          {type === 'wallet' && (
            <Icons.ICustomExchange
              currentColor={theme == 'dark' ? 'white' : 'black'}
            />
          )}
          {type === 'friends' && (
            <Icons.ICustomFriends
              currentColor={theme == 'dark' ? 'white' : 'black'}
            />
          )}
        </div>
        <DutchC.DepositFundMethod>
          <DutchC.TextDepositBold>{title}</DutchC.TextDepositBold>
          <DutchC.TextDepositSmall>{description}</DutchC.TextDepositSmall>
        </DutchC.DepositFundMethod>
        {showCard && type === 'card' && (
          <DutchC.IconCheck>
            <Icons.ICheckCircle
              size="large"
              color={theme === 'dark' ? 'white' : 'black'}
            />
          </DutchC.IconCheck>
        )}
      </DutchC.DepositFundMethodHead>
      {showCard && type === 'card' && (
        <DutchC.DepositFundMethodContent>
          <DepositContentCard icon={WyreIcon} title="Buy with Wyre" />
          <DepositContentCard icon={RampIcon} title="Buy with Ramp" />
        </DutchC.DepositFundMethodContent>
      )}
    </DutchC.DepositFundMethodWrapper>
  );
};

export default FundMethod;
