import React from 'react';
import { Stepper } from '@/common';
import ContentMintFee from './ContentMintFee';
import ContentMinting from './ContentMinting';

interface MintModalProps {
  isDepositFund: boolean;
  activeStep: number;
  setDepositFund: () => void;
  onClose: () => void;
  setActiveStep: (id: number) => void;
  balance: boolean;
}
const Minting: React.FC<MintModalProps> = ({
  isDepositFund,
  activeStep,
  setDepositFund,
  setActiveStep,
  onClose,
  balance,
}): JSX.Element => {
  return (
    <div className="flex flex-col gap-6">
      <Stepper activeStep={activeStep} />
      <div>
        {activeStep === 0 ? (
          <ContentMintFee
            isDepositFund={isDepositFund}
            setActiveStep={setActiveStep}
            setDepositFund={setDepositFund}
            balance={balance}
            onClose={onClose}
          />
        ) : (
          <ContentMinting
            setActiveStep={setActiveStep}
            activeStep={activeStep}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};
export default Minting;
