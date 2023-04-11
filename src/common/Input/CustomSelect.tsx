import React from 'react';
import * as DutchC from './styles';

const sortList = [
  {
    name: 'Today',
    value: 'today',
  },
  {
    name: '1 Week',
    value: 'oneWeek',
  },
  {
    name: '2 Weeks',
    value: 'twoWeeks',
  },
];

interface CustomSelectProps {
  label?: string;
  selectedOption?: {
    name: string;
    value: string;
  };
  options?: {
    name: string;
    value: string;
  }[];
  onSelect?: () => void;
}

const CustomSelect: React.FC<CustomSelectProps> = (p: CustomSelectProps) => {
  return (
    <DutchC.CustomSelectWrapper>
      <DutchC.CustomSelectLabel>
        {p?.label && p.label + ':'}
      </DutchC.CustomSelectLabel>
      <DutchC.CustomSelect onSelect={p.onSelect}>
        {p.options?.map((item) => (
          <DutchC.CustomSelectOption
            key={item.name}
            value={item.value}
            className="text-black"
          >
            {item.name}
          </DutchC.CustomSelectOption>
        ))}
      </DutchC.CustomSelect>
    </DutchC.CustomSelectWrapper>
  );
};

export default CustomSelect;
