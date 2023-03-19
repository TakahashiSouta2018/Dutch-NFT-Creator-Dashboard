import React, { useState } from 'react';
import { ModalBody } from '@/common';
import DepositFunds from './DepositFunds';
import MintModal from './MintModal';

interface MintModalBodyProps {
  isDepositFund: boolean;
  activeStep: number;
  setDepositFund: () => void;
  onClose: () => void;
  setActiveStep: (id: number) => void;
}

const MintModalBody: React.FC<MintModalBodyProps> = ({
  isDepositFund,
  activeStep,
  setDepositFund,
  setActiveStep,
  onClose,
}): JSX.Element => {
  const [balance, setBalance] = useState(false);

  return (
    <ModalBody>
      {isDepositFund ? (
        <DepositFunds
          onBalance={() => {
            setBalance(true);
            setDepositFund();
          }}
        />
      ) : (
        <MintModal
          isDepositFund={isDepositFund}
          activeStep={activeStep}
          setDepositFund={setDepositFund}
          setActiveStep={setActiveStep}
          balance={balance}
          onClose={onClose}
        />
      )}
    </ModalBody>
  );
};
export default MintModalBody;
