import React from 'react';
import { Modal, ModalHead, ModalBody } from '@/common';
import { Button, OutlineButton } from '@/common';
import { TextInput } from '@/common';
import VerifyModal from './Verify';

const RegisterHome = () => {
  const [showVerifyModal, setShowVerifyModal] = React.useState(false);

  if (!showVerifyModal)
    return (
      <Modal>
        <ModalHead title="Register" />
        <ModalBody>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <TextInput
                label="Email"
                helper="All the transactional emails will be sent to the email you enter."
              />
              <TextInput label="Creator Name" />
            </div>
            <div className="flex justify-end gap-4">
              <OutlineButton>Cancel</OutlineButton>
              <Button
                onClick={() => {
                  setShowVerifyModal(true);
                }}
              >
                Verify Email
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  else return <VerifyModal />;
};

export default RegisterHome;
