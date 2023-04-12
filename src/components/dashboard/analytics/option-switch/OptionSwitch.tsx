import React from 'react';
import clsx from 'clsx';
import { Button } from '@/common';

type OptionType = {
  id: number;
  slug: string;
};

interface OptionSwitchProps {
  option: OptionType;
  currentOption: OptionType;
  onCurrentOption: (option: OptionType) => void;
}

const OptionSwitch: React.FC<OptionSwitchProps> = ({
  option,
  currentOption,
  onCurrentOption,
}) => {
  return (
    <Button
      className={clsx(
        option.id === currentOption.id
          ? '!bg-black text-white'
          : ' !bg-black/10 !text-black',
        'flex-1 '
      )}
      onClick={() => {
        onCurrentOption(option);
      }}
    >
      {option.slug}
    </Button>
  );
};

export default OptionSwitch;
