import styled from 'styled-components';

export const TransListWrapper = styled.div.attrs({
  className:
    'flex flex-col divide-y py-2 px-4 border border-black/10 rounded-lg',
})``;

export const ListElementWrapper = styled.div.attrs({
  className: 'flex justify-between mr-4 align-middle items-center',
})``;

export const ActionInfoWrapper = styled.div.attrs({
  className: 'flex gap-4 align-middle items-center',
})``;

export const TextSmall = styled.span.attrs({
  className: 'text-sm font-medium',
})``;

export const StatusQueued = styled.span.attrs({
  className: 'text-sm font-bold text-black/50',
})``;

export const StatusMinting = styled.div.attrs({
  className: 'text-sm font-bold text-primary-orange relative',
})``;

export const StatusSuccess = styled.span.attrs({
  className: 'text-sm font-bold text-accent-green',
})``;

export const StatusFailed = styled.span.attrs({
  className: 'text-sm font-bold text-accent-red',
})``;
