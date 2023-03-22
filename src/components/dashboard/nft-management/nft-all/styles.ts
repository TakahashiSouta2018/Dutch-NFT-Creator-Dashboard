import styled from 'styled-components';

export const NFTCardWrapper = styled.div.attrs({
  className: 'grid grid-cols-5 gap-3',
})``;

export const NFTAllWrapper = styled.div.attrs({
  className:
    'flex gap-5 rounded-lg bg-black p-6 w-full text-white cursor-pointer',
})``;

export const FlexCol = styled.div.attrs<{ className: string }>({
  className: 'flex flex-col',
})``;

export const TextXL = styled.div.attrs<{ className: string }>({
  className: 'font-bold text-xl',
})``;
