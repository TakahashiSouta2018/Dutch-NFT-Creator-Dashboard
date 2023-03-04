import React from 'react';

// components
import * as DutchC from './styles';

// icons
import { ISearch } from '../Icons';

// types
import { SearchInputVariant } from '@/types';

type SearchInputProps = JSX.IntrinsicElements['input'] & SearchInputVariant;

const SearchInput: React.FC<SearchInputProps> = ({
  isShortCut = false,
  placeholder = '',
  ...rest
}) => {
  return (
    <DutchC.SearchInputWrapper>
      {/* search icon */}
      <DutchC.SearchIconWrapper>
        <ISearch variant="solid" size="medium" color="black" />
      </DutchC.SearchIconWrapper>

      <DutchC.Input placeholder={placeholder} isShortCut={isShortCut} />

      {/* shortcut icon */}
      {isShortCut && (
        <DutchC.ShortCutWrapper>
          <DutchC.ShortCut>{'/'}</DutchC.ShortCut>
        </DutchC.ShortCutWrapper>
      )}
    </DutchC.SearchInputWrapper>
  );
};

export default SearchInput;
