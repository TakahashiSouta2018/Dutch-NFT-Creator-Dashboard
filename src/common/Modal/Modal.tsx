import React from 'react';

// components
import { IconButton } from '../Button';
import * as DutchC from './styles';

// types
interface ModalProps {
  children: React.ReactNode;
}

interface ModalHeadProps {
  title: string;
  onClose: () => void;
}

interface ModalBodyProps {
  children: React.ReactNode;
}

interface ModalFooterProps {
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <DutchC.ModalWrapper>
      <DutchC.ModalInner>{children}</DutchC.ModalInner>
    </DutchC.ModalWrapper>
  );
};

export const ModalHead: React.FC<ModalHeadProps> = ({ title, onClose }) => {
  return (
    <DutchC.ModalHeadWrapper>
      <DutchC.ModalTitle>{title}</DutchC.ModalTitle>
      <IconButton icon="close" onClick={onClose} />
    </DutchC.ModalHeadWrapper>
  );
};

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return <DutchC.ModalBodyWrapper>{children}</DutchC.ModalBodyWrapper>;
};
