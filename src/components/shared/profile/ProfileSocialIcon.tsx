import React from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import * as DutchC from './styles';
import { InputLabel } from '@/common/Input/styles';

interface SocialIconProps {
  title: string;
  icon: StaticImageData;
  link: string;
}

const ProfileSocialIcon: React.FC<SocialIconProps> = ({
  title,
  icon,
  link,
}) => {
  return (
    <DutchC.ProfileSocialIconWrapper>
      <InputLabel>{title}</InputLabel>
      <DutchC.ProfileSocialIconInner>
        <DutchC.ProfileSocialIconContent>
          <Image src={icon} alt="social" />
          <DutchC.SocialLinkText href={link}>{link}</DutchC.SocialLinkText>
        </DutchC.ProfileSocialIconContent>
      </DutchC.ProfileSocialIconInner>
    </DutchC.ProfileSocialIconWrapper>
  );
};

export default ProfileSocialIcon;
