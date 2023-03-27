import styled from 'styled-components';

export const CopyNFTId = styled.div.attrs({
  className:
    'reltive group rounded-md inline-flex items-center justify-center gap-x-1 px-2.5 py-0.5 w-fit h-fit max-w-full border border-black/10 backdrop-blur hover:bg-black/10 active:bg-black dark:border-white/10 dark:hover:bg-white/10 dark:active:bg-white/50',
})``;

export const CopyNFTIdText = styled.div.attrs({
  className: 'text-xs truncate max-w-full',
  //group-hover:text-black group-active:text-white',
})`
  ${(p: { color: string }) =>
    p.color == 'white'
      ? { color: p.color }
      : { color: p.color, opacity: '0.5' }};
`;

export const CopyNFTIdIconWrapper = styled.div.attrs({
  className:
    'opacity-50 flex items-center justify-center group-hover:opacity-100',
})``;

export const CopyNFTIdTooltip = styled.div.attrs({
  className:
    'absolute top-[-30px] bg-black/70 rounded-md backdrop-blur px-3 py-1 text-xs text-white dark:bg-white/30',
})``;
