import React from 'react';
import { Modal, ModalHead, ModalBody, OutlineButton, Button } from '@/common';

import * as DutchC from './styles';

interface DeleteAccountProps {
  isDeleteAccount: boolean;
  onDeleteAccount: () => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({
  isDeleteAccount,
  onDeleteAccount,
}) => {
  return (
    <Modal isOpen={isDeleteAccount} className="max-w-xl">
      <ModalHead title="Delete Account" onClose={onDeleteAccount} />
      <ModalBody>
        <DutchC.AlertInner>
          <p>
            All the NFTs will be sent back to source account, Are you sure you
            want to delete the DUTCH0x account?
          </p>
          <DutchC.ActionsWrapper>
            <OutlineButton onClick={onDeleteAccount}>No</OutlineButton>
            <Button className="bg-dark-red dark:bg-accent-red text-white dark:text-white">
              Yes, delete my account
            </Button>
          </DutchC.ActionsWrapper>
        </DutchC.AlertInner>
      </ModalBody>
    </Modal>
  );
};

export default DeleteAccount;
