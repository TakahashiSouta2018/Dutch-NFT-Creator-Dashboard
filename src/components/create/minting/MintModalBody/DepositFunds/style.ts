import styled from 'styled-components';

export const DepositFundContentCard = styled.div.attrs({
  className:
    'flex gap-4 p-2 border rounded-lg border-black/10 relative cursor-pointer',
})``;

export const DepostFundRightArrow = styled.div.attrs({
  className: 'absolute top-3 right-0',
})``;

export const DepositFundMethodWrapper = styled.div.attrs({
  className:
    'flex flex-col gap-4 p-4 border border-black/10 rounded-lg cursor-pointer dark:bg-white/10',
})``;

export const DepositFundMethodHead = styled.div.attrs({
  className: 'flex gap-4 relative',
})``;
export const DepositFundMethod = styled.div.attrs({
  className: 'flex flex-col',
})``;

export const IconCheck = styled.div.attrs({
  className: 'absolute right-0 top-0',
})``;

export const TextDepositBold = styled.div.attrs({
  className: 'font-bold my-auto ',
})``;

export const TextDepositSmall = styled.div.attrs({
  className: 'text-sm font-normal ',
})``;

export const DepositFundMethodContent = styled.div.attrs({
  className: 'flex flex-col gap-3 ml-10',
})``;
