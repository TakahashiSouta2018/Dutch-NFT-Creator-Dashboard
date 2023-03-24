import React, { useState } from 'react';

import { Modal } from '@/common';
import MintModalHead from './mint-modal-head';
import MintModalBody from './mint-modal-body';

interface MintingModalProps {
  onClose: () => void;
  openModal: boolean;
  className?: string;
}

const MintingModal: React.FC<MintingModalProps> = ({
  onClose,
  openModal,
  className,
}): JSX.Element => {
  const [isDepositFund, setDepositFund] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const onCloseModal = () => {
    setActiveStep(0);
    onClose();
  };

  return (
    <Modal isOpen={openModal} className={className}>
      <MintModalHead
        isDepositFund={isDepositFund}
        activeStep={activeStep}
        onClose={onCloseModal}
        onBack={onCloseModal}
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
        onClose={onCloseModal}
      />
    </Modal>
  );
};

export default MintingModal;
