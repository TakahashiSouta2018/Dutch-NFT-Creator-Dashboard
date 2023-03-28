import styled from 'styled-components';

export const MultiUploadWrapper = styled.div.attrs<{ className: string }>({
  className:
    'flex flex-col items-center justify-center bg-black/5 border border-black/10 hover:border-black/50 rounded-lg overflow-hidden w-60 cursor-pointer dark:border-white/10 dark:bg-white/5 dark:hover:border-white/50',
})``;

export const MultiUploadInner = styled.div.attrs<{ className: string }>({
  className: 'grid gap-1 grow p-2',
})``;

export const MultiUploadLastMediaWrapper = styled.div.attrs({
  className: 'relative overflow-hidden h-fit',
})``;

export const MultiUploadLastMediaInner = styled.div.attrs({
  className:
    'absolute inset-0 w-full bg-black/10 backdrop-blur rounded flex items-center justify-center text-black font-bold dark:bg-white/10 dark:text-black',
})``;

export const MultiUploadLastMediaContentWrapper = styled.div.attrs({
  className: 'relative flex items-end space-x-2 p-4 w-full',
})``;
export const MultiUploadLastMediaContentInner = styled.div.attrs({
  className: 'flex flex-col space-y-1 w-[80%] grow',
})``;
