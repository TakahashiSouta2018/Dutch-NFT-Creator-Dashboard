import styled from 'styled-components';

export const TransactionTableControlWrapper = styled.div.attrs<{
  className?: string;
}>({
  className: 'flex items-center justify-between gap-x-2 py-2',
})``;

export const TransactionTableControlLeft = styled.div.attrs<{
  className?: string;
}>({
  className: 'flex items-center gap-x-2',
})``;

export const TransactionTableControlRight = styled.div.attrs<{
  className?: string;
}>({
  className: 'flex items-center gap-x-4',
})``;

export const TransactionTableControlTitle = styled.div.attrs<{
  className?: string;
}>({
  className:
    'text-black text-base font-bold whitespace-nowrap dark:text-white inline-flex items-center justify-center',
})``;

export const TransactionTableControlDate = styled.div.attrs<{
  className?: string;
}>({
  className:
    'text-sm text-black/70 font-normal whitespace-nowrap dark:text-white/70 inline-flex items-center justify-center',
})``;

export const TransactionTableControlResults = styled.div.attrs<{
  className?: string;
}>({
  className:
    'text-sm text-black/70 font-normal dark:text-white/70 whitespace-nowrap inline-flex items-center justify-center',
})``;

export const TransactionTableControlFilter = styled.div.attrs<{
  className?: string;
}>({
  className: 'flex items-center gap-x-2',
})``;
