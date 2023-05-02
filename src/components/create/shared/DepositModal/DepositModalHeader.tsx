import React from 'react';
import { ModalHead } from '@/common';

const DepositModalHeader: React.FC<{ title: string }> = ({
  title,
}): JSX.Element => {
  return (
    <ModalHead
      icon={'left-arrow'}
      title={title}
      onClose={() => {
        console.log('close');
      }}
      onBack={() => {
        console.log('back');
      }}
    />
  );
};

export default DepositModalHeader;
