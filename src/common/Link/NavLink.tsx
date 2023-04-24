import React from 'react';

// components
import * as DutchC from './styles';
import type { LinkWrapperProps } from './styles';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
};

const NavLink: React.FC<NavLinkProps> = ({ href, isActive, children }) => {
  return (
    <DutchC.NavLinkWrapper href={href} active={isActive}>
      {children}
      {isActive && <DutchC.NavLinkDecoration />}
    </DutchC.NavLinkWrapper>
  );
};

export default NavLink;
