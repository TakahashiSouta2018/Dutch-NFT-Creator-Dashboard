import React, { useState } from 'react';
import { AnalyticsSideBar } from './sidebar';
import { WalletTracking } from './wallet-tracking';
import { NFTTracking } from './nft-tracking';
import * as Dutch0x from './styles';

const AnalyticsContent = () => {
  const [currentTracking, setCurrentTracking] = useState(0);

  return (
    <Dutch0x.AnalyticsContentWrapper>
      <AnalyticsSideBar
        onCurrentTracking={(currentValue: string) => {
          setCurrentTracking(Number(currentValue));
        }}
      />
      <Dutch0x.AnalyticsContentMain>
        {currentTracking ? <WalletTracking /> : <NFTTracking />}
      </Dutch0x.AnalyticsContentMain>
    </Dutch0x.AnalyticsContentWrapper>
  );
};

export default AnalyticsContent;
