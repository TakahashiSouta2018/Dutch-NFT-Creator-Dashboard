import styled from 'styled-components';

export const MultiUploadWrapper = styled.div.attrs({
  className:
    'relative flex flex-col w-full min-h-[210px] items-center justify-center bg-black/5 border border-black/10 rounded-lg text-sm text-black/70 dark:border-white/10 dark:bg-white/5 overflow-hidden',
})``;

export const MultiUploadInner = styled.div.attrs({
  className: 'grid grid-cols-5 p-2 pb-[58px] gap-1 grow',
})``;

export const MultiUploadLastMediaWrapper = styled.div.attrs({
  className: 'relative overflow-hidden h-fit',
})``;

export const MultiUploadLastMediaInner = styled.div.attrs({
  className:
    'absolute inset-0 w-full bg-black/10 backdrop-blur rounded flex items-center justify-center text-white font-bold dark:bg-white/10 dark:text-black',
})``;
