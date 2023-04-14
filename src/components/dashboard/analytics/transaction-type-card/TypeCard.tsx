import React from 'react';

import * as DutchC from './styles';

interface TypeCardProps {
  color: string;
  title: string;
  quantity: number;
}

const TypeCard: React.FC<TypeCardProps> = ({ color, title, quantity }) => {
  return (
    <DutchC.TypeCardWrapper>
      <DutchC.CardCircleIcon className={`bg-[${color}]`} />
      <div className="text-sm">
        <p className="font-bold">{title}</p>
        <p>{quantity}</p>
      </div>
    </DutchC.TypeCardWrapper>
  );
};

export default TypeCard;
