import React, { useState, useCallback, SyntheticEvent } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useTheme } from 'next-themes';

// components
import * as DutchC from './styles';

// icons
import * as Icons from '@/common/Icons';

// types

import type { DropdownPositionVariants } from '@/types';

interface DropdownProps {
  value: string;
  options: string[];
  position: DropdownPositionVariants;
  label?: string;
  onSelect: (value: string, index: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  value = 'Color',
  options = [],
  position = 'BL',
  label,
  onSelect,
}) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const handleClickOption = useCallback(
    (value: string, index: number) => {
      onSelect(value, index);
    },
    [onSelect]
  );

  return (
    <DutchC.DropdownWrapper onClick={handleToggle}>
      {!!open && (
        <DutchC.DropdownBackWrapper
          onClick={(e: SyntheticEvent) => {
            e.stopPropagation();
            setOpen(false);
          }}
        />
      )}
      {label && <DutchC.DropdownLabel>{label}</DutchC.DropdownLabel>}
      <DutchC.DropdownInner selected={open ? 1 : 0}>
        {/* value */}
        <DutchC.DropdownValue>{value}</DutchC.DropdownValue>
        {/* arrow icon */}
        <DutchC.DropdownIconWrapper>
          <Icons.IChevronDown
            size="small"
            color={theme === 'dark' ? 'white' : 'black'}
          />
        </DutchC.DropdownIconWrapper>
        {/* dropdown options */}
        <div>
          <DutchC.DropdownList position={position} isOpen={open}>
            {options.map((option, index) => (
              <DutchC.DropdownListItem
                key={index}
                onClick={() => handleClickOption(option, index)}
              >
                {option}
              </DutchC.DropdownListItem>
            ))}
          </DutchC.DropdownList>
        </div>
      </DutchC.DropdownInner>
    </DutchC.DropdownWrapper>
  );
};

export default Dropdown;
