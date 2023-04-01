import React from 'react';

// components
import * as DutchC from './styles';
import type { LinkWrapperProps } from './styles';

type NavLinkProps = LinkWrapperProps & {
  href: string;
  children: React.ReactNode;
  active: boolean;
};

const NavLink: React.FC<NavLinkProps> = ({ href, active, children }) => {
  return (
    <DutchC.NavLinkWrapper href={href} active={active}>
      {children}
      {active && <DutchC.NavLinkDecoration />}
    </DutchC.NavLinkWrapper>
  );
};

export default NavLink;
