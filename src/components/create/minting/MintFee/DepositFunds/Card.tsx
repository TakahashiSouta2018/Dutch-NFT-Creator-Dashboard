import React from 'react';
import Image, { StaticImageData } from 'next/image';
import * as DutchC from './style';
import { IconButton } from '@/common';

interface CardProps {
  icon: StaticImageData;
  title: string;
  onBalance?: () => void;
}

const DepositContentCard: React.FC<CardProps> = ({
  icon,
  title,
  onBalance,
}): JSX.Element => {
  return (
    <DutchC.DepositFundContentCard>
      <Image src={icon} alt="paypal" />
      <DutchC.TextDepositBold>{title}</DutchC.TextDepositBold>
      <DutchC.DepostFundRightArrow>
        <IconButton icon="right-arrow" onClick={onBalance} />
      </DutchC.DepostFundRightArrow>
    </DutchC.DepositFundContentCard>
  );
};

export default DepositContentCard;
