import styled from 'styled-components';

export const AnalyticsCardWrapper = styled.div.attrs<{ className?: string }>({
  className: 'px-4 py-3 flex-1 border border-black/10 flex flex-col gap-2',
})``;

export const AnalyticsCardTrending = styled.div.attrs({
  className: 'flex gap-1 text-sm items-center',
})``;
