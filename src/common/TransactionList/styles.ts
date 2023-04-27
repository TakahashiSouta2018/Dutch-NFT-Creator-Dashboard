import styled from 'styled-components';

export const TransListWrapper = styled.div.attrs({
  className:
    'flex flex-col divide-y py-2 px-4 border border-black/10 dark:border-white/10 rounded-lg',
})``;

export const ListElementWrapper = styled.div.attrs({
  className: 'flex justify-between mr-4 align-middle items-center',
})``;

export const ActionInfoWrapper = styled.div.attrs({
  className: 'flex gap-4 items-center',
})``;

export const ActionInfoNo = styled.div.attrs({
  className: 'w-3 text-sm font-medium',
})``;

export const TextSmall = styled.div.attrs({
  className: 'text-sm font-medium',
})``;

export const StatusQueued = styled.div.attrs({
  className: 'text-sm font-bold text-black/50 dark:text-white/50',
})``;

export const StatusMinting = styled.div.attrs({
  className: 'flex items-center gap-1',
})``;

export const StatusSuccess = styled.div.attrs({
  className: 'text-sm font-bold text-accent-green',
})``;

export const StatusFailed = styled.div.attrs({
  className: 'text-sm font-bold text-accent-red',
})``;
