import styled from 'styled-components';
import { DropdownPositionVariants } from '@/types';

// types
type DropdownListProps = {
  position: DropdownPositionVariants;
};

type DropdownInnerProps = {
  selected: number;
};

// components
// --- Dropdown(default)
export const DropdownWrapper = styled.div.attrs({
  className: 'flex flex-col w-full gap-1 cursor-pointer z-40',
})``;

export const DropdownBackWrapper = styled.div.attrs({
  className: 'fixed h-screen w-screen bg-transparent z-0',
})``;

export const DropdownLabel = styled.label.attrs({
  className: 'text-sm whitespace-nowrap text-black/70 dark:text-white/70',
})``;

export const DropdownInner = styled.div.attrs({
  className:
    'relative inline-flex items-center w-full h-9.5 pl-3 pr-10 border border-black/10 text-sm rounded-md text-black/70 hover:border-black hover:text-black/90 disabled:border-black/30 disabled:opacity-50 transition cursor-pointer dark:border-white/10 dark:text-white',
})`
  ${(p: DropdownInnerProps) => (p.selected ? 'border-color: black;' : '')}
`;

export const DropdownValue = styled.label.attrs({
  className: 'flex w-full cursor-pointer',
})``;

export const DropdownIconWrapper = styled.div.attrs({
  className:
    'absolute top-0 right-0 inline-flex items-center justify-center w-10 h-full',
})``;

export const DropdownList = styled.div.attrs({
  className:
    'absolute flex flex-col p-1 w-full max-h-[150px] overflow-auto bg-white rounded-md z-40',
})`
  box-shadow: 0px 2px 4px rgba(30, 41, 59, 0.25);
  backdrop-filter: blur(16px);

  ${(p: DropdownListProps) =>
    p.position === 'BL' ? 'top: 100%; left: 0; margin-top: 4px;' : ''}
  ${(p: DropdownListProps) =>
    p.position === 'TL'
      ? 'bottom: 0; left: 0; margin-bottom: 4px; transform: translateY(-40px);'
      : ''}
`;

export const DropdownListItem = styled.div.attrs({
  className: 'inline-flex items-center w-full h-10 px-3 py-2 text-black',
})``;
