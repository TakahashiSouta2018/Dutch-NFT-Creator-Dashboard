import React from 'react';
import * as DutchC from './styles';

const initialSortList = [
  {
    name: 'Newest First',
    value: 'newest',
  },
  {
    name: 'Oldest First',
    value: 'oldest',
  },
];

type SortListType = {
  name: string;
  value: string;
};

interface SortSelectType {
  placeHolder?: string;
  title?: string;
  sortList?: SortListType[];
}

const SortSelect: React.FC<SortSelectType> = ({
  placeHolder = 'Sort By:',
  title = 'Recently Added',
  sortList = initialSortList,
}) => {
  return (
    <div>
      <div className="flex border border-gray-300 rounded-lg px-3 py-2 text-black/70 dark:border-white/10 dark:text-white/70 dark:bg-dark-surface items-center">
        <div className="w-14 text-sm font-normal dark:text-white/70">
          {placeHolder}
        </div>

        <select
          id="states"
          className="bg-transparent text-sm font-medium pr-2 cursor-pointer dark:text-white/70"
        >
          {!!sortList.length &&
            sortList.map((item) => (
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
