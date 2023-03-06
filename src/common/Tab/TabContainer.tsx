import React from 'react';

// components
import * as DutchC from './styles';

interface TabContainerProps {
  children: React.ReactNode;
}

const TabContainer: React.FC<TabContainerProps> = ({ children }) => {
  return <DutchC.TabContainerWrapper>{children}</DutchC.TabContainerWrapper>;
};

export default TabContainer;
