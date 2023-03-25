import React from 'react';
import Image from 'next/image';
import AvatarIcon from '@/assets/avatar.png';
import ProfileCardTemplate from '../shared/profile/ProfileCardTemplate';
import ProfileActions from '../shared/profile/ProfileActions';
import { Button, OutlineButton, TextInput } from '@/common';
import { InputLabel } from '@/common/Input/styles';
import CheckIcon from '@/assets/check.png';
import ProfileSocialIcon from '../shared/profile/ProfileSocialIcon';
import Select from '@/common/Input/Select';

import DiscordIcon from '@/assets/social_discord.png';
import RedditIcon from '@/assets/social_reddit.png';
import InstagramIcon from '@/assets/social_instagram.png';
import TwitterIcon from '@/assets/social_twitter.png';
import TiktokIcon from '@/assets/social_tiktok.png';
import ProfileEmailNotification from '../shared/profile/ProfileEmailNotification';

import * as Icons from '@/common/Icons';
import * as DutchC from './styles';
import WalletLine from '../shared/profile/WalletLine';

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
          <DutchC.ProfileSettingWrapper>
            <Image src={AvatarIcon} alt="avatar" />
            <DutchC.ProfileSettingInner>
              <DutchC.ProfileSettingInnerLine>
                <InputLabel>Display Name</InputLabel>
                <TextInput value="tirthtrivedi.eth"></TextInput>
                <Image
                  src={CheckIcon}
                  alt="check"
                  className="absolute right-3 top-1/2"
                />
              </DutchC.ProfileSettingInnerLine>
              <DutchC.ProfileSettingInnerLine>
                <InputLabel>Email ID</InputLabel>
                <TextInput value="tirthtrivedi17@gmail.com"></TextInput>
              </DutchC.ProfileSettingInnerLine>
              <DutchC.ProfileSettingInnerLine>
                <InputLabel>Timezone</InputLabel>
                <Select options={timeOptions} />
              </DutchC.ProfileSettingInnerLine>
            </DutchC.ProfileSettingInner>
          </DutchC.ProfileSettingWrapper>
        </ProfileCardTemplate>
        <ProfileCardTemplate title="Connect Your Socials">
          <DutchC.ProfileSettingInner>
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
          </DutchC.ProfileSettingInner>
        </ProfileCardTemplate>
        <ProfileCardTemplate title="Email Notification Settings">
          <DutchC.ProfileNotificationWrapper>
            <ProfileEmailNotification />
            <ProfileEmailNotification />
            <ProfileEmailNotification />
            <ProfileEmailNotification />
          </DutchC.ProfileNotificationWrapper>
        </ProfileCardTemplate>
        <ProfileActions />
      </DutchC.ProfileInner>
      <ProfileCardTemplate title="Wallet">
        <DutchC.WalletWrapper>
          <DutchC.WalletInfo>
            <WalletLine>
              <InputLabel className=" font-bold text-black/90">
                trivedi.eth
              </InputLabel>
              <InputLabel className="font-bold text-black/90">
                0.000245 ETH
              </InputLabel>
            </WalletLine>
            <WalletLine>
              <div className="flex gap-1 items-center">
                <InputLabel className="font-medium text-black/50 text-sm">
                  0x31...6c0b8
                </InputLabel>
                <Icons.IDocument />
              </div>
              <InputLabel className="font-medium text-black/50 text-sm">
                $ 2.33 USD
              </InputLabel>
            </WalletLine>
          </DutchC.WalletInfo>
          <DutchC.WalletFund>
            <WalletLine>
              <InputLabel className="font-medium text-black/50 text-sm">
                Ethereum L1
              </InputLabel>
              <InputLabel className="font-bold text-black/90 text-sm">
                0.00043 ETH
              </InputLabel>
            </WalletLine>
            <WalletLine>
              <InputLabel className="font-medium text-black/50 text-sm">
                Loopring L2
              </InputLabel>
              <InputLabel className="font-bold text-black/90 text-sm">
                0.00043 ETH
              </InputLabel>
            </WalletLine>
          </DutchC.WalletFund>
          <DutchC.WalletActions>
            <Button className="mb-7">Add Funds</Button>
            <OutlineButton className="mt-7">Logout</OutlineButton>
          </DutchC.WalletActions>
        </DutchC.WalletWrapper>
      </ProfileCardTemplate>
    </DutchC.ProfileWrapper>
  );
};

export default ProfileContent;
