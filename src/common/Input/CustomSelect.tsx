import React from 'react';
import * as DutchC from './styles';

interface CustomSelectProps {
  label?: string;
  options?: {
    name: string;
    value: string;
  }[];
  value?: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = (p: CustomSelectProps) => {
  return (
    <DutchC.CustomSelectWrapper>
      <DutchC.CustomSelectLabel>
        {p?.label && p.label + ':'}
      </DutchC.CustomSelectLabel>
      <DutchC.CustomSelect
        onChange={(e) => p.onChange(e.currentTarget.value)}
        value={p?.value}
      >
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
