import React from 'react';

const WalletLine: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="flex justify-between">{children}</div>;
};

export default WalletLine;
