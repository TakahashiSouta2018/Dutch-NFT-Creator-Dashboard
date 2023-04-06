import styled from 'styled-components';

export const TransactionTableWrapper = styled.div.attrs<{
  className?: string;
}>({
  className: 'flex flex-col gap-y-2',
})``;

export const TransactionTableFlexRowWrapper = styled.div.attrs<{
  className?: string;
}>({
  className: 'flex items-center h-fit gap-x-1',
})``;

export const TransactionTableFlexColWrapper = styled.div.attrs<{
  className?: string;
}>({
  className: 'flex flex-col justify-around h-fit',
})``;
