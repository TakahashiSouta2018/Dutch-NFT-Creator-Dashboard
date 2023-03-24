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

const SortSelect: React.FC = () => {
  return (
    <div>
      <div className="flex border border-gray-300 rounded-lg px-3 py-2 text-black/70 dark:border-white/10 dark:text-white/70 dark:bg-dark-surface">
        <div className="w-14 text-sm font-normal dark:text-white/70">
          Sort By:
        </div>

        <select
          id="states"
          className="bg-transparent font-medium pr-2 cursor-pointer dark:text-white/70"
        >
          <option className="text-black">Recently Added</option>
          {sortList.map((item) => (
            <option key={item.name} value={item.value} className="text-black">
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortSelect;
