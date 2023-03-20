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
      <div className="flex border border-gray-300 rounded-lg px-3 py-2 text-black/70">
        <div className="w-14 text-sm font-normal">Sort By:</div>

        <select
          id="states"
          className="bg-white font-medium pr-2 cursor-pointer"
        >
          <option selected>Recently Added</option>
          {sortList.map((item) => (
            <option key={item.name} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortSelect;
