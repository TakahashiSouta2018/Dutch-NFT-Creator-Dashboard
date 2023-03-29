import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import * as Icons from '@/common';
import { Button } from '@/common';

import * as DutchC from './styles';

import AvatarIcon from '@/assets/avatar.png';

const ProfileMenu: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <DutchC.ProfileMenuWrapper>
        <DutchC.ProfileMenuHeaderWrapper>
          <DutchC.ProfileMenuHeaderContent>
            <Image
              src={AvatarIcon}
              width={42}
              height={42}
              alt="profile-avatar"
            />
            <DutchC.ProfileMenuHeaderDetail>
              <DutchC.ProfileMenuHeaderUserName>
                trivedi.eth
              </DutchC.ProfileMenuHeaderUserName>
              <DutchC.ProfileMenuHeaderUserWalletAddress>
                0x314cc0b8314cc0b8314cc0b8314cc0b8314cc0b8314cc0b8
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
          <Icons.ISun
            size="large"
            variant="solid"
            color={theme === 'light' ? 'black' : 'white'}
            className="w-5 h-5"
          />
        </div>
      </DutchC.ProfileMenuWrapper>
    </>
  );
};

export default ProfileMenu;
