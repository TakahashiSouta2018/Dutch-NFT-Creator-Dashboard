import React, { useState } from 'react';

import { Modal } from '@/common';
import MintModalHead from './mint-modal-head';
import MintModalBody from './mint-modal-body';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';

interface MintingModalProps {
  className?: string;
}

const MintingModal: React.FC<MintingModalProps> = ({
  className,
}): JSX.Element => {
  const [isDepositFund, setDepositFund] = useState(false);

  const { mintModal } = useAppSelector((state) => {
    const { mintModal } = state.createPageReducer;
    return { mintModal };
  }, shallowEqual);

  return (
    <Modal isOpen={mintModal.isOpen} className={className}>
      <MintModalHead isDepositFund={isDepositFund} />
      <MintModalBody
        isDepositFund={isDepositFund}
        setDepositFund={() => {
          setDepositFund(!isDepositFund);
        }}
      />
    </Modal>
  );
};

export default MintingModal;
