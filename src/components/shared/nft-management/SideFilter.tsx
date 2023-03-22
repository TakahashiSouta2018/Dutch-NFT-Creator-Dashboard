import React from 'react';
import * as Icons from '@/common';
import { IconButton, SearchInput, TextInput } from '@/common';
import * as DutchC from './styles';

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
    <DutchC.FilterWrapper
      className={openFilter ? '' : ' absolute left-0 -translate-x-full'}
    >
      <DutchC.FilterHeader>
        <IconButton icon="close" onClick={onFilter} />
        <DutchC.TextFilterTitle>Filters</DutchC.TextFilterTitle>
      </DutchC.FilterHeader>

      <DutchC.FilterCollectionsWrapper>
        <DutchC.FilterInner>
          <DutchC.TextBold>Available NFTs</DutchC.TextBold>
          <DutchC.FilterRow>
            <DutchC.TextReset>Reset</DutchC.TextReset>
            <Icons.IChevronUp />
          </DutchC.FilterRow>
        </DutchC.FilterInner>

        <DutchC.FilterRow>
          <TextInput placeholder="25" />
          <DutchC.TextBold>to</DutchC.TextBold>
          <TextInput placeholder="30" />
        </DutchC.FilterRow>
      </DutchC.FilterCollectionsWrapper>

      <DutchC.FilterCol>
        <DutchC.FilterInner>
          <DutchC.TextBold>Collections</DutchC.TextBold>
          <DutchC.FilterRow>
            <DutchC.TextReset>Reset</DutchC.TextReset>
            <Icons.IChevronUp />
          </DutchC.FilterRow>
        </DutchC.FilterInner>
        <DutchC.FilterCol>
          {collections.map((item) => (
            <DutchC.FilterRow className="px-2 py-1" key={item}>
              <TextInput type="checkbox" />
              <DutchC.TextEllipsis>{item}</DutchC.TextEllipsis>
            </DutchC.FilterRow>
          ))}
        </DutchC.FilterCol>
      </DutchC.FilterCol>

      <DutchC.FilterCol className="p-4">
        <DutchC.TextBold>Propertises</DutchC.TextBold>
        <DutchC.FilterInner>
          <DutchC.TextBold>Color</DutchC.TextBold>
          <Icons.IChevronUp />
        </DutchC.FilterInner>
        <SearchInput placeholder="Search" />
        <DutchC.FilterCol>
          {colors.map((color) => (
            <DutchC.FilterRow className="px-2 py-1" key={color}>
              <TextInput type="checkbox" />
              <DutchC.TextBold className="overflow-hidden ">
                {color}
              </DutchC.TextBold>
            </DutchC.FilterRow>
          ))}

          <DutchC.FilterRow className="px-2 py-1">View more</DutchC.FilterRow>
        </DutchC.FilterCol>
      </DutchC.FilterCol>

      <DutchC.FilterCol className="px-2 py-1">
        {langs.map((lang) => (
          <DutchC.FilterInner className="gap-2 " key={lang}>
            <DutchC.TextBold>{lang}</DutchC.TextBold>
            <Icons.IChevronDown />
          </DutchC.FilterInner>
        ))}
      </DutchC.FilterCol>
    </DutchC.FilterWrapper>
  );
};

export default SideFilter;
