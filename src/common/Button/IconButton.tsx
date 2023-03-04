import React, { useState } from 'react';

// components
import * as DutchC from './styles';

// icons
import { icons, IconType } from '../Icons';

interface IconButtonProps {
  icon: IconType;
}

const IconButton: React.FC<IconButtonProps> = ({ icon }) => {
  const [isPressed, setIsPressed] = useState(false);
  const Icon = icons[icon];

  return (
    <DutchC.IconButtonWrapper
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      <Icon
        variant={isPressed ? 'outlined' : 'solid'}
        size="large"
        color={isPressed ? 'white' : 'black'}
      />
    </DutchC.IconButtonWrapper>
  );
};

export default IconButton;
