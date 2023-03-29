import styled from 'styled-components';

export const ProfileMenuWrapper = styled.div.attrs({
  className:
    'absolute top-0 right-0 z-50 bg-gray-100 rounded-lg p-3 flex flex-col items-center gap-y-3 w-[252px] h-[330px] border border-black/10 dark:border-white/10 dark:bg-gray-900',
})``;

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
    'font-bold text-sm text-black/50 truncate max-w-full dark:text-white/50',
})``;

// export const ProfileHeaderContentWrapper = styled.div.attrs({
//   className: ''
// })
