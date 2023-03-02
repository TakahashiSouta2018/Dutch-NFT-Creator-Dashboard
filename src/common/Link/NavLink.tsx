import React from "react";

// components
import * as DutchC from "./styles";
import type { LinkWrapperProps } from "./styles";

type NavLinkProps = LinkWrapperProps & {
  href: string;
  children: React.ReactNode;
};

const NavLink: React.FC<NavLinkProps> = ({ href, active, children }) => {
  return (
    <DutchC.NavLinkWrapper href={href} active={active}>
      {children}
    </DutchC.NavLinkWrapper>
  );
};

export default NavLink;
