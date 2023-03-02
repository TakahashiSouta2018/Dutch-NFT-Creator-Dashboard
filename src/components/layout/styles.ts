import Image from "next/image";
import styled from "styled-components";

// components
// --- App Layout
export const AppWrapper = styled.div.attrs({
  className: "max-w-wide mx-auto",
})``;

export const ContentWrapper = styled.div.attrs({
  className: "relative max-w-app mx-auto select-none",
})``;

// --- Header
export const HeaderWrapper = styled.div.attrs({
  className: "fixed z-50 top-0 left-0 w-full backdrop-blur-sm h-16",
})``;

export const HeaderInner = styled.div.attrs({
  className:
    "max-w-wide mx-auto h-full flex items-center px-6 py-2 border-b border-black/10 dark:border-white/10",
})``;

export const Logo = styled(Image).attrs({ className: "" })``;

export const Nav = styled.nav.attrs({
  className: "flex items-center space-x-8 px-8",
})``;

export const ComingSoon = styled.span.attrs({
  className:
    "absolute left-0 top-5 text-xs text-primary-orange dark:text-dark-orange whitespace-nowrap",
})``;

export const RightActions = styled.div.attrs({
  className: "flex items-center space-x-8 ml-auto",
})``;

// search
export const SearchWrapper = styled.div.attrs({
  className: "flex w-1/5 mx-1",
})``;
