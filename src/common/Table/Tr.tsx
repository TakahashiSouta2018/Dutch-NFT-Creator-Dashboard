import React from 'react';

// components
import * as DutchC from './styles';

interface TRProps {
  children: React.ReactNode;
}

const TR: React.FC<TRProps> = ({ children }) => {
  return <DutchC.TRWrapper>{children}</DutchC.TRWrapper>;
};

export default TR;
