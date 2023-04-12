import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

export const LRCIconSelector: React.FC<{ id: string }> = ({ id }) => {
  let Icon = require(`@/assets/LRCIcons/${id}.svg`);
  return (
    <>
      <Image src={Icon} alt={id} className="w-4 h-4" />
    </>
  );
};
