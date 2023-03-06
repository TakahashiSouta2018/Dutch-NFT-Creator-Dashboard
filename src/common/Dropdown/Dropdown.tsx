import React from 'react';

// components
import * as DutchC from './styles';

// types
import type { DropdownPositionVariants } from '@/types';

interface DropdownProps {
  value: string;
  options: string[];
  pos: DropdownPositionVariants;
}

const Dropdown: React.FC<DropdownProps> = ({
  value = '',
  options = [],
  pos = 'BL',
}) => {
  return <DutchC.DropdownWrapper></DutchC.DropdownWrapper>;
};

export default Dropdown;
