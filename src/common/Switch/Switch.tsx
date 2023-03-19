import React, { useState } from 'react';
import { useTheme } from 'next-themes';

//styles
import * as DutchC from './styles';

//icons
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
      className={`${btnSizes[btnSize]} opacity-90`}
      bgColor={
        selected
          ? theme === 'dark'
            ? 'white'
            : 'black'
          : theme === 'light'
          ? 'white'
          : 'black'
      }
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
}) => {
  const [status, setStatus] = useState<IconType>(leftIcon);

  return (
    <DutchC.SwitchWrapper>
      <SwitchButton
        icon={leftIcon}
        iconSize={iconSize}
        btnSize={btnSize}
        selected={status == leftIcon ? true : false}
        onClick={() => setStatus(leftIcon)}
      />
      <SwitchButton
        icon={rightIcon}
        iconSize={iconSize}
        btnSize={btnSize}
        selected={status == rightIcon ? true : false}
        onClick={() => setStatus(rightIcon)}
      />
    </DutchC.SwitchWrapper>
  );
};

export default Switch;
