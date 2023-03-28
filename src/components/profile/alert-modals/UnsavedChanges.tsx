import React from 'react';
import { Modal, ModalHead, ModalBody, OutlineButton, Button } from '@/common';

import * as DutchC from './styles';

interface UnsavedChangesProps {
  isUnsavedChanges: boolean;
  onUnsavedChanges: () => void;
}

const UnsavedChanges: React.FC<UnsavedChangesProps> = ({
  isUnsavedChanges,
  onUnsavedChanges,
}) => {
  return (
    <Modal isOpen={isUnsavedChanges} className="max-w-xl">
      <ModalHead title="Unsaved Changes" onClose={onUnsavedChanges} />
      <ModalBody>
        <DutchC.AlertInner>
          <p>
            There are some changes which are not saved, What do you want to do
            with changes?
          </p>
          <DutchC.ActionsWrapper>
            <OutlineButton onClick={onUnsavedChanges}>
              Discard Changes
            </OutlineButton>
            <Button>Save Changes</Button>
          </DutchC.ActionsWrapper>
        </DutchC.AlertInner>
      </ModalBody>
    </Modal>
  );
};

export default UnsavedChanges;
