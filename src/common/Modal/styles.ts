import styled from 'styled-components';

// types

// components
// --- Modal
export const ModalWrapper = styled.div.attrs({
  className:
    'fixed top-0 left-0 w-screen h-screen z-10 bg-black/10 dark:bg-white/10 z-50 rounded-lg',
})``;

export const ModalInner = styled.div.attrs({
  className:
    'max-w-xl mx-auto mt-44 flex flex-col border border-black/10 dark: border-white/10 rounded shadow-lg bg-white dark:bg-dark-surface',
})``;

// --- Modal Head
export const ModalHeadWrapper = styled.div.attrs({
  className:
    'flex items-center justify-between px-6 h-14 border-b border-b-black/10 dark:border-b-white/10',
})``;

export const ModalTitleWrapper = styled.div.attrs({
  className: 'flex items-center gap-4',
})``;

export const ModalTitle = styled.h3.attrs({
  className: 'text-black font-bold dark:text-white',
})``;

export const ModalBodyWrapper = styled.div.attrs({
  className: 'mx-6 my-6',
})``;
