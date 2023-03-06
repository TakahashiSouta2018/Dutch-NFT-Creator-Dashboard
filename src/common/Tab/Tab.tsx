import React from 'react';

// component
import * as DutchC from './styles';

interface TabProps {
  children: React.ReactNode;
  active?: boolean;
}

const Tab: React.FC<TabProps> = ({ children, active }) => {
  return (
    <DutchC.TabWrapper active={active ? 1 : 0}>{children}</DutchC.TabWrapper>
  );
};

export default Tab;
