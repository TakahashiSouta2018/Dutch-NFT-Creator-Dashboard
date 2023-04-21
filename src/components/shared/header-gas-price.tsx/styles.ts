import styled from 'styled-components';

export const GasInfoWrapper = styled.div.attrs({
  className: 'relative flex flex-col items-end w-fit',
})``;

export const GasInfoButtonWrapper = styled.button.attrs<{
  className?: string;
}>({
  className: 'flex gap-2',
})``;

export const GasInfo = styled.div.attrs({
  className:
    'absolute top-10 right-0 z-50 bg-gray-100 rounded-lg p-3 flex flex-col items-center w-[252px] border border-black/10 dark:border-white/10 dark:bg-gray-900',
})`
  ${(p: { isOpen: boolean }) => (!p.isOpen ? 'display:none' : '')}
`;

export const GasInfoHeaderWrapper = styled.div.attrs({
  className: 'flex items-center justify-between w-full pb-3',
})``;

export const GasInfoHeaderRight = styled.div.attrs({
  className: 'flex items-center justify-end gap-x-3',
})``;

export const ProfileMenuDividerX = styled.hr.attrs({
  className: 'w-full dark:border-white/10',
})``;

export const ProfileMenuFullWidthWrapper = styled.div.attrs({
  className: 'w-full',
})``;

export const ProfileMenuNFTWrapper = styled.div.attrs({
  className: 'flex justify-between text-sm w-full py-3',
})``;

export const ProfileMenuNFTPriceWrapper = styled.div.attrs({
  className: 'flex flex-col items-end font-bold',
})``;

export const ProfileMenuNFTPriceEthWrapper = styled.div.attrs({
  className: 'flex items-center gap-x-1',
})``;

export const ProfileMenuNFTPriceEthText = styled.span.attrs({
  className: 'truncate max-w-full text-right',
})``;

export const ProfileMenuNFTPriceDollarWrapper = styled.div.attrs({
  className: 'truncate max-w-full text-right opacity-40',
})``;
