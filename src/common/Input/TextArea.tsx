import React from 'react';

// components
import * as DutchC from './styles';

type TextAreaProps = JSX.IntrinsicElements['textarea'] & {
  label?: string;
  optional?: string;
  isCounter?: boolean;
};

const TextArea: React.FC<TextAreaProps> = ({
  label = '',
  optional = '',
  isCounter = false,
  className,
  ref,
  ...rest
}) => {
  return (
    <DutchC.TextAreaWrapper>
      {label && (
        <DutchC.TextAreaHeader>
          <DutchC.TextAreaLabelWrapper>
            <DutchC.TextAreaLabel>{label}</DutchC.TextAreaLabel>
            {optional && (
              <DutchC.TextAreaOptional>({optional})</DutchC.TextAreaOptional>
            )}
          </DutchC.TextAreaLabelWrapper>

          {isCounter && <DutchC.TextAreaCounter>0/100</DutchC.TextAreaCounter>}
        </DutchC.TextAreaHeader>
      )}
      <DutchC.Area {...rest} />
    </DutchC.TextAreaWrapper>
  );
};

export default TextArea;
