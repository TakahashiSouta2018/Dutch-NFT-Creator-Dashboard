import React, { useState } from 'react';
import { Modal, ModalHead, ModalBody } from '@/common';
import Verification from './ContentVerification';
import Register from './ContentRegister';

interface RegisterHomeProps {
  onClose?: () => void;
  isRegister: boolean;
}

const RegisterHome: React.FC<RegisterHomeProps> = ({
  onClose,
  isRegister,
}): JSX.Element => {
  const [showVerification, setShowVerification] = useState(false);

  const handleClose = () => {
    onClose && onClose();
    setShowVerification(false);
  };
  return (
    <Modal isOpen={isRegister} className="max-w-xl">
      <ModalHead
        title={showVerification ? 'Email Verification' : 'Register'}
        onClose={handleClose}
      />
      <ModalBody>
        {showVerification ? (
          <Verification />
        ) : (
          <Register
            onClose={handleClose}
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
