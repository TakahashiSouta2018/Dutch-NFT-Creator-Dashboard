import styled from "styled-components";
import Link from "next/link";
import { LinkSizes } from "@/types";

// types
export type LinkWrapperProps = {
  active: number;
};

// components
// --- Nav Link
export const NavLinkWrapper = styled(Link).attrs({
  className: "relative text-black/60 hover:text-black",
})`
  && {
    ${(p: LinkWrapperProps) => p.active && "color: black; font-weight: 700;"}

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

// --- Link
export const LinkWrapper = styled(Link).attrs({
  className: "relative text-black/70 hover:text-black",
})`
  ${(p: LinkWrapperProps & { size?: LinkSizes }) =>
    p.active && "color: black; font-weight: 500;"}

  ${(p: LinkWrapperProps & { size?: LinkSizes }) =>
    p.size &&
    p.size === "small" &&
    "color: black; font-size: 14px; font-weight: 500;"}
`;
