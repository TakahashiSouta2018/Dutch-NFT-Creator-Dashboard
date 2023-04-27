import React from 'react';
import { Modal, ModalHead, ModalBody } from '@/common';
import * as DutchC from './style';
import Image from 'next/image';
import ConnectionErrorIcon from '@/assets/connection_error.png';

const ConnectionError: React.FC = () => {
  return (
    <a
      href="https://medium.loopring.io/guide-how-to-use-the-l2-loopring-exchange-d67b6b8127f0"
      target="_blank"
    >
      <DutchC.ConnectionErrorWrapper>
        <Image src={ConnectionErrorIcon} alt="connect error" />
        <DutchC.TextSmall>
          <DutchC.TextBold>
            It seems your Loopring Layer 2 account is not activated yet!{' '}
          </DutchC.TextBold>
          Visit <DutchC.TextUnderlined>here</DutchC.TextUnderlined> to learn how
          to activate your Layer 2 account within 5 minutes and use our Creator
          Dashboard!
        </DutchC.TextSmall>
      </DutchC.ConnectionErrorWrapper>
    </a>
  );
};

export default ConnectionError;
