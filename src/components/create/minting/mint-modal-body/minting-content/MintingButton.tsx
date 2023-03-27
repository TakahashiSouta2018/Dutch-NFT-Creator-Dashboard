import React from 'react';
import { Button } from '@/common';
import * as DutchC from './styles';

interface MintingButtonProps {
  activeStep: number;
  isFinished: boolean;
  onClose: (value?: any) => void;
}

const MintingButton: React.FC<MintingButtonProps> = ({
  activeStep,
  isFinished,
  onClose,
}): JSX.Element => {
  return (
    <Button
      className={
        activeStep === 2
          ? isFinished
            ? '!bg-black'
            : '!bg-accent-red'
          : '!bg-accent-red/40'
      }
      leftIcon={activeStep === 2 && isFinished ? undefined : 'close'}
      disabled={activeStep === 2 ? false : true}
      onClick={onClose}
    >
      <DutchC.TextButtonBold>
        {activeStep === 2 && isFinished ? 'Done' : 'Cancel Minting'}
      </DutchC.TextButtonBold>
    </Button>
  );
};

export default MintingButton;
