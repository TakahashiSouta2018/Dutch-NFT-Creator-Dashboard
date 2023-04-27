import styled from 'styled-components';
import Link from 'next/link';
import { LinkSizes } from '@/types';

// types

// components
// --- Nav Link
export const NavLinkWrapper = styled(Link).attrs({
  className:
    'relative text-black/60 hover:text-black dark:text-white/70 dark:hover:text-white transition',
})``;

// --- Link
export const LinkWrapper = styled(Link).attrs({
  className:
    'relative text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition',
})`
  ${(p: { size?: LinkSizes }) =>
    p?.size === 'small' && 'font-size: 14px; font-weight: 500;'}
`;

export const NavLinkDecoration = styled.div.attrs({
  className:
    'absolute w-[5px] h-[5px] rounded-full bg-[#ff4800] left-1/2 top-full -translate-x-1/2 translate-y-[1px]',
})``;
