import React from 'react';
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
  const [showVerification, setShowVerification] = React.useState(false);

  return (
    <Modal isOpen={isRegister} className="max-w-xl">
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
