import React from 'react';
import { Button } from '@/common';
import * as DutchC from './style';

interface MintingButtonProps {
  activeStep: number;
  isFinished: boolean;
  onClose: () => void;
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
            ? ''
            : 'bg-accent-red'
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
