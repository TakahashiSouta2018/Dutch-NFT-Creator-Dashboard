import styled from 'styled-components';

import { SwitchButtonVariants } from '@/types';

type SwitchButtonProps = SwitchButtonVariants;

export const SwitchButtonWrapper = styled.button.attrs<{ className: string }>({
  className: `inline-flex items-center justify-center rounded-md cursor-pointer transition`,
})`
  background: ${(p: SwitchButtonProps) => p.bgColor};
`;

export const SwitchWrapper = styled.div.attrs({
  className:
    'inline-flex p-1 w-fit h-fit items-center justify-center border border-opacity-10 rounded-md',
})``;
