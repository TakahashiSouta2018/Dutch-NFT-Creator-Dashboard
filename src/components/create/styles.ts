import styled from 'styled-components';
import Link from 'next/link';

// types
type CreateContentWrapperProps = {
  open?: number;
};

type DraftNFTCardProps = {
  selected?: number;
};

// components
export const CreateWrapper = styled.div.attrs({
  className: 'relative flex px-6 py-4 mt-16 overflow-x-hidden',
})``;

// --- Main Content
export const CreateContentWrapper = styled.div.attrs({
  className: 'flex transition-all',
})`
  ${(p: CreateContentWrapperProps) =>
    p.open ? 'width: 83.333333%;' : 'width: 100%;'}
`;

export const CreateContent = styled.div.attrs({
  className: 'flex flex-col w-full space-y-4',
})``;

export const CreateContentHeader = styled.div.attrs({
  className:
    'flex justify-between border-b border-black/10 dark:border-white/10',
})``;

export const CreateContentLeft = styled.div.attrs({
  className: 'flex flex-col',
})``;

export const CreateContentTitle = styled.h1.attrs({
  className: 'text-2xl whitespace-nowrap font-bold',
})``;

export const CreateContentSubTitle = styled.h3.attrs({
  className: 'text-sm whitespace-nowrap text-black/70 dark:text-white/70',
})``;

export const CreateContentCollection = styled.div.attrs({
  className: 'flex w-4/5 my-4',
})``;

export const CreateContentHeaderActions = styled.div.attrs({
  className: 'flex space-x-3',
})``;

export const CreateContentBody = styled.div.attrs({
  className: 'relative flex flex-col space-y-4',
})``;

export const CreateContentNoItems = styled.div.attrs({
  className:
    'flex items-center justify-center min-h-[315px] border border-black/10 px-4 rounded-lg dark:border-white/10',
})``;

export const CreateContentTools = styled.div.attrs({
  className: 'w-1/2 flex items-center space-x-4',
})``;

export const CreateContentDraftNFTs = styled.div.attrs({
  className: 'grid grid-cols-5 gap-4',
})``;

// --- Breadcrumb
export const BreadcrumbWrapper = styled.div.attrs({
  className: 'flex items-center',
})`
  & > * + * {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 40%;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: var(--breadcrumb-color);
    }
  }
`;

export const BreadcrumbItem = styled(Link).attrs({
  className:
    'relative inline-flex items-center justify-center px-4 first:pl-2 last:pr-2 text-black/60 capitalize dark:text-white/60',
})``;

// --- Draft NFT
export const DraftNFTCard = styled.div.attrs({
  className:
    'relative flex flex-col bg-white border border-black/10 rounded dark:bg-dark-surface dark:border-white/10 cursor-pointer transition',
})`
  ${(p: DraftNFTCardProps) =>
    p.selected ? 'border-color: var(--border-color) !important;' : ''}
`;

export const DraftNFTUnitBadge = styled.div.attrs({
  className:
    'absolute top-4 right-0 flex items-center justify-center text-xs font-medium text-white h-5.5 px-1 bg-black/50 rounded-l backdrop-blur dark:bg-white/50 dark:text-dark-surface',
})``;

export const DraftNFTDetail = styled.div.attrs({
  className: 'flex flex-col space-y-1 p-4',
})``;

export const DraftNFTTitle = styled.h1.attrs({
  className: 'text-black font-bold truncate max-w-full dark:text-white',
})``;

export const DraftNFTDescription = styled.p.attrs({
  className: 'text-sm text-black/50 truncate max-w-full dark:text-white/50',
})``;

export const DraftNFTActions = styled.div.attrs({
  className:
    'grid grid-cols-2 divide-x divide-black/10 border-t border-black/10 dark:divide-white/10 dark:border-white/10',
})``;

export const DraftNFTEdit = styled.button.attrs({
  className:
    'inline-flex items-center justify-center h-9 text-sm font-medium text-black cursor-pointer dark:text-white',
})``;

export const DraftNFTDelete = styled.button.attrs({
  className:
    'inline-flex items-center justify-center h-9 text-sm font-medium text-accent-red cursor-pointer dark:text-dark-red',
})``;

export const DraftNFTSelectedMark = styled.div.attrs({
  className:
    'absolute top-4 left-4 flex items-center justify-center w-5 h-5 rounded-full',
})``;

// --- Guide info
export const GuideInfoIconWrapper = styled.div.attrs({
  className: 'absolute top-4 right-6 cursor-pointer',
})``;
