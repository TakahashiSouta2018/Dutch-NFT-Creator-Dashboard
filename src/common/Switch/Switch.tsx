import React, { useState } from 'react';
import { useTheme } from 'next-themes';

import * as DutchC from './styles';

import { icons, IconType } from '../Icons';

interface SwitchButtonProps {
  icon: IconType;
  selected: boolean;
  btnSize?: 'small' | 'medium' | 'large' | 'xlarge';
  iconSize?: 'small' | 'medium' | 'large' | 'xlarge';
  onClick?: () => void;
}

interface SwitchProps {
  leftIcon: IconType;
  rightIcon: IconType;
  btnSize?: 'small' | 'medium' | 'large' | 'xlarge';
  iconSize?: 'small' | 'medium' | 'large' | 'xlarge';
  currentSwitch: number;
  onSwitch: (status: number) => void;
}

const btnSizes = {
  small: 'w-5 h-5',
  medium: 'w-7 h-7',
  large: 'w-9 h-9',
  xlarge: 'w-11 h-11',
};

const SwitchButton: React.FC<SwitchButtonProps> = ({
  icon,
  selected = false,
  btnSize = 'medium',
  iconSize = 'medium',
  onClick,
}) => {
  const { theme } = useTheme();
  const Icon = icons[icon];
  return (
    <DutchC.SwitchButtonWrapper
      className={`${btnSizes[btnSize]} opacity-90 ${
        selected ? 'bg-black dark:bg-white' : 'bg-transparent'
      }`}
      onClick={onClick}
    >
      <Icon
        size={iconSize}
        color={
          selected
            ? theme === 'light'
              ? 'white'
              : 'black'
            : theme === 'dark'
            ? 'white'
            : 'black'
        }
      ></Icon>
    </DutchC.SwitchButtonWrapper>
  );
};

const Switch: React.FC<SwitchProps> = ({
  leftIcon,
  rightIcon,
  btnSize = 'medium',
  iconSize = 'medium',
  currentSwitch,
  onSwitch,
}) => {
  return (
    <DutchC.SwitchWrapper>
      <SwitchButton
        icon={leftIcon}
        iconSize={iconSize}
        btnSize={btnSize}
        selected={currentSwitch === 0 ? true : false}
        onClick={() => {
          onSwitch(0);
        }}
      />
      <SwitchButton
        icon={rightIcon}
        iconSize={iconSize}
        btnSize={btnSize}
        selected={currentSwitch === 1 ? true : false}
        onClick={() => {
          onSwitch(1);
        }}
      />
    </DutchC.SwitchWrapper>
  );
};

export default Switch;
