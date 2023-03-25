import React from 'react';
import Image from 'next/image';
import AvatarIcon from '@/assets/avatar.png';
import ProfileCardTemplate from '../shared/profile/ProfileCardTemplate';
import ProfileActions from '../shared/profile/ProfileActions';
import { TextInput } from '@/common';
import { InputLabel } from '@/common/Input/styles';
import CheckIcon from '@/assets/check.png';

import * as Icons from '@/common/Icons';
import * as DutchC from './styles';

const ProfileContent: React.FC = () => {
  return (
    <DutchC.ProfileWrapper>
      <DutchC.ProfileInner>
        <ProfileCardTemplate title="Profile Setting">
          <div className="flex gap-4">

          </div>
        </ProfileCardTemplate>
        <ProfileCardTemplate title="Connect Your Socials">
          <div></div>
        </ProfileCardTemplate>
        <ProfileCardTemplate title="Email Notification Settings">
          <div></div>
        </ProfileCardTemplate>
        <ProfileActions />
      </DutchC.ProfileInner>
    </DutchC.ProfileWrapper>
  );
};

export default ProfileContent;
