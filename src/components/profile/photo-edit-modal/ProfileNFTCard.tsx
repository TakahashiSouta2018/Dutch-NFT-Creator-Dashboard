import React, { useState } from 'react';
import Image from 'next/image';

import * as Icons from '@/common/Icons';
import * as DutchC from './styles';

interface ProfileNFTCardProps {
  src: string;
  title: string;
  collection: string;
}
const ProfileNFTCard: React.FC<ProfileNFTCardProps> = ({
  src,
  title,
  collection,
}) => {
  const [isSelect, setSelect] = useState(false);
  return (
    <DutchC.ProfileNFTCardWrapper
      className={isSelect ? 'border-black/70 border-2' : 'border-black/10'}
      onClick={() => {
        setSelect(!isSelect);
      }}
    >
      <DutchC.ProfileNFTCardIcon>
        {isSelect ? (
          <Icons.ICheckCircle size="large" />
        ) : (
          <DutchC.ProfileNFTCardIconInner />
        )}
      </DutchC.ProfileNFTCardIcon>
      {src && <Image src={src} alt={src} width={185} height={185} />}
      <DutchC.ProfileNFTCardContent>
        <DutchC.ProfileNFTCardTitle>{title}</DutchC.ProfileNFTCardTitle>
        <DutchC.ProfileNFTCardCollection>
          {collection}
        </DutchC.ProfileNFTCardCollection>
      </DutchC.ProfileNFTCardContent>
    </DutchC.ProfileNFTCardWrapper>
  );
};

export default ProfileNFTCard;
