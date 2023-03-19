import React, { useState } from 'react';

import { Modal } from '@/common';
import MintModalHead from './MintModalHead';
import MintModalBody from './MintModalBody';

interface MintingModalProps {
  onClose: () => void;
  onBack: () => void;
}

const MintingModal: React.FC<MintingModalProps> = ({
  onClose,
  onBack,
}): JSX.Element => {
  const [isDepositFund, setDepositFund] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Modal>
      <MintModalHead
        isDepositFund={isDepositFund}
        activeStep={activeStep}
        onClose={onClose}
        onBack={onBack}
      />
      <MintModalBody
        isDepositFund={isDepositFund}
        activeStep={activeStep}
        setDepositFund={() => {
          setDepositFund(!isDepositFund);
        }}
        setActiveStep={(step: number) => {
          setActiveStep(step);
        }}
        onClose={onClose}
      />
    </Modal>
  );
};

export default MintingModal;
