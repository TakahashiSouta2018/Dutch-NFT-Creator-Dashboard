import styled from 'styled-components';

interface NFTCardProps {
  selected: boolean;
  theme: 'dark' | 'light';
}

export const NFTCard = styled.div.attrs({
  className:
    'relative flex flex-col items-center bg-white border border-black/10 dark:border-white/10 hover:border-black/70 active:border-2/70 shadow-sm hover:shadow-lg active:shadow-sm rounded-lg dark:border-white/10 dark:hover:border-white/70 dark:bg-dark-surface dark:border-white/10 cursor-pointer transition',
})`
  ${(p: NFTCardProps) =>
    p.selected ? 'box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06) !important;' : ''}
  ${(p: NFTCardProps) =>
    p.selected
      ? `border: ${
          p.theme === 'light'
            ? '2px solid rgba(0, 0, 0, 0.7)'
            : '2px solid rgba(255, 255, 255, 0.7)'
        } !important; `
      : `border: ${
          p.theme === 'light'
            ? '2px solid rgba(255, 255, 255)'
            : '2px solid rgba(0, 0, 0)'
        } !important; `};
`;

export const NFTUnitBadge = styled.div.attrs({
  className:
    'absolute top-4 right-0 px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded-l-lg flex items-center justify-center gap-x-0.5 text-xs font-medium text-black backdrop-blur dark:text-white dark:bg-white/10 dark:text-white-surface',
})``;

export const NFTSelectedMark = styled.div.attrs({
  className: 'border border-black dark:border-white w-4 h-4 rounded-full',
})``;

export const NFTFooter = styled.div.attrs({
  className: 'relative flex items-end space-x-2 p-4 w-full',
})``;

export const NFTDetail = styled.div.attrs({
  className: 'flex flex-col space-y-1 w-[80%] grow',
})``;

export const NFTTitleWrapper = styled.div.attrs({
  className: 'max-w-full flex items-center justify-start space-x-1',
})``;

export const NFTTitle = styled.div.attrs({
  className: 'text-black font-bold truncate max-w-full dark:text-white',
})``;

export const NFTDescription = styled.div.attrs({
  className: 'text-sm text-black truncate max-w-full dark:text-white',
})``;

export const NFTShortcutMenuButton = styled.div.attrs({
  id: 'nftShortcutButton',
  dataDdropdownToggle: 'dropdown',
  className:
    'w-9 h-9 px-3 py-1 flex items-center justify-center border rounded-lg text-xs text-black hover:bg-black/10 active:bg-black/70 active:text-white rounded-md backdrop-blur',
})``;

export const NFTShortcutMenu = styled.div.attrs<{ className: string }>({
  className:
    'absolute bottom-[60px] right-0 flex flex-col items-center justify-center border rounded-md hover:bg-black/70 active:text-white backdrop-blur',
})``;

export const NFTShortcutMenuItem = styled.div.attrs({
  className: '',
})``;

export const NFTShortcutMenuWrapper = styled.div.attrs({
  className: 'flex flex-col w-full gap-1',
});
