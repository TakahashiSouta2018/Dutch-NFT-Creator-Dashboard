import { SyntheticEvent } from 'react';
import styled from 'styled-components';

export const ProfileNFTCardWrapper = styled.div.attrs<{ className: string }>({
  className: 'border  rounded-lg  relative cursor-pointer',
})``;

export const ProfileEditModalBodyWrapper = styled.div.attrs({
  className: 'flex flex-col gap-6',
})``;

export const ProfileEditModalBodyInner = styled.div.attrs({
  className: 'flex flex-col gap-4 divide-y divide-black/10',
})``;

export const ProfileEditActions = styled.div.attrs({
  className: 'flex justify-end gap-2',
})``;

// ----------------- Profile NFT Card ------------------ //

export const ProfileNFTCardIcon = styled.div.attrs({
  className: 'absolute left-4 top-4',
})``;

export const ProfileNFTCardContent = styled.div.attrs({
  className:
    'absolute bottom-0 p-1.5 rounded-b-lg bg-black/50 backdrop-blur text-white',
})``;

export const ProfileNFTCardTitle = styled.p.attrs({
  className: 'text-sm font-bold',
})``;

export const ProfileNFTCardCollection = styled.p.attrs({
  className: 'text-xs overflow-hidden overflow-ellipsis whitespace-nowrap',
})``;

export const ProfileNFTCardIconInner = styled.p.attrs({
  className: 'border border-black/70 rounded-full p-2',
})``;

// ----------- FromNFTs ------------ //

export const FromNFTsWrapper = styled.p.attrs({
  className: 'flex flex-col gap-4 pt-4',
})``;

export const FromNFTsNavbar = styled.p.attrs({
  className: 'flex gap-4',
})``;

export const FromNFTsItem = styled.p.attrs({
  className: 'grid grid-cols-4 gap-4',
})``;

// ----------- UploadNew ------------ //

export const UploadNewWrapper = styled.p.attrs({
  className: 'flex aspect-square h-[440px]',
})``;
