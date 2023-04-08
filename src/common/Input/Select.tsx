import React from 'react';
import { InputLabel } from './styles';

interface OptionProps {
  key: string;
  value: string;
}

interface SelectProps {
  options: OptionProps[];
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select: React.FC<SelectProps> = ({ options, className, onChange }) => {
  return (
    <div className="relative ">
      <InputLabel title="Timezone" />
      <select
        className={`py-2 px-3 text-sm focus:outline-none border border-black/10 rounded-md w-full ${className}`}
        onChange={onChange}
      >
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
