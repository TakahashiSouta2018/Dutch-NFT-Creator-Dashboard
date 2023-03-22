import React from 'react';

// components
import { IconButton } from '../Button';
import { IconType } from '../Icons';
import * as DutchC from './styles';

// types
interface ModalProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalHeadProps {
  icon?: IconType;
  title: string;
  onClose?: () => void;
  onBack?: () => void;
  children?: React.ReactNode;
}

interface ModalBodyProps {
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children, className }) => {
  return (
    <DutchC.ModalWrapper>
      <DutchC.ModalInner className={className}>{children}</DutchC.ModalInner>
    </DutchC.ModalWrapper>
  );
};

export const ModalHead: React.FC<ModalHeadProps> = ({
  icon,
  title,
  onClose,
  onBack,
  children,
}) => {
  return (
    <DutchC.ModalHeadWrapper>
      <DutchC.ModalTitleWrapper>
        {!!icon && <IconButton icon={icon} onClick={onBack} />}
        <DutchC.ModalTitle>{title}</DutchC.ModalTitle>
        {children}
      </DutchC.ModalTitleWrapper>
      <IconButton icon="close" onClick={onClose} />
    </DutchC.ModalHeadWrapper>
  );
};

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return <DutchC.ModalBodyWrapper>{children}</DutchC.ModalBodyWrapper>;
};
