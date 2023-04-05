import React from 'react';
import clsx from 'clsx';
import { Button } from '@/common';

type OptionType = {
  id: number;
  slug: string;
};

interface OptionSwitchProps {
  option: OptionType;
  currentOptionId: number;
  onCurrentOption: (id: number) => void;
}

const OptionSwitch: React.FC<OptionSwitchProps> = ({
  option,
  currentOptionId,
  onCurrentOption,
}) => {
  return (
    <Button
      className={clsx(
        option.id === currentOptionId
          ? '!bg-black text-white'
          : '!bg-white !text-black',
        'flex-1'
      )}
      onClick={() => {
        onCurrentOption(option.id);
      }}
    >
      {option.slug}
    </Button>
  );
};

export default OptionSwitch;
