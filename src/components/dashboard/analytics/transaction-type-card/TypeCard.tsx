import React from 'react';

import * as Dutch0x from './styles';

interface TypeCardProps {
  color: string;
  title: string;
  quantity: number;
}

const TypeCard: React.FC<TypeCardProps> = ({ color, title, quantity }) => {
  return (
    <Dutch0x.TypeCardWrapper>
      <Dutch0x.CardCircleIcon className={`bg-[${color}]`} />
      <div className="text-sm">
        <p className="font-bold">{title}</p>
        <p>{quantity}</p>
      </div>
    </Dutch0x.TypeCardWrapper>
  );
};

export default TypeCard;
