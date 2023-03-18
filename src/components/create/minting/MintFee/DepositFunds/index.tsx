import React, { useState } from 'react';
import { Modal, ModalHead, ModalBody } from '@/common';
import FundMethod from './FundMethod';
import CardIcon from '@/assets/card.png';
import ExchangeIcon from '@/assets/exchange.png';
import FriendsIcon from '@/assets/friends.png';

import * as DutchC from '../style';

interface DepositFundsProps {
  onBack: () => void;
  onBalance: () => void;
}

const DepositFunds: React.FC<DepositFundsProps> = ({ onBack, onBalance }) => {
  const [showCard, setShowCard] = useState(false);
  return (
    <Modal>
      <ModalHead icon="left-arrow" title="Deposit Funds" onBack={onBack} />
      <ModalBody>
        <DutchC.DepositFundWrapper>
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
        </DutchC.DepositFundWrapper>
      </ModalBody>
    </Modal>
  );
};

export default DepositFunds;
