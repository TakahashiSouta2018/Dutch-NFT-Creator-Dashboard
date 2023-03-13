import styled from 'styled-components';

// types

// components
// --- Single Upload
export const ImageUploadWrapper = styled.div.attrs({
  className:
    'relative flex flex-col w-full h-full items-center justify-center bg-black/5 border border-black/10 rounded-lg text-sm text-black/70 dark:border-white/10 dark:bg-white/5 overflow-hidden',
})``;

export const ImageUploadActions = styled.div.attrs({
  className:
    'absolute left-0 bottom-0 flex items-center justify-between backdrop-blur bg-black/50 dark:bg-black/70 w-full h-14 p-2 z-10',
})``;

// --- Multi Image Upload
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

export const MultiUploadActions = styled.div.attrs({
  className:
    'absolute left-0 bottom-0 flex items-center justify-between backdrop-blur bg-black/50 dark:bg-black/70 w-full h-14 p-3 pl-4 z-10',
})``;

export const MultiUploadFilesLengthLabel = styled.label.attrs({
  className: 'text-white whitespace-nowrap font-bold',
})``;

// --- CSV upload
export const CSVUploadWrapper = styled.div.attrs({
  className:
    'relative flex flex-col w-full min-h-[210px] items-center justify-center bg-black/5 border border-black/10 rounded-lg text-sm text-black/70 dark:border-white/10 dark:bg-white/5 overflow-hidden',
})``;

export const CSVUploadInner = styled.div.attrs({
  className: 'flex flex-col items-center justify-center space-y-2.5 mb-14',
})``;

export const CSVUploadFileName = styled.label.attrs({
  className: 'text-sm text-black/70 dark:text-white/70',
})``;

export const CSVUploadActions = styled.div.attrs({
  className:
    'absolute left-0 bottom-0 flex items-center justify-between backdrop-blur bg-black/50 dark:bg-black/70 w-full h-14 p-3 pl-4 z-10',
})``;

export const CSVUploadMetaLengthLabel = styled.label.attrs({
  className: 'text-white whitespace-nowrap font-bold',
})``;
