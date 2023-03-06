import React from 'react';
import { useTheme } from 'next-themes';

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
  const { theme } = useTheme();

  return (
    <DutchC.SearchInputWrapper>
      {/* search icon */}
      <DutchC.SearchIconWrapper>
        <ISearch
          variant="solid"
          size="medium"
          color={theme === 'light' ? 'black' : 'white'}
        />
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
