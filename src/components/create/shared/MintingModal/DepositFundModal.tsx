import React, { useState } from 'react';
import { shallowEqual } from 'react-redux';

import { Modal } from '@/common';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import MintModalHead from './mint-modal-head';
import MintModalBody from './mint-modal-body';
import { setDepositModalIsOpen } from '../../ducks';

const DepositFundModal = () => {
  const dispatch = useAppDispatch();

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
          dispatch(setDepositModalIsOpen(!mintModal.isDepositOpen));
        }}
      />
    </Modal>
  );
};

export default DepositFundModal;
