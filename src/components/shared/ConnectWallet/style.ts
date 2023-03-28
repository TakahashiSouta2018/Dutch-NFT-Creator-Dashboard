import styled from 'styled-components';

export const LoginWrapper = styled.div.attrs({
  className: 'flex flex-col gap-4',
})``;

export const AccountWrapper = styled.div.attrs({
  className: 'p-2 rounded-lg border border-black/10 flex justify-between',
})``;

export const Account = styled.div.attrs({
  className: 'pl-3 flex gap-6 align-middle items-center',
})``;

export const ConnectMetaMaskWrapper = styled.div.attrs({
  className: 'flex flex-col gap-3 items-center my-10',
})``;

export const ConnectionErrorWrapper = styled.div.attrs({
  className: 'flex flex-col gap-3 items-center',
})``;

export const TextNormal = styled.div.attrs({})``;

export const TextBold = styled.div.attrs({
  className: 'font-bold',
})``;

export const TextSmall = styled.div.attrs({
  className: 'text-sm text-center',
})``;

export const TextUnderlined = styled.span.attrs({
  className: 'underline cursor-pointer',
})``;
