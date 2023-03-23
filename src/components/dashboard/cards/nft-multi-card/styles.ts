import styled from 'styled-components';

export const MultiUploadWrapper = styled.div.attrs<{ className: string }>({
  className:
    'flex flex-col items-center justify-center bg-black/5 rounded-lg text-sm text-black/70 dark:border-white/10 dark:bg-white/5 overflow-hidden w-60 cursor-pointer',
})``;

export const MultiUploadInner = styled.div.attrs<{ className: string }>({
  className: 'grid  p-2 pb-4 gap-1 grow',
})``;

export const MultiUploadLastMediaWrapper = styled.div.attrs({
  className: 'relative overflow-hidden h-fit',
})``;

export const MultiUploadLastMediaInner = styled.div.attrs({
  className:
    'absolute inset-0 w-full bg-black/10 backdrop-blur rounded flex items-center justify-center text-black font-bold dark:bg-white/10 dark:text-black',
})``;

export const MultiUploadLastMediaContentWrapper = styled.div.attrs({
  className: 'flex gap-2 items-end mx-4',
})``;
export const MultiUploadLastMediaContentInner = styled.div.attrs({
  className: 'flex flex-col gap-1',
})``;
