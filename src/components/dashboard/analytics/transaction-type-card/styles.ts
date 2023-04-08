import styled from 'styled-components';

export const TypeCardWrapper = styled.div.attrs({
  className: 'flex gap-4',
})``;

export const CardCircleIcon = styled.div.attrs<{ className: string }>({
  className: 'rounded-full w-3 h-3 mt-1',
})``;
