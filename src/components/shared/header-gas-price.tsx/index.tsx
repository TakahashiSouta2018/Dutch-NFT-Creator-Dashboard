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
          <span>Currency</span>
          <div className="flex items-center justify-end gap-x-3">
            <span>ETH</span>
            <Icons.IChevronDown
              variant="solid"
              size="medium"
              color={theme === 'light' ? 'black' : 'white'}
            />
          </div>
        </DutchC.GasInfoHeaderWrapper>
        {props.list?.map((item, index) => (
          <div key={index} className="w-full">
            <hr className="w-full dark:border-white/10" />
            <div className="flex justify-between text-sm w-full py-3">
              <span>{item.nftType}</span>
              <div className="flex flex-col items-end truncate max-w-[40%] font-bold">
                <div className="flex items-center">
                  <span className="truncate max-w-full text-right">
                    {item.eth} ETH
                  </span>
                  <Icons.ICustomDiamond />
                </div>
                <span className="truncate max-w-full text-right opacity-40">
                  $ {item.cash} USD
                </span>
              </div>
            </div>
          </div>
        ))}
      </DutchC.GasInfo>
    </DutchC.GasInfoWrapper>
  );
};

export default GasInfo;
