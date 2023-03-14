import styled from 'styled-components';

// types

// components
// --- Table
export const TableWrapper = styled.table.attrs<{ className: string }>({
  className: 'w-full text-sm text-left text-black',
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
  className: 'px-4 py-2',
})``;
