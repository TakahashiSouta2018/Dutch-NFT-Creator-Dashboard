import styled from 'styled-components';

export const UnitWrapper = styled.div.attrs({
  className:
    'flex p-2 gap-2 border border-black/10 rounded-lg bg-black/10 items-center',
})``;

export const UnitContent = styled.div.attrs({
  className: 'flex-grow relative text-xs ',
})``;

export const UnitNotSelected = styled.div.attrs({
  className:
    'absolute right-0.5 top-0.5 w-4 h-4 border border-black/20 rounded-full border-box',
})``;
