import React, { useState, useCallback } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useTheme } from 'next-themes';

import { PositionType } from '@/types';

import * as Icons from '@/common';

import * as DutchC from './styles';

interface ShorcutContextMenuProps {
  position: PositionType;
  options: string[];
  onSelect?: () => void;
}

const ShortcutContextMenu: React.FC<ShorcutContextMenuProps> = ({
  position = 'TR',
  options,
  onSelect,
}: ShorcutContextMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  const handleClose = useCallback((e: Event) => {
    e.stopPropagation();
    setIsOpen(false);
  }, []);
  const { theme } = useTheme();

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
          {options.map((option, index) => (
            <DutchC.ShortcutContextMenuListItem key={index}>
              {option}
            </DutchC.ShortcutContextMenuListItem>
          ))}
        </DutchC.ShortcutContextMenuList>
      )}
    </DutchC.ShortcutContextMenuWrapper>
  );
};

export default ShortcutContextMenu;
