import styled from 'styled-components';
import Link from 'next/link';
import { LinkSizes } from '@/types';

// types
export type LinkWrapperProps = {
  active: number;
};

// components
// --- Nav Link
export const NavLinkWrapper = styled(Link).attrs({
  className:
    'relative text-black/60 hover:text-black dark:text-white/70 dark:hover:text-white transition',
})`
  && {
    ${(p: LinkWrapperProps) =>
      p.active && 'color: var(--active-color); font-weight: 700;'}

    &::after {
      content: '';
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
  className:
    'relative text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition',
})`
  ${(p: LinkWrapperProps & { size?: LinkSizes }) =>
    p.active ? 'color: var(--active-color) !important; font-weight: 500;' : ''}

  ${(p: LinkWrapperProps & { size?: LinkSizes }) =>
    p?.size === 'small' && 'font-size: 14px; font-weight: 500;'}
`;
