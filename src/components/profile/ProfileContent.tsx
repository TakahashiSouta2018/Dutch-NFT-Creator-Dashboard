import React from 'react';
import Image from 'next/image';
import AvatarIcon from '@/assets/avatar.png';
import ProfileCardTemplate from '../shared/profile/ProfileCardTemplate';
import ProfileActions from '../shared/profile/ProfileActions';
import { TextInput } from '@/common';
import { InputLabel } from '@/common/Input/styles';
import CheckIcon from '@/assets/check.png';
import ProfileSocialIcon from '../shared/profile/ProfileSocialIcon';
import Select from '@/common/Input/Select';

import DiscordIcon from '@/assets/social_discord.png';
import RedditIcon from '@/assets/social_reddit.png';
import InstagramIcon from '@/assets/social_instagram.png';
import TwitterIcon from '@/assets/social_twitter.png';
import TiktokIcon from '@/assets/social_tiktok.png';


import * as DutchC from './styles';
import ProfileEmailNotification from '../shared/profile/ProfileEmailNotification';

const timeOptions = [
  {
    key: 'Africa',
    value: '(GMT +01.00) Africa/Algiers',
  },
];

const ProfileContent: React.FC = () => {
  return (
    <DutchC.ProfileWrapper>
      <DutchC.ProfileInner>
        <ProfileCardTemplate title="Profile Setting">
          <div className="flex gap-4">
            <Image src={AvatarIcon} alt="avatar" />
            <div className="flex flex-col gap-4 !text-black">
              <div className="relative">
                <InputLabel>Display Name</InputLabel>
                <TextInput value="tirthtrivedi.eth"></TextInput>
                <Image
                  src={CheckIcon}
                  alt="check"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative">
                <InputLabel>Email ID</InputLabel>
                <TextInput value="tirthtrivedi17@gmail.com"></TextInput>
              </div>
              <div className="relative">
                <InputLabel>Timezone</InputLabel>
                <Select options={timeOptions} />
              </div>
            </div>
          </div>
        </ProfileCardTemplate>
        <ProfileCardTemplate title="Connect Your Socials">
          <div className="flex flex-col gap-4">
            <ProfileSocialIcon
              title="Twitter"
              icon={TwitterIcon}
              link="https://www.twitter.com/"
            />
            <ProfileSocialIcon
              title="Discord"
              icon={DiscordIcon}
              link="https://www.discord.com/"
            />
            <ProfileSocialIcon
              title="Instagram"
              icon={InstagramIcon}
              link="https://www.instagram.com/"
            />
            <ProfileSocialIcon
              title="Tiktok"
              icon={TiktokIcon}
              link="https://www.tiktok.com/"
            />
            <ProfileSocialIcon
              title="Reddit"
              icon={RedditIcon}
              link="https://www.reddit.com/user"
            />
          </div>
        </ProfileCardTemplate>
        <ProfileCardTemplate title="Email Notification Settings">
          <div className="flex flex-col divide-y">
            <ProfileEmailNotification />
            <ProfileEmailNotification />
            <ProfileEmailNotification />
            <ProfileEmailNotification />
          </div>
        </ProfileCardTemplate>
        <ProfileActions />
      </DutchC.ProfileInner>

    </DutchC.ProfileWrapper>
  );
};

export default ProfileContent;
