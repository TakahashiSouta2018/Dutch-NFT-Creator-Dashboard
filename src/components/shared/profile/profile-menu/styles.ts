import styled from 'styled-components';

export const ProfileMenuWrapper = styled.div.attrs({
  className: 'relative flex flex-col items-end w-fit',
})``;

export const ProfileMenuButtonWrapper = styled.button.attrs<{
  className?: string;
}>({
  className:
    'px-2 py-1.5 flex items-center justify-between gap-x-2.5 w-[170px] border rounded-lg',
})``;

export const ProfileMenu = styled.div.attrs({
  className:
    'absolute top-10 right-0 z-50 bg-gray-100 rounded-lg p-3 flex flex-col items-center gap-y-3 w-[252px] h-fit border border-black/10 dark:border-white/10 dark:bg-gray-900',
})`
  ${(p: { isOpen: boolean }) => (!p.isOpen ? 'display:none' : '')}
`;

export const ProfileMenuHeaderWrapper = styled.div.attrs({
  className: 'flex items-center relative w-full',
})``;

export const ProfileMenuHeaderContent = styled.div.attrs({
  className: 'flex items-center grow gap-2 w-[80%]',
})``;

export const ProfileMenuHeaderDetail = styled.div.attrs({
  className: 'flex flex-col max-w-[50%] truncate',
})``;

export const ProfileMenuHeaderUserName = styled.div.attrs({
  className: 'font-bold text-base truncate max-w-full',
})``;

export const ProfileMenuHeaderUserWalletAddress = styled.div.attrs({
  className:
    'font-bold text-sm text-black/50 truncate max-w-[91px] dark:text-white/50',
})``;

export const ProfileMenuDividerX = styled.hr.attrs({
  className: 'w-full dark:border-white/10',
})``;

export const ProfileMenuButtonImageWrapper = styled.div.attrs({
  className: 'flex items-center gap-x-1.5',
})``;

export const ProfileMenuButtonUserWalletAddress = styled.span.attrs({
  className: 'truncate w-[94px] font-bold',
})``;

export const ProfileMenuHeaderUserWalletAddressWrapper = styled.span.attrs({
  className: 'flex items-center gap-x-1.5',
})``;

export const ProfileMenuButtonArrowIconWrapper = styled.div.attrs({
  className: 'w-5 h-5 flex items-center',
})``;

export const ProfileMenuWalletBalanceWrapper = styled.div.attrs({
  className: 'flex justify-between text-sm w-full',
})``;

export const ProfileMenuWalletBalanceAmountWrapper = styled.div.attrs({
  className: 'flex flex-col gap-3 items-end truncate max-w-[40%] font-bold',
})``;

export const ProfileMenuWalletBalanceAmountCategoryWrapper = styled.div.attrs({
  className: 'flex flex-col gap-3 truncate max-w-[40%]',
})``;

export const ProfileMenuWalletBalanceAmountTextWrapper = styled.div.attrs({
  className: 'flex flex-col gap-3 items-end truncate max-w-[40%] font-bold',
})``;

export const ProfileMenuWalletBalanceAmountText = styled.div.attrs({
  className: 'truncate max-w-full text-right',
})``;

export const ProfileMenuAddFundsButtonWrapper = styled.div.attrs({
  className: 'flex text-sm w-full font-bold p-1',
})``;

export const ProfileMenuFooterWrapper = styled.div.attrs({
  className: 'flex items-center justify-between text-sm w-full',
})``;

export const ProfileMenuFooterThemeText = styled.div.attrs({
  className: 'text-sm font-bold first-letter:uppercase',
})``;
