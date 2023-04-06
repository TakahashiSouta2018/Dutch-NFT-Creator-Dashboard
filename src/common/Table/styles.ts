import styled from 'styled-components';

// types

// components
export const TableControlWrapper = styled.div.attrs<{ className?: string }>({
  className: 'flex items-center justify-between w-full',
})``;

export const TableControlLeft = styled.div.attrs<{ className?: string }>({
  className: 'flex items-center gap-x-2',
})``;

export const TableControlRight = styled.div.attrs<{ className?: string }>({
  className: 'flex items-center gap-x-2',
})``;

export const TableWrapper = styled.div.attrs<{ className: string }>({
  className: 'w-full text-sm flex',
})``;

// --- Table
export const TableContentWrapper = styled.table.attrs<{ className: string }>({
  className: 'w-full text-sm text-left',
})``;

// --- THead
export const THeadWrapper = styled.thead.attrs<{ className: string }>({
  className:
    'text-black/50 h-9 border-b border-black/10 dark:text-white/50 dark:border-white/10',
})``;

// --- TBody
export const TBodyWrapper = styled.tbody.attrs<{ className: string }>({
  className: 'divide-y dark:divide-white/10',
})``;

// --- TR
export const TRWrapper = styled.tr.attrs<{ className: string }>({
  className: '',
})``;

// --- TD
export const TDWrapper = styled.td.attrs<{ className: string }>({
  className: 'px-4 py-2 resize-x',
})``;

// --- TD
export const TResizableHeader = styled.textarea.attrs<{
  className: string;
}>({
  className:
    'resize-x outline-none flex items-center min-w-full text-decoration-none',
  rows: 1,
})``;
