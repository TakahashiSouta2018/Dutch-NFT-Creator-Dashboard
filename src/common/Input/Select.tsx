import React from 'react';
import { InputLabel } from './styles';

interface OptionProps {
  key: string;
  value: string;
}

interface SelectProps {
  options: OptionProps[];
}
const Select: React.FC<SelectProps> = ({ options }) => {
  return (
    <div className="relative ">
      <InputLabel title="Timezone" />
      <select className="py-2 px-3 text-sm focus:outline-none border border-black/10 rounded-md w-full">
        {options.map((opt) => (
          <option value={opt.key} key={opt.key}>
            {opt.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
