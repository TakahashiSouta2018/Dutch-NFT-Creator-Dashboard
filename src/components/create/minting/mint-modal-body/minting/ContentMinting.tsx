import React, { useEffect } from 'react';
import * as DutchC from './style';
import Image from 'next/image';
import TransactionList from '@/common/TransactionList';
import { Button } from '@/common';
import LoadingIcon from '@/assets/loading.png';
import LycheeIcon from '@/assets/Lychee.gif';
import MilkIcon from '@/assets/Milk.gif';
import { TransactionType } from '@/types';
import MintingButton from './MintingButton';

interface ContentWalletSignatureProps {
  setActiveStep: (id: number) => void;
  activeStep: number;
  onClose: () => void;
}

const transActions = [
  {
    id: '01',
    img: MilkIcon,
    title: 'Milk',
    status: 2,
  },
  {
    id: '02',
    img: LycheeIcon,
    title: 'Lychee',
    status: 1,
  },
];

const ContentWalletSignature: React.FC<ContentWalletSignatureProps> = ({
  setActiveStep,
  activeStep,
  onClose,
}): JSX.Element => {
  useEffect(() => {
    setTimeout(() => {
      setActiveStep(2);
    }, 3000);
  });

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
      <TransactionList transActions={transActions} />
      <DutchC.CancelButtionWrapper>
        <MintingButton
          activeStep={activeStep}
          isFinished={isFinished(transActions)}
          onClose={onClose}
        />
      </DutchC.CancelButtionWrapper>
    </DutchC.WalletSignatureWrapper>
  );
};

export function isFinished(transActions: TransactionType[]) {
  return (
    transActions.filter((action) => action.status === 2 || action.status === 3)
      .length === transActions.length
  );
}

export default ContentWalletSignature;
