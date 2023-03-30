import styled from 'styled-components';

export const GasInfoWrapper = styled.div.attrs({
  className: 'relative flex flex-col items-end w-fit',
})``;

export const GasInfoButtonWrapper = styled.button.attrs<{
  className?: string;
}>({
  className:
    'px-2 py-1.5 flex items-center justify-between gap-x-2.5 w-[170px]',
})``;

export const GasInfo = styled.div.attrs({
  className:
    'absolute top-10 right-0 z-50 bg-gray-100 rounded-lg p-3 flex flex-col items-center w-[252px] border border-black/10 dark:border-white/10 dark:bg-gray-900',
})`
  ${(p: { isOpen: boolean }) => (!p.isOpen ? 'display:none' : '')}
`;

export const GasInfoHeaderWrapper = styled.div.attrs({
  className: 'flex items-center justify-between w-full',
})``;
