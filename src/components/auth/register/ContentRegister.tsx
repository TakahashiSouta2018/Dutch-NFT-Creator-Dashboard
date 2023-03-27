import React from 'react';
import { TextInput } from '@/common';
import { Button, OutlineButton } from '@/common';

interface ContentRegisterProps {
  onClose?: () => void;
  onVerification: () => void;
}

const ContentRegister: React.FC<ContentRegisterProps> = ({
  onClose,
  onVerification,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <TextInput
          type="email"
          label="Email"
          helper="All the transactional emails will be sent to the email you enter."
          required
        />
        <TextInput label="Creator Name" />
      </div>
      <div className="flex justify-end gap-4">
        <OutlineButton onClick={onClose}>Cancel</OutlineButton>
        <Button onClick={onVerification}>Verify Email</Button>
      </div>
    </div>
  );
};

export default ContentRegister;
