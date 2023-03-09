import styled from 'styled-components';

// types
type CreateDraftNFTWrapperProps = {
  open?: number;
};

// components
export const CreateWrapper = styled.div.attrs({
  className: 'relative flex px-6 py-4 mt-16 overflow-x-hidden',
})``;

export const CreateDraftNFTWrapper = styled.div.attrs({
  className: 'flex transition-all',
})`
  ${(p: CreateDraftNFTWrapperProps) =>
    p.open ? 'width: 83.333333%;' : 'width: 100%;'}
`;

export const CreateDraftNFTContent = styled.div.attrs({
  className: 'flex flex-col w-full space-y-4',
})``;

export const CreateDraftNFTContentBody = styled.div.attrs({
  className:
    'flex flex-col space-y-4 p-4 border border-black/10 rounded-lg dark:border-white/10',
})``;

export const CreateDraftNFTHeader = styled.h1.attrs({
  className: 'text-2xl font-bold whitespace-nowrap text-black dark:text-white',
})``;

export const CreateDraftNFTCollectionSelectWrapper = styled.div.attrs({
  className: 'w-1/3 mr-2',
})``;

export const CreateDraftNFTContentMain = styled.div.attrs({
  className: 'grid grid-cols-3 space-x-4',
})``;

export const CreateDraftNFTMediaUploadWrapper = styled.div.attrs({
  className: 'flex flex-col space-y-1',
})``;

export const CreateDraftNFTMediaUploadLabel = styled.div.attrs({
  className: 'flex flex-col text-sm text-black/70 whitespace-nowrap',
})``;

export const CreateDraftNFTMediaUpload = styled.div.attrs({
  className: 'flex aspect-square',
})``;

export const CreateDraftNFTContentMainMiddle = styled.div.attrs({
  className: 'flex flex-col space-y-4',
})``;

export const CreateDraftNFTPropertiesWrapper = styled.div.attrs({
  className: 'flex flex-col space-y-1',
})``;

export const CreateDraftNFTPropertiesLabel = styled.label.attrs({
  className: 'text-sm whitespace-nowrap font-medium text-black dark:text-white',
})``;

export const CreateDraftNFTPropertiesAdd = styled.button.attrs({
  className:
    'inline-flex w-fit text-sm whitespace-nowrap text-black/70 cursor-pointer dark:text-white/70',
})``;

export const CreateDraftNFTActions = styled.div.attrs({
  className: 'flex items-center space-x-2',
})``;

export const GuideInfoIconWrapper = styled.div.attrs({
  className: 'absolute top-4 right-6 cursor-pointer',
})``;

// --- NFT Property
export const NFTPropertyWrapper = styled.div.attrs({
  className: 'flex items-center space-x-2',
})``;

export const NFTPropertyRemove = styled.button.attrs({
  className: 'cursor-pointer',
})``;
