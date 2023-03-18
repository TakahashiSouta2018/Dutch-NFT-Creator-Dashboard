import React from 'react';
import Image from 'next/image';
import { Modal, ModalHead, ModalBody } from '@/common';
import { Stepper } from '@/common';
import { StepType, TransactionType } from '@/types';
import * as DutchC from './style';
import LoadingIcon from '@/assets/loading.png';
import TransactionList from '@/common/TransactionList';
import { Button } from '@/common';

interface MintingType {
  steps: StepType[];
  transActions: TransactionType[];
  onClose: () => void;
}

function IsDone(transActions: TransactionType[]) {
  return (
    transActions.length ===
    transActions.filter((action) => action.status === 2).length
  );
}

const Minting: React.FC<MintingType> = ({ steps, transActions, onClose }) => {
  return (
    <Modal>
      <ModalHead title="Minting" onClose={onClose} />
      <ModalBody>
        <DutchC.ContentWrapper>
          <Stepper steps={steps} />
          <TransactionList transActions={transActions} />
          <DutchC.CancelButtionWrapper>
            {IsDone(transActions) ? (
              <Button>Done</Button>
            ) : (
              <Button leftIcon="close" disabled>
                Cancel Minting
              </Button>
            )}
          </DutchC.CancelButtionWrapper>
        </DutchC.ContentWrapper>
      </ModalBody>
    </Modal>
  );
};

export default Minting;
