import { Toggle } from '@/common';
import { InputLabel } from '@/common/Input/styles';
import React from 'react';
import * as DutchC from './styles';

const ProfileEmailNotification: React.FC = () => {
  return (
    <div className="flex justify-between py-3">
      <div className="flex flex-col gap-0.5 text-sm font-medium">
        <InputLabel className="text-black">
          Receive the new upcoming features notifications
        </InputLabel>
        <InputLabel className="text-black/50 dark:text-white/50">
          This is lorem ipsum place holder text which will explain above title
        </InputLabel>
      </div>
      <Toggle />
    </div>
  );
};

export default ProfileEmailNotification;
