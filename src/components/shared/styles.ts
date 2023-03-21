import styled from 'styled-components';

// types
type GuideWrapperProps = {
  open: boolean;
};

// components
export const GuideWrapper = styled.div.attrs({
  className: 'flex flex-col gap-8 py-9 ml-6 transition',
})`
  ${(p: GuideWrapperProps) =>
    p.open ? '' : 'position: absolute; right: 0; transform: translateX(100%);'}
`;

export const GuideCard = styled.div.attrs({
  className: 'flex flex-col space-y-2 py-2',
})``;

export const GuideCardHeader = styled.h1.attrs({
  className: 'text-sm font-medium whitespace-nowrap text-black dark:text-white',
})``;

export const GuideCardContent = styled.p.attrs({
  className: 'text-sm font-normal text-black/70 dark:text-white/70',
})``;

export const GuideCardFooter = styled.div.attrs({
  className:
    'inline-flex items-center space-x-1 text-sm text-primary-orange cursor-pointer dark:text-dark-orange',
})``;

export const FilterWrapper = styled.div.attrs<{ className: string }>({
  className:
    'flex flex-col divide-y text-sm gap-2 p-2 transition border border-black/10 rounded-lg bg-white',
})``;

export const FilterHeader = styled.div.attrs<{ className: string }>({
  className: 'flex gap-2 items-center',
})``;

export const TextFilterTitle = styled.div.attrs<{ className: string }>({
  className: 'font-bold text-black/50',
})``;

export const FilterCollectionsWrapper = styled.div.attrs<{ className: string }>(
  {
    className: 'flex flex-col p-2 gap-2',
  }
)``;

export const FilterInner = styled.div.attrs<{ className: string }>({
  className: 'flex justify-between p-2',
})``;

export const FilterRow = styled.div.attrs<{ className: string }>({
  className: 'flex gap-2 items-center',
})``;

export const FilterCol = styled.div.attrs<{ className: string }>({
  className: 'flex flex-col gap-2 p-2',
})``;

export const TextBold = styled.div.attrs<{ className: string }>({
  className: 'font-bold text-black/70',
})``;

export const TextNormal = styled.div.attrs<{ className: string }>({
  className: 'font-normal text-sm',
})``;

export const TextReset = styled.div.attrs<{ className: string }>({
  className: 'text-xs text-black/70 font-normal',
})``;

export const FilterCollectionInner = styled.div.attrs<{ className: string }>({
  className: 'text-xs text-black/70',
})``;

export const TextEllipsis = styled.div.attrs<{ className: string }>({
  className:
    'w-[10vw] whitespace-nowrap  overflow-hidden overflow-ellipsis font-normal text-sm text-black/70',
})``;
