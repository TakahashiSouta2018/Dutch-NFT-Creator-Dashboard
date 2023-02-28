import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

// types
interface NavLinkProps {
  active: number;
}

// components
// --- App Layout
export const AppWrapper = styled.div.attrs({
  className: "max-w-wide mx-auto",
})``;

export const ContentWrapper = styled.div.attrs({ className: "relative" })``;

// --- Header
export const HeaderWrapper = styled.div.attrs({
  className: "fixed z-50 top-0 left-0 w-full backdrop-blur-sm h-16",
})``;

export const HeaderInner = styled.div.attrs({
  className: "max-w-wide mx-auto h-full flex items-center px-6 py-2",
})``;

export const Logo = styled(Image).attrs({ className: "" })``;

export const Nav = styled.nav.attrs({
  className: "flex items-center space-x-8 px-8",
})``;

export const NavLink = styled(Link).attrs({
  className: "relative text-black/60 hover:text-black",
})`
  && {
    ${(p: NavLinkProps) => p.active && "color: black; font-weight: 700;"}

    &::after {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #ff4800;
      left: 50%;
      top: 100%;
      transform: translateX(-50%) translateY(1px);
    }
  }
`;

export const ComingSoon = styled.span.attrs({
  className: "absolute left-0 top-5 text-xs text-primary whitespace-nowrap",
})``;

export const RightActions = styled.div.attrs({
  className: "flex items-center space-x-8 ml-auto",
})``;

// search
export const SearchWrapper = styled.div.attrs({
  className: "flex w-1/5 mx-1",
})``;
