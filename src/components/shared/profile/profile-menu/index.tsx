import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useTheme } from 'next-themes';
import { useDetectClickOutside } from 'react-detect-click-outside';

import * as Icons from '@/common';
import { Button } from '@/common';

import * as DutchC from './styles';

interface ProfileMenuButtonProps {
  onToggle: () => void;
  isOpen: boolean;
  avatar: StaticImageData | string;
  walletAddress: string;
  theme?: string;
}

interface ProfileMenuProps {
  userName: string;
  avatar: StaticImageData | string;
  walletAddress: string;
}

export const ProfileMenuButton: React.FC<ProfileMenuButtonProps> = ({
  onToggle,
  isOpen = false,
  walletAddress,
  avatar,
  theme = 'light',
}) => {
  return (
    <DutchC.ProfileMenuButtonWrapper onClick={onToggle}>
      <div className="flex items-center gap-x-1.5">
        <Image src={avatar} width={24} height={24} alt="profile-avatar" />
        <span className="truncate w-[94px] font-bold">{walletAddress}</span>
      </div>
      <div className="w-5 h-5 flex items-center">
        {(!isOpen && (
          <Icons.IChevronDown
            variant="outline"
            size="medium"
            color={theme === 'light' ? 'black' : 'white'}
          />
        )) || (
          <Icons.IChevronUp
            variant="outline"
            size="medium"
            color={theme === 'light' ? 'black' : 'white'}
          />
        )}
      </div>
    </DutchC.ProfileMenuButtonWrapper>
  );
};

const ProfileMenu: React.FC<ProfileMenuProps> = (props) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(false);
  };

  const ref = useDetectClickOutside({ onTriggered: handleClose });

  return (
    <DutchC.ProfileMenuWrapper ref={ref}>
      <ProfileMenuButton
        onToggle={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
        avatar={props.avatar}
        walletAddress={props.walletAddress}
        theme={theme}
      />
      <DutchC.ProfileMenu isOpen={isOpen}>
        <DutchC.ProfileMenuHeaderWrapper>
          <DutchC.ProfileMenuHeaderContent>
            <Image
              src={props.avatar}
              width={42}
              height={42}
              alt="profile-avatar"
            />
            <DutchC.ProfileMenuHeaderDetail>
              <DutchC.ProfileMenuHeaderUserName>
                {props.userName}
              </DutchC.ProfileMenuHeaderUserName>
              <DutchC.ProfileMenuHeaderUserWalletAddress>
                {props.walletAddress}
              </DutchC.ProfileMenuHeaderUserWalletAddress>
            </DutchC.ProfileMenuHeaderDetail>
          </DutchC.ProfileMenuHeaderContent>
          <Icons.IChevronRight
            variant="solid"
            size="medium"
            color={theme === 'light' ? 'black' : 'white'}
            className="w-5 h-5 absolute right-0"
          />
        </DutchC.ProfileMenuHeaderWrapper>
        <hr className="w-full dark:border-white/10" />
        <div className="flex justify-between text-sm w-full">
          <span>Wallet Balance</span>
          <div className="flex flex-col items-end truncate max-w-[40%] font-bold">
            <span className="truncate max-w-full text-right">0.000245 ETH</span>
            <span className="truncate max-w-full text-right">$ 2.33 USD</span>
          </div>
        </div>
        <hr className="w-full dark:border-white/10" />
        <div className="flex justify-between text-sm w-full">
          <div className="flex flex-col gap-3 truncate max-w-[40%]">
            <span>Ethereum L1</span>
            <span>Ethereum L2</span>
          </div>
          <div className="flex flex-col gap-3 items-end truncate max-w-[40%] font-bold">
            <span className="truncate max-w-full text-right">0.000245 ETH</span>
            <span className="truncate max-w-full text-right">$ 2.33 USD</span>
          </div>
        </div>
        <hr className="w-full dark:border-white/10" />
        <div className="flex text-sm w-full font-bold p-1">
          <Button className="w-full">Add Funds</Button>
        </div>
        <div className="flex items-center justify-between text-sm w-full">
          <span className="text-sm font-bold first-letter:uppercase">
            {theme} Theme
          </span>
          {(theme === 'light' && (
            <Icons.ISun
              size="large"
              variant="solid"
              color={theme === 'light' ? 'black' : 'white'}
              className="w-5 h-5"
            />
          )) || (
            <Icons.IMoon
              size="large"
              variant="solid"
              color={theme === 'light' ? 'black' : 'white'}
              className="w-5 h-5"
            />
          )}
        </div>
      </DutchC.ProfileMenu>
    </DutchC.ProfileMenuWrapper>
  );
};

export default ProfileMenu;
