import React from 'react';
import { Modal, ModalHead, ModalBody } from '@/common';
import Verification from './ContentVerification';
import Register from './ContentRegister';

interface RegisterHomeProps {
  onClose?: () => void;
  isOpen: boolean;
}

const RegisterHome: React.FC<RegisterHomeProps> = ({
  onClose,
  isOpen,
}): JSX.Element => {
  const [showVerification, setShowVerification] = React.useState(false);

  return (
    <Modal isOpen={isOpen}>
      <ModalHead
        title={showVerification ? 'Email Verification' : 'Register'}
        onClose={onClose}
      />
      <ModalBody>
        {showVerification ? (
          <Verification />
        ) : (
          <Register
            onClose={onClose}
            onVerification={() => {
              setShowVerification(true);
            }}
          />
        )}
      </ModalBody>
    </Modal>
  );
};

export default RegisterHome;
