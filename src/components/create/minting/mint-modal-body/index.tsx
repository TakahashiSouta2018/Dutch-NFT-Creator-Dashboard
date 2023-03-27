import React, { useState } from 'react';
import { ModalBody } from '@/common';
import DepositFunds from './deposit-funds';
import Minting from './minting-content';

interface MintModalBodyProps {
  isDepositFund: boolean;
  setDepositFund: () => void;
}

const MintModalBody: React.FC<MintModalBodyProps> = ({
  isDepositFund,
  setDepositFund,
}): JSX.Element => {

  return (
    <ModalBody>
      {isDepositFund ? (
        <DepositFunds
          onBalance={() => {
            setDepositFund();
          }}
        />
      ) : (
        <Minting
          isDepositFund={isDepositFund}
          setDepositFund={setDepositFund}
        />
      )}
    </ModalBody>
  );
};
export default MintModalBody;
