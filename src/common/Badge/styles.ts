import styled from "styled-components";
import { BadgeVariants } from "@/types";

// types
type BadgeWrapperProps = {
  variant: BadgeVariants;
};

// components
export const BadgeWrapper = styled.div.attrs({
  className:
    "relative inline-flex items-center justify-center h-6.5 bg-black/10 text-xs leading-4.5 whitespace-nowrap text-black/50 font-medium px-2 py-1 rounded",
})`
  ${(p: BadgeWrapperProps) =>
    (p.variant === "dot" || p.variant === "icon") && "font-weight: 700;"}
  ${(p: BadgeWrapperProps) =>
    p.variant === "dot" &&
    "background-color: rgba(60, 170, 42, 0.2); color: #3CAA2A; padding-left: 24px;"}
  ${(p: BadgeWrapperProps) =>
    p.variant === "icon" && "color: black; padding-left: 32px;"}
  
  &::after {
    position: absolute;
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    top: 50%;
    left: 8px;
    transform: translateY(-4px);
    background: #3caa2a;
    ${(p: BadgeWrapperProps) => p.variant !== "dot" && "display: none;"}
  }
`;

export const BadgeIconWrapper = styled.div.attrs({
  className:
    "absolute top-0 left-0 bottom-0 w-8 inline-flex items-center justify-center",
})``;

export const BadgeIconLabel = styled.span.attrs({
  className: "mt-0.5",
})``;
