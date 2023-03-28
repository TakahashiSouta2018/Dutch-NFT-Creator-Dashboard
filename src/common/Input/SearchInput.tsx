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
  className,
  ref,
  ...rest
}) => {
  const { theme } = useTheme();

  return (
    <DutchC.SearchInputWrapper className={className}>
      {/* search icon */}
      <DutchC.SearchIconWrapper>
        <ISearch
          variant="solid"
          size="medium"
          color={theme === 'light' ? 'black' : 'white'}
          className={className}
        />
      </DutchC.SearchIconWrapper>

      <DutchC.SearchInput
        isShortCut={isShortCut}
        className={className}
        {...rest}
      />

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
