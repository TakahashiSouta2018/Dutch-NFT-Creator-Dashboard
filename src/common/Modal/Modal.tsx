import React from 'react';
import clsx from 'clsx';

// components
import { IconButton } from '../Button';
import { IconType } from '../Icons';
import * as DutchC from './styles';

// types
interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
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

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen = false,
  className,
}) => {
  return (
    <DutchC.ModalWrapper className={clsx(isOpen ? 'visible' : ' invisible')}>
      <DutchC.ModalInner
        className={clsx(
          isOpen ? 'top-1/2 -translate-y-1/2 ' : 'top-0 -translate-y-full',
          `${className}`
        )}
      >
        {children}
      </DutchC.ModalInner>
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
