import React from 'react';
import { Modal, ModalHead, ModalBody, OutlineButton, Button } from '@/common';

import * as DutchC from './styles';

interface LogoutProps {
  isLogout: boolean;
  onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ isLogout, onLogout }) => {
  return (
    <Modal isOpen={isLogout} className="max-w-xl">
      <ModalHead title="Logout" onClose={onLogout} />
      <ModalBody>
        <DutchC.AlertInner>
          <p>Are you logging out?</p>
          <DutchC.ActionsWrapper>
            <OutlineButton onClick={onLogout}>No</OutlineButton>
            <Button>Yes, Logout</Button>
          </DutchC.ActionsWrapper>
        </DutchC.AlertInner>
      </ModalBody>
    </Modal>
  );
};

export default Logout;
