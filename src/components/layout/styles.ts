import Image from 'next/image';
import styled from 'styled-components';

type ContentLayoutProps = {
  open: boolean;
};

// components
// --- App Layout
export const AppWrapper = styled.div.attrs({
  className: 'max-w-wide mx-auto relative min-h-screen',
})``;

export const ContentWrapper = styled.div.attrs({
  className: 'relative max-w-app mt-16 mx-auto select-none h-screen',
})``;

// --- Header
export const HeaderWrapper = styled.div.attrs({
  className: 'fixed z-50 top-0 left-0 w-full backdrop-blur-sm h-16',
})``;

export const HeaderInner = styled.div.attrs({
  className:
    'max-w-wide mx-auto h-full flex items-center px-6 py-2 border-b border-black/10 dark:border-white/10',
})``;

export const Logo = styled(Image).attrs({ className: '' })``;

export const Nav = styled.nav.attrs({
  className: 'relative flex items-center space-x-8 px-8',
})``;

export const NavCover = styled.nav.attrs({
  className: 'absolute top-0 left-0 w-full h-full z-10',
})``;

export const ComingSoon = styled.span.attrs({
  className:
    'absolute left-0 top-5 text-xs text-primary-orange dark:text-dark-orange whitespace-nowrap',
})``;

export const RightActions = styled.div.attrs({
  className: 'flex items-center ml-auto gap-8',
})``;

// search
export const SearchWrapper = styled.div.attrs({
  className: 'flex w-1/5 mx-1',
})``;

export const HeaderGasWrapper = styled.div.attrs({
  className: 'flex gap-2',
})``;

export const HeaderGasPrice = styled.p.attrs({
  className: 'text-sm font-normal dark:text-white',
})``;

export const HeaderUserWrapper = styled.div.attrs({
  className:
    'flex gap-2.5 px-2 py-1.5 rounded-lg border border-black/10 items-center',
})``;

export const HeaderUserLeft = styled.div.attrs({
  className: 'flex gap-1.5',
})``;

export const HeaderUserAddress = styled.p.attrs({
  className: 'font-bold dark:text-white',
})``;

// -------------------- Content Layout --------------------- //

export const ContentLayoutWrapper = styled.div.attrs({
  className:
    'relative flex flex-col overflow-y-auto min-h-[800px] overflow-x-hidden items-start min-h-full px-6',
})``;

export const ContentLayoutBody = styled.div.attrs({
  className: 'flex transition-all',
})`
  ${(p: ContentLayoutProps) => (p.open ? 'width: 83.333333%;' : 'width: 100%;')}
`;

export const ContentLayoutBodyInner = styled.div.attrs({
  className: 'flex flex-col w-full',
})``;

export const GuideInfoIconWrapper = styled.div.attrs({
  className: 'absolute top-4 right-6 z-40 cursor-pointer',
})``;
