import React from 'react';

// components
import { IconButton } from '../Button';
import { IconType } from '../Icons';
import * as DutchC from './styles';

// types
interface ModalProps {
  children: React.ReactNode;
}

interface ModalHeadProps {
  icon?: IconType;
  title: string;
  onClose?: () => void;
  onBack?: () => void;
}

interface ModalBodyProps {
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <DutchC.ModalWrapper>
      <DutchC.ModalInner>{children}</DutchC.ModalInner>
    </DutchC.ModalWrapper>
  );
};

export const ModalHead: React.FC<ModalHeadProps> = ({
  icon,
  title,
  onClose,
  onBack,
}) => {
  return (
    <DutchC.ModalHeadWrapper>
      <DutchC.ModalTitleWrapper>
        {!!icon && <IconButton icon={icon} onClick={onBack} />}
        <DutchC.ModalTitle>{title}</DutchC.ModalTitle>
      </DutchC.ModalTitleWrapper>
      <IconButton icon="close" onClick={onClose} />
    </DutchC.ModalHeadWrapper>
  );
};

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return <DutchC.ModalBodyWrapper>{children}</DutchC.ModalBodyWrapper>;
};
