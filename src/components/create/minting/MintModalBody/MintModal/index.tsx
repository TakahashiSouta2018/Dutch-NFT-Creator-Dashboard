import React from 'react';
import { Stepper } from '@/common';
import ContentMintFee from './Content_MintFee';
import ContentMinting from './Content_Minting';

interface MintModalProps {
  isDepositFund: boolean;
  activeStep: number;
  setDepositFund: () => void;
  onClose: () => void;
  setActiveStep: (id: number) => void;
  balance: boolean;
}
const MintModal: React.FC<MintModalProps> = ({
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
export default MintModal;
