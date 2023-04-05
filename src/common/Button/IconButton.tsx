import React, { useState } from 'react';
import { useTheme } from 'next-themes';

// components
import * as DutchC from './styles';

// icons
import { icons, IconType } from '../Icons';

interface IconButtonProps {
  icon: IconType;
  rounded?: boolean;
  className?: string;
  onClick?: (e: React.SyntheticEvent) => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  rounded = false,
  onClick,
  className,
}) => {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const Icon = icons[icon];

  return (
    <DutchC.IconButtonWrapper
      className={className}
      rounded={rounded ? 1 : 0}
      // onMouseDown={() => {
      //   setIsPressed(true);
      // }}
      onMouseUp={() => {
        setIsPressed(false);
      }}
      onTouchStart={() => {
        setIsPressed(true);
      }}
      onTouchEnd={() => {
        setIsPressed(false);
      }}
      onClick={onClick}
    >
      <Icon
        variant={'solid'}
        size="large"
        color={
          isPressed
            ? theme === 'light'
              ? 'white'
              : 'black'
            : theme === 'dark'
            ? 'white'
            : 'black'
        }
      />
    </DutchC.IconButtonWrapper>
  );
};

export default IconButton;
