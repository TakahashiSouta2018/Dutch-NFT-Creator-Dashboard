import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

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
    disabled?: boolean;
  };

const Button: React.FC<ButtonProps> = ({
  size = 'large',
  children,
  leftIcon,
  rightIcon,
  className,
  ref,
  loading,
  disabled,
  ...rest
}) => {
  const LeftIcon = leftIcon ? icons[leftIcon] : null;
  const RightIcon = rightIcon ? icons[rightIcon] : null;

  return (
    <DutchC.ButtonWrapper
      className={className}
      size={size}
      {...rest}
      disabled={disabled}
    >
      {loading ? (
        <ThreeDots
          height="20"
          width="30"
          radius="9"
          color="white"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      ) : (
        <>
          {LeftIcon && (
            <LeftIcon
              variant="solid"
              size={size === 'large' ? 'medium' : 'small'}
              color="black"
            />
          )}
          <>{children}</>
          {RightIcon && (
            <RightIcon
              variant="solid"
              size={size === 'large' ? 'medium' : 'small'}
              color="white"
            />
          )}
        </>
      )}
    </DutchC.ButtonWrapper>
  );
};

export default Button;
