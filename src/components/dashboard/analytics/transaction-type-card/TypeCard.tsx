import React from 'react';

interface TypeCardProps {
  color: string;
  title: string;
  quantity: number;
}

const TypeCard: React.FC<TypeCardProps> = ({ color, title, quantity }) => {
  return (
    <div className="flex gap-4">
      <div className={`rounded-full w-3 h-3 mt-1 bg-[${color}]`} />
      <div className="text-sm">
        <p className="font-bold">{title}</p>
        <p>{quantity}</p>
      </div>
    </div>
  );
};

export default TypeCard;
