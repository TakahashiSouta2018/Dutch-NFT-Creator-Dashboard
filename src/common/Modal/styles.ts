import styled from 'styled-components';

// types

// components
// --- Modal
export const ModalWrapper = styled.div.attrs({
  className: 'fixed top-0 left-0 w-screen h-screen z-10 bg-black/10 z-50',
})``;

export const ModalInner = styled.div.attrs({
  className:
    'max-w-lg mx-auto mt-44 flex flex-col border border-black/10 rounded shadow-lg bg-white',
})``;

// --- Modal Head
export const ModalHeadWrapper = styled.div.attrs({
  className: 'flex items-center justify-between px-6 h-14',
})``;

export const ModalTitle = styled.h3.attrs({
  className: 'text-black font-bold',
})``;
