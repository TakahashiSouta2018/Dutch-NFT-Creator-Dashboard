import React from 'react';

// components
import * as DutchC from './styles';

// icons
import { icons } from '../Icons';
import type { IconType } from '../Icons';

type InputProps = JSX.IntrinsicElements['input'] & {
  label?: string;
  helper?: string;
  icon?: IconType;
};

const TextInput: React.FC<InputProps> = ({
  label = '',
  helper = '',
  ref,
  className,
  icon,
  ...rest
}) => {
  const Icon = icon ? icons[icon] : null;
  const { disabled, required } = rest;

  return (
    <DutchC.InputWrapper disabled={disabled ? 1 : 0}>
      {label && (
        <DutchC.InputLabel>
          {label}
          {required && '*'}
        </DutchC.InputLabel>
      )}
      <DutchC.InputInner>
        <DutchC.Input {...rest} hasIcon={!!Icon ? 1 : 0} />

        {Icon && (
          <DutchC.InputIconWrapper>
            <Icon variant="solid" size="medium" color="black" />
          </DutchC.InputIconWrapper>
        )}
      </DutchC.InputInner>
      {helper && <DutchC.InputHelper>{helper}</DutchC.InputHelper>}
    </DutchC.InputWrapper>
  );
};

export default TextInput;
