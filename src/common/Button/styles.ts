import styled from 'styled-components';

// types
import { ButtonVariants } from '@/types';

type ButtonWrapperProps = ButtonVariants;

interface IconButtonWrapperProps {
  rounded?: number;
}

// components
// --- Button
export const ButtonWrapper = styled.button.attrs({
  className:
    'relative inline-flex gap-3 items-center justify-center h-10 rounded-lg px-4 bg-black/90 text-white cursor-pointer transition focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-4 dark:bg-white dark:text-black dark:font-bold dark:focus:ring-white/30 dark:focus:ring-offset-dark-surface disabled:bg-black/30 disabled:text-white dark:disabled:bg-white/50 dark:disabled:text-black/30',
})`
  ${(p: ButtonWrapperProps) =>
    p.size === 'small'
      ? 'height: 32px; padding: 0 12px; font-size: 14px; gap: 8px;'
      : ''}
`;

// --- Icon Button
export const IconButtonWrapper = styled.div.attrs({
  className:
    'inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-black/10 active:bg-black cursor-pointer transition',
})`
  ${(p: IconButtonWrapperProps) =>
    p.rounded
      ? 'border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px;'
      : ''}
`;
