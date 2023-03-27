import styled from 'styled-components';

export const SwitchButtonWrapper = styled.button.attrs<{ className: string }>({
  className: `inline-flex items-center justify-center rounded-md cursor-pointer transition`,
})``;

export const SwitchWrapper = styled.div.attrs({
  className:
    'inline-flex p-1 w-fit h-fit items-center justify-center border border-opacity-10 rounded-md',
})``;
