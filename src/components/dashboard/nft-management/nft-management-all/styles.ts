import styled from 'styled-components';

export const SyncNFTsWrapper = styled.div.attrs({
  className:
    'flex gap-5 rounded-lg bg-black p-6 w-full text-white cursor-pointer',
})``;

export const FlexCol = styled.div.attrs<{ className: string }>({
  className: 'flex flex-col',
})``;

export const TextXL = styled.div.attrs<{ className: string }>({
  className: 'font-bold text-xl',
})``;
