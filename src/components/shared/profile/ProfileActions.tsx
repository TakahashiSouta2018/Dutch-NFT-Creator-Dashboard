import React, { useState } from 'react';
import { Button, OutlineButton } from '@/common';
import {
  UnsavedChanges,
  DeleteAccount,
} from '@/components/profile/alert-modals';

import * as DutchC from './styles';

const ProfileActions: React.FC = () => {
  const [isUnsavedChanges, setUnsavedChanges] = useState(false);
  const [isDeleteAccount, setDeleteAccount] = useState(false);
  return (
    <DutchC.ProfileActionsWrapper>
      <OutlineButton
        onClick={() => {
          setDeleteAccount(true);
        }}
      >
        Delete Account
      </OutlineButton>
      <DutchC.ProfileActionsRight>
        <OutlineButton
          onClick={() => {
            setUnsavedChanges(true);
          }}
        >
          Discard Changes
        </OutlineButton>
        <Button
          onClick={() => {
            setUnsavedChanges(true);
          }}
        >
          Save Changes
        </Button>
      </DutchC.ProfileActionsRight>
      <UnsavedChanges
        isUnsavedChanges={isUnsavedChanges}
        onUnsavedChanges={() => {
          setUnsavedChanges(false);
        }}
      />
      <DeleteAccount
        isDeleteAccount={isDeleteAccount}
        onDeleteAccount={() => {
          setDeleteAccount(false);
        }}
      />
    </DutchC.ProfileActionsWrapper>
  );
};

export default ProfileActions;
