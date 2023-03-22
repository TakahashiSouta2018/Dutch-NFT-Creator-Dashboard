import React, { useState } from 'react';
import * as DutchC from './styles';

import FundMethod from './FundMethod';

import CardIcon from '@/assets/card.png';
import ExchangeIcon from '@/assets/exchange.png';
import FriendsIcon from '@/assets/friends.png';

interface DepositFundsProps {
  onBalance: () => void;
}

const DepositFunds: React.FC<DepositFundsProps> = ({
  onBalance,
}): JSX.Element => {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <FundMethod
        icon={CardIcon}
        title="Buy ETH with a card"
        type="card"
        description="Buy Ether on L2 using Wyre or Ramp"
        onCard={() => {
          setShowCard(!showCard);
        }}
        showCard={showCard}
        onBalance={onBalance}
      />
      <FundMethod
        icon={ExchangeIcon}
        type="wallet"
        title="Deposit ETH from your wallet"
        description="Transfer Ether from your L1 to L2 account"
      />
      <FundMethod
        icon={FriendsIcon}
        type="friend"
        title="Ask a friend"
        description="Ask a friend who is already on L2 to transfer ETH to your account"
      />
    </div>
  );
};
export default DepositFunds;
