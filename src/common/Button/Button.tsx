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
  size = 'large',
  children,
  leftIcon,
  rightIcon,
  className,
  ref,
  ...rest
}) => {
  const LeftIcon = leftIcon ? icons[leftIcon] : null;
  const RightIcon = rightIcon ? icons[rightIcon] : null;

  return (
    <DutchC.ButtonWrapper className={className} size={size} {...rest}>
      {/* left icon */}
      {LeftIcon && (
        <LeftIcon
          variant="solid"
          size={size === 'large' ? 'medium' : 'small'}
          color="black"
        />
      )}

      <>{children}</>

      {/* right icon */}
      {RightIcon && (
        <RightIcon
          variant="solid"
          size={size === 'large' ? 'medium' : 'small'}
          color="white"
        />
      )}
    </DutchC.ButtonWrapper>
  );
};

export default Button;
