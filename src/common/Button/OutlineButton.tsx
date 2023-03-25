import React from 'react';

// components
import * as DutchC from './styles';
import { icons } from '../Icons';
import type { IconType } from '../Icons';

// types
import { ButtonVariants } from '@/types';

type OutlineButtonButtonProps = JSX.IntrinsicElements['button'] &
  ButtonVariants & {
    children: React.ReactNode;
    loading?: boolean;
    leftIcon?: IconType;
    rightIcon?: IconType;
  };

const OutlineButton: React.FC<OutlineButtonButtonProps> = ({
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
    <DutchC.OutlineButtonWrapper size={size} {...rest} className={className}>
      {/* left icon */}
      {LeftIcon && (
        <LeftIcon
          variant="solid"
          size={size === 'large' ? 'medium' : 'small'}
          color="white"
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
    </DutchC.OutlineButtonWrapper>
  );
};

export default OutlineButton;
