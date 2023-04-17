import React from 'react';
import * as Icons from '@/common';
import { IconButton, SearchInput, TextInput } from '@/common';

interface SideFilterProps {
  openFilter: boolean;
  onFilter: () => void;
}

const collections = ['🍎🍌🍍The Fruit Salad Game🍆🥦🥕', 'Rabbit Stories 🥕 '];
const colors = [
  'Brown Red',
  'Green Brown',
  'Yellow Brown',
  'Red Green',
  'Black Green',
];
const langs = ['Latin', 'Other', 'Family', 'Flavor', 'Animation'];

const SideFilter: React.FC<SideFilterProps> = ({
  openFilter,
  onFilter,
}): JSX.Element => {
  return (
    <div
      className={`
        flex flex-col divide-y w-[14vw] text-sm gap-2 p-2 
        transition border border-black/10 rounded-lg bg-white
        ${openFilter && 'absolute left-0 -translate-x-full'}
      `}
    >
      <div className="flex gap-2 items-center">
        <IconButton icon="close" onClick={onFilter} />
        <div className="font-bold text-black/50">Filters</div>
      </div>

      <div className="flex flex-col p-2 gap-2">
        <div className="flex justify-between p-2">
          <div className="font-bold text-black/70">Available NFTs</div>
          <div className="flex gap-2 items-center">
            <div className="text-xs text-black/70 font-normal">Reset</div>
            <Icons.IChevronUp />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <TextInput
            placeholder="25"
            className="dark:bg-white dark:text-black dark:placeholder:text-black  dark:accent-white"
          />
          <div className="font-bold text-black/70">to</div>
          <TextInput
            placeholder="30"
            className="dark:bg-white dark:text-black dark:placeholder:text-black  dark:accent-white"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <div className="flex justify-between p-2">
          <div className="font-bold text-black/70">Collections</div>
          <div className="flex gap-2 items-center">
            <div className="text-xs text-black/70 font-normal">Reset</div>
            <Icons.IChevronUp />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2">
          {collections.map((item) => (
            <div className="px-2 py-1 flex gap-2 items-center" key={item}>
              <TextInput
                type="checkbox"
                className={
                  'dark:bg-white dark:text-black/100 dark:placeholder:text-black dark:border-black dark:accent-white'
                }
              />
              <div className="w-[10vw] whitespace-nowrap  overflow-hidden overflow-ellipsis font-normal text-sm text-black/70">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <div className="flex justify-between p-2">
          <div className="font-bold text-black/70">Propertises</div>
          <div className="flex gap-2 items-center">
            <div className="text-xs text-black/70 font-normal">Color</div>
            <Icons.IChevronUp />
          </div>
        </div>

        <SearchInput
          placeholder="Search"
          className={
            'dark:bg-white dark:text-black/100 dark:placeholder:text-black dark:border-black dark:accent-white'
          }
        />
        <div className="flex flex-col gap-2 p-2">
          {colors.map((color) => (
            <div className="px-2 py-1 flex gap-2 items-center" key={color}>
              <TextInput
                type="checkbox"
                className={
                  'dark:bg-white dark:text-black/100 dark:placeholder:text-black dark:border-black dark:accent-white'
                }
              />
              <div className="overflow-hidden font-bold text-black/70">
                {color}
              </div>
            </div>
          ))}

          <div className="px-2 py-1 flex gap-2 items-center">View more</div>
        </div>
      </div>

      <div className="px-2 py-1 flex flex-col gap-2 p-2">
        {langs.map((lang) => (
          <div className="gap-2 flex justify-between p-2" key={lang}>
            <div className="font-bold text-black/70">{lang}</div>
            <Icons.IChevronDown />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideFilter;
