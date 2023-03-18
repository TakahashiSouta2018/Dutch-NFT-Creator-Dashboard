import React from 'react';
import Image from 'next/image';
import { Modal, ModalHead, ModalBody } from '@/common';
import { Stepper } from '@/common';
import { StepType, TransactionType } from '@/types';
import * as DutchC from './style';
import LoadingIcon from '@/assets/loading.png';
import TransactionList from '@/common/TransactionList';
import { Button } from '@/common';

interface ApproveType {
  steps: StepType[];
  transActions: TransactionType[];
  onMinting: () => void;
  onClose: () => void;
}

const Approve: React.FC<ApproveType> = ({
  steps,
  transActions,
  onMinting,
  onClose,
}) => {
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     onMinting();
  //   }, 3000);
  // }, [onMinting]);
  return (
    <Modal>
      <ModalHead title="Approve Wallet Signature" onClose={onClose} />
      <ModalBody>
        <DutchC.ApproveContentWrapper>
          <DutchC.TransactionWrapper>
            <Image src={LoadingIcon} alt="loading" className="h-5 w-5" />
            <DutchC.TransactionTextWrapper>
              <DutchC.TextBold>Approve Wallet Transactions</DutchC.TextBold>
              <DutchC.TextNormal>
                Approve the following transactions in your wallet.
              </DutchC.TextNormal>
            </DutchC.TransactionTextWrapper>
          </DutchC.TransactionWrapper>
          <TransactionList transActions={transActions} />
          <DutchC.CancelButtionWrapper>
            <Button leftIcon="close" disabled>
              Cancel Minting
            </Button>
          </DutchC.CancelButtionWrapper>
        </DutchC.ApproveContentWrapper>
      </ModalBody>
    </Modal>
  );
};

export default Approve;
