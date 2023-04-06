import styled from 'styled-components';
import { SearchInputVariant } from '@/types';

// types
type SearchInputProps = SearchInputVariant;

type InputProps = {
  hasIcon?: number;
};

type InputWrapperProps = {
  disabled?: number;
};

// components
// --- Text Input
export const InputWrapper = styled.div.attrs<{ className: string }>({
  className: 'flex flex-col space-y-1',
})`
  ${(p: InputWrapperProps) => (p.disabled ? 'opacity: .3;' : '')}
`;

export const Input = styled.input.attrs<{ className: string }>({
  className:
    'outline-none w-full inline-flex items-center justify-center h-9.5 border border-black/10 hover:border-black rounded-lg px-3 text-sm peer placeholder:text-black/70 focus:border-black dark:border-white/10 dark:bg-white-surface dark:placeholder:text-white/70 transition disabled:pointer-events-none',
})`
  ${(p: InputProps) => (p.hasIcon ? 'padding-right: 40px;' : '')}
`;

export const InputInner = styled.div.attrs<{ className: string }>({
  className: 'relative',
})``;

export const InputIconWrapper = styled.div.attrs<{ className: string }>({
  className:
    'absolute top-0 right-0 bottom-0 w-10 h-full inline-flex items-center justify-center',
})``;

export const InputLabel = styled.label.attrs<{ className: string }>({
  className: 'text-sm text-black dark:text-white',
})``;

export const InputHelper = styled.label.attrs({
  className: 'text-xs whitespace-nowrap text-black/70 dark:text-white/70',
})``;

// --- Search Input
export const SearchInputWrapper = styled.div.attrs<{ className: string }>({
  className: 'relative w-full text-black',
})``;

export const SearchInput = styled.input.attrs<{ className: string }>({
  className:
    'outline-none w-full inline-flex items-center justify-center h-9.5 border border-black/10 rounded-lg px-10 text-sm peer hover:border-black placeholder:text-black/70 focus:border-black dark:border-white/10 dark:text-white/70 dark:bg-dark-surface dark:placeholder:text-white/70 transition',
})`
  ${(p: SearchInputProps) => !p.isShortCut && 'padding-right: 10px;'}
`;

export const SearchIconWrapper = styled.div.attrs({
  className:
    'absolute top-0 left-0 bottom-0 w-10 h-full inline-flex items-center justify-center',
})``;

export const ShortCutWrapper = styled.div.attrs({
  className:
    'absolute top-0 right-0 bottom-0 w-10 h-full inline-flex items-center justify-center',
})``;

export const ShortCut = styled.div.attrs({
  className:
    'w-5 h-5 bg-black/10 rounded-sm flex items-center justify-center dark:bg-white/10',
})``;

// --- Text Area
export const TextAreaWrapper = styled.div.attrs({
  className: 'relative flex flex-col space-y-1',
})``;

export const Area = styled.textarea.attrs({
  className:
    'outline-none w-full inline-flex items-center justify-center min-h-[160px] border border-black/10 rounded-md px-4 py-2 text-sm peer hover:border-black placeholder:text-black/70 focus:border-black dark:border-white/10 dark:bg-dark-surface dark:placeholder:text-white/70 transition',
})``;

export const TextAreaHeader = styled.div.attrs({
  className: 'flex items-center justify-between',
})``;

export const TextAreaLabelWrapper = styled.div.attrs({
  className: 'flex items-center space-x-1',
})``;

export const TextAreaLabel = styled.label.attrs({
  className: 'text-sm whitespace-nowrap text-black dark:text-white',
})``;

export const TextAreaOptional = styled.span.attrs({
  className: 'text-xs whitespace-nowrap text-black/70 dark:text-white/70',
})``;

export const TextAreaCounter = styled.span.attrs({
  className: 'text-sm whitespace-nowrap text-black/70 dark:text-white/70',
})``;

export const CustomSelectWrapper = styled.div.attrs<{ className?: string }>({
  className: 'relative w-full text-black',
})``;

export const CustomSelect = styled.select.attrs<{ className?: string }>({
  className:
    'outline-none w-full inline-flex items-center justify-center font-semibold py-2 pl-12 border border-black/10 rounded-lg text-sm peer hover:border-black placeholder:text-black/70 focus:border-black dark:border-white/10 dark:text-white/70 dark:bg-dark-surface dark:placeholder:text-white/70 transition',
})``;

export const CustomSelectLabel = styled.div.attrs<{ className?: string }>({
  className:
    'absolute top-0 left-0 bottom-0 px-3 text-sm text-black/70 font-normal dark:text-white/70 inline-flex items-center justify-center',
})``;

export const CustomSelectOption = styled.option.attrs<{ className?: string }>({
  className: 'text-black font-semibold',
})``;
