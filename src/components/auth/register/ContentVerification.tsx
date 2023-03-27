import React from 'react';
import Image from 'next/image';
import * as DutchC from './styles';
import VerifySentIcon from '@/assets/verify_sent.png';

const Verification = () => {
  return (
    <DutchC.VerifyModalWrapper>
      <Image src={VerifySentIcon} alt="verify_sent" />
      <DutchC.TextVerify>
        We have sent you an email for verification. Please check.
      </DutchC.TextVerify>
    </DutchC.VerifyModalWrapper>
  );
};

export default Verification;
