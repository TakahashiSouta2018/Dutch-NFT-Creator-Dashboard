import React from 'react';
import * as DutchC from './styles';
import Image from 'next/image';
import TransactionList from '@/common/TransactionList';
import LoadingIcon from '@/assets/loading.png';
import MintingButton from './MintingButton';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import useNFTHook from '@/hooks/useNFTHook';

interface ContentMintingPropsI {
  isFinishedMinting: boolean;
}

const ContentMinting: React.FC<ContentMintingPropsI> = ({
  isFinishedMinting,
}) => {
  const { onMintModalClose } = useNFTHook();

  const { activeStep, selectedDraftNFTs } = useAppSelector((state) => {
    const { mintModal, selectedDraftNFTs } = state.createPageReducer;
    return { activeStep: mintModal.activeStep, selectedDraftNFTs };
  }, shallowEqual);

  return (
    <DutchC.WalletSignatureWrapper>
      {activeStep === 1 && (
        <DutchC.TransactionTextWrapper>
          <Image src={LoadingIcon} alt="loading" className="h-5 w-5" />
          <div>
            <DutchC.TextBold>Approve Wallet Transactions</DutchC.TextBold>
            <DutchC.TextNormal>
              Approve the following transactions in your wallet.
            </DutchC.TextNormal>
          </div>
        </DutchC.TransactionTextWrapper>
      )}
      <TransactionList />
      <DutchC.CancelButtionWrapper>
        <MintingButton
          activeStep={activeStep}
          isFinished={isFinishedMinting}
          onClose={() => onMintModalClose(selectedDraftNFTs[0].collection)}
        />
      </DutchC.CancelButtionWrapper>
    </DutchC.WalletSignatureWrapper>
  );
};

export default ContentMinting;
