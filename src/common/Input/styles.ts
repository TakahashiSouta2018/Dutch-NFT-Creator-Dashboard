import styled from 'styled-components';
import { SearchInputVariant } from '@/types';

// types

type SearchInputWrapperProps = SearchInputVariant;

// components
export const Input = styled.input.attrs({
  className:
    'outline-none w-full inline-flex items-center justify-center h-9.5 border border-black/10 rounded-lg px-10 text-sm peer placeholder:text-black/70 focus:border-black',
})`
  ${(p: SearchInputWrapperProps) => !p.isShortCut && 'padding-right: 10px;'}
`;

// --- Text Input

// --- Search Input
export const SearchInputWrapper = styled.div.attrs({
  className: 'relative w-full',
})``;

export const SearchIconWrapper = styled.div.attrs({
  className:
    'absolute top-0 left-0 bottom-0 w-10 h-full inline-flex items-center justify-center',
})``;

export const ShortCutWrapper = styled.div.attrs({
  className:
    'absolute top-0 right-0 bottom-0 w-10 h-full inline-flex items-center justify-center',
})``;

export const ShortCut = styled.div.attrs({
  className: 'w-5 h-5 bg-black/10 rounded-sm flex items-center justify-center',
})``;
