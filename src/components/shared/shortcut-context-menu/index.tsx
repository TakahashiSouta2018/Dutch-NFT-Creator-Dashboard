import React, { useState, useCallback } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useTheme } from 'next-themes';

import { PositionType } from '@/types';

import * as Icons from '@/common';

import * as DutchC from './styles';

interface ShorcutContextMenuProps {
  position: PositionType;
  children: React.ReactNode;
}

export const ShortcutContextMenuItem: React.FC<{
  className?: string;
  text: string;
  key?: any;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ className, text, key, onClick }) => {
  return (
    <DutchC.ShortcutContextMenuListItem
      className={className}
      key={key}
      onClick={onClick}
    >
      {text}
    </DutchC.ShortcutContextMenuListItem>
  );
};

export const ShortcutContextMenu: React.FC<ShorcutContextMenuProps> = ({
  position = 'TR',
  children,
}: ShorcutContextMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  const handleClose = useCallback((e: Event) => {
    e.stopPropagation();
    setIsOpen(false);
  }, []);

  const ref = useDetectClickOutside({ onTriggered: handleClose });

  return (
    <DutchC.ShortcutContextMenuWrapper onClick={handleToggle} ref={ref}>
      <DutchC.ShortcutContextMenuButton onClick={handleToggle} isOpen={isOpen}>
        <Icons.IEllipsisHorizontal
          variant="solid"
          size="small"
          color={
            isOpen === true ? 'white' : theme === 'light' ? 'black' : 'white'
          }
        />
      </DutchC.ShortcutContextMenuButton>
      {isOpen && (
        <DutchC.ShortcutContextMenuList position={position}>
          {children}
        </DutchC.ShortcutContextMenuList>
      )}
    </DutchC.ShortcutContextMenuWrapper>
  );
};
