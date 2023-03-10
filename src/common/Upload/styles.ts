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
