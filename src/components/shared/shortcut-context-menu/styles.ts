import styled from 'styled-components';

import { PositionType } from '@/types';

export const ShortcutContextMenuWrapper = styled.div.attrs({
  className: 'relative flex flex-col items-end w-fit',
})``;

export const ShortcutContextMenuButton = styled.div.attrs<{
  className: string;
}>({
  className:
    'bottom-0 right-0 w-9 h-9 px-3 py-1 flex items-center justify-center border rounded-lg hover:bg-black/20 rounded-md backdrop-blur',
})`
  ${(p: { isOpen: boolean }) =>
    p.isOpen === true ? ' background: black!important' : ''};
  ${(p: { isOpen: boolean }) =>
    p.isOpen === true ? 'opacity: 0.7!important' : ''};
`;

export const ShortcutContextMenuList = styled.a.attrs({
  className:
    'absolute w-[180px] text-white text-sm p-1 flex z-10 flex-col items-center justify-center border rounded-lg shadow-sm bg-black/70 backdrop-blur',
})`
  ${(p: { position: PositionType }) => {
    switch (p.position) {
      case 'TR':
        return 'bottom: 40px; right: 0px;';
      case 'TL':
        return 'bottom: 40px; left: 0px;';
      case 'BR':
        return 'top: 40px; right: 0px;';
      case 'TL':
        return 'top: 40px; left: 0px';
      default:
        'bottom: 40px; right: 0px;';
    }
  }}
`;

export const ShortcutContextMenuListItem = styled.div.attrs({
  className: 'px-2 py-1.5 w-full flex flex-start rounded hover:bg-white/10',
})``;
