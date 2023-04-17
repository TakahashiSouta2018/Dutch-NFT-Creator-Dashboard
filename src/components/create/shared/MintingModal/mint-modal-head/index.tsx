import React from 'react';
import { ModalHead } from '@/common';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import useNFTHook from '@/hooks/useNFTHook';
import {
  setDraftNFTs,
  setMintModalIsOpen,
  setSelectedDraftNFTs,
} from '@/components/create/ducks';

interface MintModalHeadProps {
  isDepositFund: boolean;
}

const MintModalHead: React.FC<MintModalHeadProps> = ({
  isDepositFund,
}): JSX.Element => {
  const { onMintModalClose } = useNFTHook();
  const dispatch = useAppDispatch();

  const { activeStep, selectedDraftNFTs } = useAppSelector((state) => {
    const { mintModal, selectedDraftNFTs } = state.createPageReducer;
    return { activeStep: mintModal.activeStep, selectedDraftNFTs };
  }, shallowEqual);

  return (
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
      onClose={() => dispatch(setMintModalIsOpen(false))}
      onBack={() => onMintModalClose(selectedDraftNFTs[0].collection)}
    />
  );
};

export default MintModalHead;
