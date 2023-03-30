import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import LoginHome from '../auth/login';
import RegisterHome from '../auth/register';
// components
import { SearchInput, IconButton, Badge, NavLink } from '@/common';
import * as DutchC from './styles';

import * as Icons from '@/common/Icons';

// types
import { Menu } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsConnectionModalOpen } from '@/ducks';
import ConnectWallet from '../shared/ConnectWallet';
import Image from 'next/image';

const menus: Menu[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    slug: 'dashboard',
  },
  {
    name: 'Create',
    path: '/create',
    slug: 'create',
  },
  {
    name: 'Marketplace',
    path: '/marketplace',
    slug: 'marketplace',
  },
  {
    name: 'Learn',
    path: '/learn',
    slug: 'learn',
  },
];

const Header: React.FC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isRegister, setRegister] = useState(false);

  const { isConnected } = useAppSelector((state) => state.webAppReducer);

  const dispatch = useAppDispatch();

  const PAGE_PATH = router.asPath.split('/')[1] ?? '';

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  const openConnectionModal = () => {
    dispatch(setIsConnectionModalOpen(true));
  };

  const handleRegister = useCallback(() => {
    setRegister(true);
  }, [setRegister]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DutchC.HeaderWrapper>
      {/* <LoginHome
        onClose={() => {
          setConnectWallet(false);
        }}
        connectWallet={connectWallet}
      /> */}
      <RegisterHome
        onClose={() => {
          setRegister(false);
        }}
        isRegister={isRegister}
      />

      <DutchC.HeaderInner>
        <DutchC.Logo
          src={`/images/${theme === 'light' ? 'logo.svg' : 'logo-dark.svg'}`}
          width={145}
          height={36}
          alt="logo"
        />

        <DutchC.Nav>
          {menus.map((menu) => (
            <NavLink
              key={menu.slug}
              href={menu.path}
              active={PAGE_PATH === menu.slug ? true : false}
            >
              {menu.name}
              {menu.slug === 'marketplace' && (
                <DutchC.ComingSoon>Coming Soon</DutchC.ComingSoon>
              )}
            </NavLink>
          ))}
        </DutchC.Nav>

        <DutchC.SearchWrapper>
          <SearchInput placeholder="Enter NFTs to find holders" isShortCut />
        </DutchC.SearchWrapper>

        <DutchC.RightActions>
          <Badge variant="dot" label="STATUS" />

          <IconButton
            icon={theme === 'light' ? 'moon' : 'sun'}
            onClick={toggleTheme}
          />
          <DutchC.HeaderGasWrapper>
            <Icons.ICustomGas
              currentColor={theme === 'light' ? 'black' : 'white'}
            />
            <DutchC.HeaderGasPrice>
              {isConnected ? '$0.14 USD' : ''}
            </DutchC.HeaderGasPrice>
          </DutchC.HeaderGasWrapper>

          <IconButton icon="bell" />
          {isConnected ? (
            <DutchC.HeaderUserWrapper>
              <DutchC.HeaderUserLeft>
                <Image
                  src="/images/rice.webp"
                  width={24}
                  height={24}
                  alt="logo"
                />
                <DutchC.HeaderUserAddress>0x31...c0b8</DutchC.HeaderUserAddress>
              </DutchC.HeaderUserLeft>
              <IconButton icon="chevron-down" />
            </DutchC.HeaderUserWrapper>
          ) : (
            <IconButton icon="wallet" onClick={openConnectionModal} />
          )}

          {/* <IconButton icon="user" onClick={handleRegister} /> */}
        </DutchC.RightActions>
      </DutchC.HeaderInner>
      <ConnectWallet />
    </DutchC.HeaderWrapper>
  );
};

export default Header;
