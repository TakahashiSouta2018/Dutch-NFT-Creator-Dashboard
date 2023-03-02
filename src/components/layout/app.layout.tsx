import React from "react";

// components
import Header from "./Header";
import * as DutchC from "./styles";

// types
interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <DutchC.AppWrapper>
      <Header />
      <DutchC.ContentWrapper>{children}</DutchC.ContentWrapper>
    </DutchC.AppWrapper>
  );
};

export default AppLayout;
