import React, { useState } from 'react';
import { AnalyticsSideBar } from './sidebar';
import { WalletTracking } from './wallet-tracking';
import { NFTTracking } from './nft-tracking';
import * as DutchC from './styles';

const AnalyticsContent = () => {
  const [currentTracking, setCurrentTracking] = useState(1);

  return (
    <DutchC.AnalyticsContentWrapper>
      <AnalyticsSideBar
        onCurrentTracking={(currentValue: string) => {
          setCurrentTracking(Number(currentValue));
        }}
      />
      <DutchC.AnalyticsContentMain>
        {currentTracking === 0 ? <WalletTracking /> : <NFTTracking />}
      </DutchC.AnalyticsContentMain>
    </DutchC.AnalyticsContentWrapper>
  );
};

export default AnalyticsContent;
