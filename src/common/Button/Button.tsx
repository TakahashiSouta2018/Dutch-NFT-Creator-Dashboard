import React from 'react';

// components
import * as DutchC from './styles';
import { icons } from '../Icons';
import type { IconType } from '../Icons';

// types
import { ButtonVariants } from '@/types';

type ButtonProps = JSX.IntrinsicElements['button'] &
  ButtonVariants & {
    children: React.ReactNode;
    loading?: boolean;
    leftIcon?: IconType;
    rightIcon?: IconType;
  };

const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'large',
  children,
  disabled,
  leftIcon,
  rightIcon,
}) => {
  const LeftIcon = leftIcon ? icons[leftIcon] : null;
  const RightIcon = rightIcon ? icons[rightIcon] : null;

  return (
    <DutchC.ButtonWrapper variant={variant} size={size} disabled={disabled}>
      {/* left icon */}
      {LeftIcon && (
        <LeftIcon
          variant="solid"
          size={size === 'large' ? 'medium' : 'small'}
          color={variant === 'solid' ? 'white' : 'black'}
        />
      )}

      <>{children}</>

      {/* right icon */}
      {RightIcon && (
        <RightIcon
          variant="solid"
          size={size === 'large' ? 'medium' : 'small'}
          color={variant === 'solid' ? 'white' : 'black'}
        />
      )}
    </DutchC.ButtonWrapper>
  );
};

export default Button;
