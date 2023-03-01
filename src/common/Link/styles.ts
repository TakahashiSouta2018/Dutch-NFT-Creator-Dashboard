import styled from "styled-components";
import Link from "next/link";

// types
export type NavLinkWrapperProps = {
  active: number;
};

// components
// --- Nav Link
export const NavLinkWrapper = styled(Link).attrs({
  className: "relative text-black/60 hover:text-black",
})`
  && {
    ${(p: NavLinkWrapperProps) => p.active && "color: black; font-weight: 700;"}

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
