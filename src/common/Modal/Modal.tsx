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
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <DutchC.ModalWrapper>
      <DutchC.ModalInner>{children}</DutchC.ModalInner>
    </DutchC.ModalWrapper>
  );
};

export const ModalHead: React.FC<ModalHeadProps> = ({ title }) => {
  return (
    <DutchC.ModalHeadWrapper>
      <DutchC.ModalTitle>{title}</DutchC.ModalTitle>
      <IconButton icon="close" />
    </DutchC.ModalHeadWrapper>
  );
};

export const ModalBody: React.FC = () => {
  return <></>;
};
