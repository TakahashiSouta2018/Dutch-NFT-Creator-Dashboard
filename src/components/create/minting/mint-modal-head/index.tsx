import React from 'react';
import { ModalHead } from '@/common';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import useNFTHook from '@/hooks/useNFTHook';

interface MintModalHeadProps {
  isDepositFund: boolean;
}

const MintModalHead: React.FC<MintModalHeadProps> = ({
  isDepositFund,
}): JSX.Element => {
  const { onMintModalClose } = useNFTHook();

  const { activeStep, draftNFTs } = useAppSelector((state) => {
    const { mintModal, draftNFTs } = state.createPageReducer;
    return { activeStep: mintModal.activeStep, draftNFTs };
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
      onClose={() => onMintModalClose(draftNFTs[0].collection)}
      onBack={() => onMintModalClose(draftNFTs[0].collection)}
    />
  );
};

export default MintModalHead;
