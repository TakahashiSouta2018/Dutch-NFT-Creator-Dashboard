import React, { useState, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useTheme } from 'next-themes';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setDraftNFTs,
  setSelectedDraftNFTs,
  setDepositModalIsOpen,
} from '@/components/create/ducks';
import { setIsConnected } from '@/ducks';
import useNFTHook from '@/hooks/useNFTHook';
import * as Icons from '@/common/Icons';
import { Button, IconButton } from '@/common';

// ----- connect modal ----- //
import { setIsConnectionModalOpen } from '@/ducks';

import * as DutchC from './styles';
import { setTrackList } from '@/components/dashboard/ducks';
import DepositFundModal from '@/components/create/minting/DepositFundModal';

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
  walletBalance: {
    eth: number;
    dollar: number;
  };
  ethL1: number;
  ethL2: number;
}

export const ProfileMenuButton: React.FC<ProfileMenuButtonProps> = ({
  onToggle,
  isOpen = false,
  walletAddress,
  avatar,
  theme = 'light',
}) => {
  const { isConnected } = useAppSelector((state) => state.webAppReducer);

  if (isConnected)
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
  return (
    <div onClick={onToggle}>
      <IconButton icon="wallet" />
    </div>
  );
};

const ProfileMenu: React.FC<ProfileMenuProps> = (props) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAppSelector((state) => state.webAppReducer);

  const dispatch = useAppDispatch();

  const openConnectionModal = () => {
    dispatch(setIsConnectionModalOpen(true));
  };
  const handleClose = (e: Event) => {
    setIsOpen(false);
  };
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  const handleDepositModal = () => {
    dispatch(setDepositModalIsOpen(true));
  };

  const handleLogout = () => {
    dispatch(setIsConnected(false));
    setIsOpen(false);
    dispatch(setTrackList(undefined));
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
        {isConnected ? (
          <div className="flex flex-col gap-y-3">
            <DutchC.ProfileMenuHeaderWrapper href="/profile">
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
                <span className="truncate max-w-full text-right">
                  {props.walletBalance.eth} ETH
                </span>
                <span className="truncate max-w-full text-right">
                  $ {props.walletBalance.dollar} USD
                </span>
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
                  {props.ethL1} ETH
                </DutchC.ProfileMenuWalletBalanceAmountText>
                <DutchC.ProfileMenuWalletBalanceAmountText>
                  $ {props.ethL2} USD
                </DutchC.ProfileMenuWalletBalanceAmountText>
              </DutchC.ProfileMenuWalletBalanceAmountTextWrapper>
            </DutchC.ProfileMenuWalletBalanceWrapper>
            <DutchC.ProfileMenuDividerX />
            <DutchC.ProfileMenuAddFundsButtonWrapper>
              <Button
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  handleDepositModal();
                }}
              >
                Add Funds
              </Button>
            </DutchC.ProfileMenuAddFundsButtonWrapper>
          </div>
        ) : (
          <div className="w-full">
            <Button onClick={openConnectionModal} className="w-full mb-3">
              Connect Wallet
            </Button>
            <DutchC.ProfileMenuDividerX />
          </div>
        )}

        <DutchC.ProfileMenuFooterWrapper>
          <DutchC.ProfileMenuFooterItem>
            <DutchC.ProfileMenuFooterThemeText>
              {theme} Theme
            </DutchC.ProfileMenuFooterThemeText>
            <IconButton
              className="w-5 h-5"
              icon={theme === 'light' ? 'sun' : 'moon'}
              onClick={toggleTheme}
            />
          </DutchC.ProfileMenuFooterItem>
          {isConnected && <DutchC.ProfileMenuDividerX />}
          {isConnected && (
            <DutchC.ProfileMenuFooterItem>
              <DutchC.ProfileMenuFooterThemeText>
                Disconnect
              </DutchC.ProfileMenuFooterThemeText>
              <IconButton
                className="w-5 h-5"
                icon={'arrow-right-on-rectangle'}
                onClick={handleLogout}
              />
            </DutchC.ProfileMenuFooterItem>
          )}
        </DutchC.ProfileMenuFooterWrapper>
      </DutchC.ProfileMenu>

      <DepositFundModal />
    </DutchC.ProfileMenuWrapper>
  );
};

export default ProfileMenu;
