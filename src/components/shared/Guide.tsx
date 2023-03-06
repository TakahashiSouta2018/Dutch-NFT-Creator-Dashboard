import React from 'react';
import { useTheme } from 'next-themes';

// components
import * as DutchC from './styles';

// icons
import * as Icons from '@/common/Icons';

const Guide: React.FC = () => {
  const { theme } = useTheme();

  return (
    <DutchC.GuideWrapper>
      {/* information icon */}
      <DutchC.GuideInfoIconWrapper>
        <Icons.IInformationCircle
          variant="solid"
          size="large"
          color={theme === 'light' ? 'black' : 'white'}
        />
      </DutchC.GuideInfoIconWrapper>

      <DutchC.GuideCard>
        <DutchC.GuideCardHeader>What is NFT Management?</DutchC.GuideCardHeader>

        <DutchC.GuideCardContent>
          The hub for managing and interacting with NFTs in your portfolio. You
          can view NFTs, create &apos;lists&apos;, manage
          &apos;collections&apos; or BANK0x.
        </DutchC.GuideCardContent>

        <DutchC.GuideCardFooter>
          <Icons.IPlayCircle variant="solid" size="medium" color="orange" />
          <span>How it works?</span>
        </DutchC.GuideCardFooter>
      </DutchC.GuideCard>

      <DutchC.GuideCard>
        <DutchC.GuideCardHeader>Why sync NFTs?</DutchC.GuideCardHeader>

        <DutchC.GuideCardContent>
          Uploads the NFTs tied to your wallet that are not necessarily present
          in your wallet currently. After succesfuly performing Sync NFTs you
          are able to use the variety of tools.
        </DutchC.GuideCardContent>

        <DutchC.GuideCardFooter>
          <span style={{ fontWeight: 700 }}>Sync NFTs</span>
        </DutchC.GuideCardFooter>
      </DutchC.GuideCard>
    </DutchC.GuideWrapper>
  );
};

export default Guide;
