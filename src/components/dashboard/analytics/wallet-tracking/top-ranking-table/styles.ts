import styled from 'styled-components';

export const TopRankingTableWrapper = styled.div.attrs<{
  className?: string;
}>({
  className: 'flex flex-col gap-y-2',
})``;

export const TopRankingTableFlexRowWrapper = styled.div.attrs<{
  className?: string;
}>({
  className: 'flex items-center gap-x-1',
})``;

export const TopRankingTableFlexColWrapper = styled.div.attrs<{
  className?: string;
}>({
  className: 'flex flex-col justify-around h-fit',
})``;
