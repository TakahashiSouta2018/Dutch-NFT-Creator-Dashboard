import React, { useState } from 'react';
import { shallowEqual } from 'react-redux';

import { Modal } from '@/common';
import { useAppSelector } from '@/redux/store';
import { setDepositModalIsOpen } from '../ducks';
import MintModalHead from './mint-modal-head';
import MintModalBody from './mint-modal-body';

const DepositFundModal = () => {
  const { mintModal } = useAppSelector((state) => {
    const { mintModal } = state.createPageReducer;
    return { mintModal };
  }, shallowEqual);

  return (
    <Modal isOpen={mintModal.isDepositOpen} className="!max-w-xl">
      <MintModalHead isDepositFund={true} />
      <MintModalBody
        isDepositFund={true}
        setDepositFund={() => {
          setDepositModalIsOpen(!mintModal.isDepositOpen);
        }}
      />
    </Modal>
  );
};

export default DepositFundModal;
