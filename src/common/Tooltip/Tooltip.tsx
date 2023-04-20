import React, { useState } from 'react';
import { OutlineButton, Button } from '../Button';

interface TooltipType {
  buttonName?: string;
  tooltipTitle?: string;
  action: () => void;
}

const Tooltip: React.FC<TooltipType> = ({
  buttonName = 'Sync NFTs',
  tooltipTitle = 'Sync NFT data with NFT Management',
  action,
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="group relative inline-block">
      <div
        onMouseOver={() => {
          setIsHover(true);
        }}
        onMouseOut={() => {
          setIsHover(false);
        }}
      >
        {isHover ? (
          <Button leftIcon="arrow-down-on-square" onClick={action}>
            {buttonName}
          </Button>
        ) : (
          <OutlineButton
            leftIcon="arrow-down-on-square"
            className="!border-black"
            onClick={action}
          >
            {buttonName}
          </OutlineButton>
        )}
      </div>
      <div className="absolute bottom-full right-6 z-50 mb-3 whitespace-nowrap rounded-md py-[6px] px-4 font-medium text-white  text-xs bg-black/70 dark:bg-white/70  opacity-0 group-hover:opacity-100">
        {tooltipTitle}
      </div>
    </div>
  );
};

export default Tooltip;
