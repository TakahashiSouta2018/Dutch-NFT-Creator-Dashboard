import styled from 'styled-components';

export const ContentWrapper = styled.div.attrs({
  className: 'flex flex-col divide-y',
})``;

export const Content = styled.div.attrs({
  className: 'flex justify-between py-4 px-6 border',
})``;

export const ContentPrice = styled.div.attrs({
  className: 'flex gap-6',
})``;

export const ContentDepositWraper = styled.div.attrs({
  className: 'mt-8 text-sm flex justify-between relative',
})``;

export const ContentDepositTitleWrapper = styled.div.attrs({
  className: 'flex flex-col pl-6',
})``;

export const ContentButtonsWrapper = styled.div.attrs({
  className: 'flex gap-4',
})``;

export const ContentWalletIcon = styled.div.attrs({
  className: 'absolute -left-3 -top-2',
})``;

export const ContentWalletAbsoluteIcon = styled.div.attrs({
  className: 'absolute -left-1 -top-4',
})``;

export const TextContentDepositFund = styled.span.attrs({
  className: 'font-bold text-black/90 underline ml-2 cursor-pointer',
})``;

export const TextBold = styled.div.attrs({
  className: 'font-bold text-black/90',
})``;

export const TextNormal = styled.span.attrs({})``;

export const TextThin = styled.div.attrs({
  className: 'text-normal text-black/70',
})``;
