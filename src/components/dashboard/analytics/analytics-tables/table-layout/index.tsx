import React from 'react';

import * as DutchC from './styles';

interface AnalyticsTableLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AnalyticsTableLayout: React.FC<AnalyticsTableLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <>
      <DutchC.AnalyticsTableLayoutWrapper className={className}>
        {children}
      </DutchC.AnalyticsTableLayoutWrapper>
    </>
  );
};

export default AnalyticsTableLayout;
