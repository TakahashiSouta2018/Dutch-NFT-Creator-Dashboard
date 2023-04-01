import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useTheme } from 'next-themes';
import { useDetectClickOutside } from 'react-detect-click-outside';

import * as Icons from '@/common';
import { Button } from '@/common';

import * as DutchC from './styles';

interface GasInfoButtonProps {
  onToggle: () => void;
  isOpen: boolean;
  price: number;
  theme?: string;
}

interface GasInfoProps {
  price: number;
  list: { nftType: string; eth: number; cash: number }[];
}

export const GasInfoButton: React.FC<GasInfoButtonProps> = ({
  onToggle,
  isOpen = false,
  price,
  theme = 'light',
}) => {
  return (
    <DutchC.GasInfoButtonWrapper onClick={onToggle}>
      <div className="flex items-center gap-x-1.5">
        <Icons.ICustomGas
          currentColor={theme === 'light' ? 'black' : 'white'}
        />
        <span className="truncate w-[94px] font-bold">${price} USD</span>
      </div>
    </DutchC.GasInfoButtonWrapper>
  );
};

const GasInfo: React.FC<GasInfoProps> = (props) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(false);
  };

  const ref = useDetectClickOutside({ onTriggered: handleClose });

  return (
    <DutchC.GasInfoWrapper ref={ref}>
      <GasInfoButton
        onToggle={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
        price={props.price}
        theme={theme}
      />
      <DutchC.GasInfo isOpen={isOpen}>
        <DutchC.GasInfoHeaderWrapper>
          Currency
          <DutchC.GasInfoHeaderRight>
            ETH
            <Icons.IChevronDown
              variant="solid"
              size="medium"
              color={theme === 'light' ? 'black' : 'white'}
            />
          </DutchC.GasInfoHeaderRight>
        </DutchC.GasInfoHeaderWrapper>
        {props.list?.map((item, index) => (
          <DutchC.ProfileMenuFullWidthWrapper key={index}>
            <DutchC.ProfileMenuDividerX />
            <DutchC.ProfileMenuNFTWrapper>
              {item.nftType}
              <DutchC.ProfileMenuNFTPriceWrapper>
                <DutchC.ProfileMenuNFTPriceEthWrapper>
                  <DutchC.ProfileMenuNFTPriceEthText>
                    {item.eth} ETH
                  </DutchC.ProfileMenuNFTPriceEthText>
                  <Icons.ICustomDiamond />
                </DutchC.ProfileMenuNFTPriceEthWrapper>
                <DutchC.ProfileMenuNFTPriceDollarWrapper>
                  $ {item.cash} USD
                </DutchC.ProfileMenuNFTPriceDollarWrapper>
              </DutchC.ProfileMenuNFTPriceWrapper>
            </DutchC.ProfileMenuNFTWrapper>
          </DutchC.ProfileMenuFullWidthWrapper>
        ))}
      </DutchC.GasInfo>
    </DutchC.GasInfoWrapper>
  );
};

export default GasInfo;
