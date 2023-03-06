import React from "react";

// components
import * as DutchC from "./styles";

interface TabGroupProps {
  children: React.ReactNode;
}

const TabGroup: React.FC<TabGroupProps> = ({ children }) => {
  return <DutchC.TabGroupWrapper>{children}</DutchC.TabGroupWrapper>;
};

export default TabGroup;
