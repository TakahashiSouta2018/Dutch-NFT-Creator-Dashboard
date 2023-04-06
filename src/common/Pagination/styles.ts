import styled from 'styled-components';

export const PaginationWrapper = styled.div.attrs<{ className?: string }>({
  className: 'inline-flex items-center gap-x-2',
})``;

export const PaginationLabel = styled.div.attrs<{ className?: string }>({
  className:
    'text-sm text-black/70 font-normal dark:text-white/70 inline-flex items-center justify-center',
})``;

export const PaginationCurrentPage = styled.div.attrs<{ className?: string }>({
  className:
    'p-2 h-8 min-w-[32px] border rounded-lg text-sm text-black font-semibold bg-black/10 dark:text-white inline-flex items-center justify-center',
})``;

export const PaginationButton = styled.button.attrs<{
  className?: string;
}>({
  className:
    'disabled:bg-white/10 disabled:opacity-70 disabled:cursor-not-allowed border h-8 p-2 inline-flex items-center justify-center rounded-lg bg-black/10 text-sm text-black whitespace-nowrap cursor-pointer transition hover:bg-black/30 dark:hover:bg-white/30 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-4 focus:ring-offset-transparent dark:bg-white dark:text-black dark:font-bold dark:focus:ring-white/30 dark:focus:ring-offset-dark-surface disabled:bg-black/30 disabled:text-white dark:disabled:bg-white/50 dark:disabled:text-white font-semibold',
})``;
