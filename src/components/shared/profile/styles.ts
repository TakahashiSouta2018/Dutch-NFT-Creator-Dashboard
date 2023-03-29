import styled from 'styled-components';

export const ProfileActionsWrapper = styled.div.attrs({
  className: 'flex justify-between',
})``;

export const ProfileActionsRight = styled.div.attrs({
  className: 'flex gap-4',
})``;

export const ProfileCardWrapper = styled.div.attrs({
  className:
    'flex-grow p-6 border border-black/10 rounded-lg flex flex-col gap-6 dark:border-white/10',
})``;

export const ProfileCardTitle = styled.div.attrs({
  className: 'text-black font-bold text-xl self-stretch dark:text-white',
})``;

// ------------------ Social Icons -------------------- //

export const ProfileSocialIconWrapper = styled.div.attrs({
  className: 'flex flex-col gap-1',
})``;

export const ProfileSocialIconInner = styled.div.attrs({
  className:
    'border border-black/10 rounded-md w-full flex dark:border-white/10',
})``;

export const ProfileSocialIconContent = styled.div.attrs({
  className: 'bg-black/10 p-2 flex gap-2 dark:bg-white/10',
})``;

export const SocialLinkText = styled.a.attrs({
  className: 'text-sm text-black dark:text-white',
})``;
