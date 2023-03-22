import styled from 'styled-components';

export const FilterWrapper = styled.div.attrs<{ className: string }>({
  className:
    'flex flex-col divide-y w-[14vw] text-sm gap-2 p-2 transition border border-black/10 rounded-lg bg-white',
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
