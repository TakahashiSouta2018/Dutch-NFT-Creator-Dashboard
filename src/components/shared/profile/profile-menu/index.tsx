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
      <DutchC.ProfileMenuButtonImageWrapper>
        <Image src={avatar} width={24} height={24} alt="profile-avatar" />
        <DutchC.ProfileMenuButtonUserWalletAddress>
          {walletAddress}
        </DutchC.ProfileMenuButtonUserWalletAddress>
      </DutchC.ProfileMenuButtonImageWrapper>
      <DutchC.ProfileMenuButtonArrowIconWrapper>
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
      </DutchC.ProfileMenuButtonArrowIconWrapper>
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
              <DutchC.ProfileMenuHeaderUserWalletAddressWrapper>
                <DutchC.ProfileMenuHeaderUserWalletAddress>
                  {props.walletAddress}
                </DutchC.ProfileMenuHeaderUserWalletAddress>
                <Icons.IDocumentDuplicateIcon
                  variant="solid"
                  color={theme === 'light' ? 'black' : 'white'}
                  size="medium"
                />
              </DutchC.ProfileMenuHeaderUserWalletAddressWrapper>
            </DutchC.ProfileMenuHeaderDetail>
          </DutchC.ProfileMenuHeaderContent>
          <Icons.IChevronRight
            variant="solid"
            size="medium"
            color={theme === 'light' ? 'black' : 'white'}
            className="w-5 h-5 absolute right-0 opacity-70"
          />
        </DutchC.ProfileMenuHeaderWrapper>
        <DutchC.ProfileMenuDividerX />
        <DutchC.ProfileMenuWalletBalanceWrapper>
          Wallet Balance
          <DutchC.ProfileMenuWalletBalanceAmountWrapper>
            <span className="truncate max-w-full text-right">0.000245 ETH</span>
            <span className="truncate max-w-full text-right">$ 2.33 USD</span>
          </DutchC.ProfileMenuWalletBalanceAmountWrapper>
        </DutchC.ProfileMenuWalletBalanceWrapper>
        <DutchC.ProfileMenuDividerX />
        <DutchC.ProfileMenuWalletBalanceWrapper>
          <DutchC.ProfileMenuWalletBalanceAmountCategoryWrapper>
            <span>Ethereum L1</span>
            <span>Ethereum L2</span>
          </DutchC.ProfileMenuWalletBalanceAmountCategoryWrapper>
          <DutchC.ProfileMenuWalletBalanceAmountTextWrapper>
            <DutchC.ProfileMenuWalletBalanceAmountText>
              0.000245 ETH
            </DutchC.ProfileMenuWalletBalanceAmountText>
            <DutchC.ProfileMenuWalletBalanceAmountText>
              $ 2.33 USD
            </DutchC.ProfileMenuWalletBalanceAmountText>
          </DutchC.ProfileMenuWalletBalanceAmountTextWrapper>
        </DutchC.ProfileMenuWalletBalanceWrapper>
        <DutchC.ProfileMenuDividerX />
        <DutchC.ProfileMenuAddFundsButtonWrapper>
          <Button className="w-full">Add Funds</Button>
        </DutchC.ProfileMenuAddFundsButtonWrapper>
        <DutchC.ProfileMenuFooterWrapper>
          <DutchC.ProfileMenuFooterThemeText>
            {theme} Theme
          </DutchC.ProfileMenuFooterThemeText>
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
        </DutchC.ProfileMenuFooterWrapper>
      </DutchC.ProfileMenu>
    </DutchC.ProfileMenuWrapper>
  );
};

export default ProfileMenu;
