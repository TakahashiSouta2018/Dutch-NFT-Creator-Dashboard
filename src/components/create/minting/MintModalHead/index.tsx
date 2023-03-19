import React from 'react';
import { ModalHead } from '@/common';

interface MintModalHeadProps {
  isDepositFund: boolean;
  activeStep: number;
  onClose: () => void;
  onBack: () => void;
}

const MintModalHead: React.FC<MintModalHeadProps> = ({
  isDepositFund,
  activeStep,
  onClose,
  onBack,
}): JSX.Element => (
  <ModalHead
    icon={isDepositFund ? 'left-arrow' : undefined}
    title={
      isDepositFund
        ? 'Deposit Funds'
        : activeStep === 0
        ? 'Mint Fee'
        : activeStep === 1
        ? 'Approve Wallet Signature'
        : 'Minting'
    }
    onClose={onClose}
    onBack={onBack}
  />
);

export default MintModalHead;
