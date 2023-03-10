import styled from 'styled-components';

// type
type CreateBulkMintWrapperProps = {
  open?: number;
};

// components
export const CreateWrapper = styled.div.attrs({
  className: 'relative flex px-6 py-4 mt-16 overflow-x-hidden',
})``;

// --- Main Content
export const CreateBulkMintWrapper = styled.div.attrs({
  className: 'flex transition-all',
})`
  ${(p: CreateBulkMintWrapperProps) =>
    p.open ? 'width: 83.333333%;' : 'width: 100%;'}
`;

export const CreateBulkMintContent = styled.div.attrs({
  className: 'flex flex-col w-full space-y-4',
})``;

export const CreateBulkMintContentBody = styled.div.attrs({
  className:
    'flex flex-col space-y-4 p-4 border border-black/10 rounded-lg dark:border-white/10',
})``;

export const CreateBulkMintHeader = styled.h1.attrs({
  className: 'text-2xl font-bold whitespace-nowrap text-black dark:text-white',
})``;

export const CreateBulkMintCollectionSelectWrapper = styled.div.attrs({
  className: 'w-1/3 mr-2',
})``;

export const CreateBulkMintContentMain = styled.div.attrs({
  className: 'grid grid-cols-3 space-x-4',
})``;

export const CreateBulkMintContentMainLeft = styled.div.attrs({
  className: 'col-span-1 flex flex-col space-y-4',
})``;

export const CreateBulkMintContentMultiMediaUploadWrapper = styled.div.attrs({
  className: 'flex flex-col space-y-1',
})``;

export const CreateBulkMintContentMultiMediaUploadLabel = styled.label.attrs({
  className: 'text-sm font-medium text-black/70 dark:text-white/70',
})``;

export const CreateBulkMintContentCSVUploadWrapper = styled.div.attrs({
  className: 'flex flex-col space-y-1',
})``;

export const CreateBulkMintContentCSVUploadLabel = styled.label.attrs({
  className: 'text-sm',
})``;

export const CreateBulkMintContentMainRight = styled.div.attrs({
  className: 'col-span-2 flex flex-col space-y-1',
})``;

export const CreateBulkMintContentNFTPreviewLabel = styled.label.attrs({
  className: 'text-sm font-medium text-black/70 dark:text-white/70',
})``;

export const CreateBulkMintContentNFTPreviewWrapper = styled.div.attrs({
  className:
    'flex grow items-center justify-center border border-black/10 rounded-lg text-sm text-black/70 dark:text-white/70 dark:border-white/10',
})``;

export const CreateBulkMintContentActions = styled.div.attrs({
  className: 'inline-flex items-center space-x-2',
})``;

// --- Guide Info
export const GuideInfoIconWrapper = styled.div.attrs({
  className: 'absolute top-4 right-6 cursor-pointer',
})``;
