import styled from 'styled-components';

// types
type CreateCollectionWrapperProps = {
  open?: number;
};

type CreateCollectionMediaUploadItemProps = {
  colSpan: string;
  aspect: string;
};

// components
export const CreateWrapper = styled.div.attrs({
  className: 'relative flex px-6 py-4 mt-16 overflow-x-hidden',
})``;
// --- Main Content
export const CreateCollectionWrapper = styled.div.attrs({
  className: 'flex transition-all',
})`
  ${(p: CreateCollectionWrapperProps) =>
    p.open ? 'width: 83.333333%;' : 'width: 100%;'}
`;

export const CreateCollectionContent = styled.div.attrs({
  className: 'flex flex-col w-full space-y-4',
})``;

export const CreateCollectionContentBody = styled.div.attrs({
  className: 'flex flex-col space-y-4 p-4 border border-black/10 rounded-lg',
})``;

export const CreateCollectionHeader = styled.h1.attrs({
  className: 'text-2xl font-bold whitespace-nowrap text-black',
})``;

export const CreateCollectionMediaUploadWrapper = styled.div.attrs({
  className: 'flex flex-col space-y-2',
})``;

export const CreateCollectionMediaUploadLabel = styled.div.attrs({
  className: 'flex flex-col text-sm text-black/70 whitespace-nowrap',
})``;

export const CreateCollectionMediaUploadInner = styled.div.attrs({
  className: 'w-full grid grid-cols-5',
})``;

export const CreateCollectionMediaUploadItem = styled.div.attrs({
  className: 'flex px-1 first:pl-0 last:pr-0 self-end',
})`
  ${(p: CreateCollectionMediaUploadItemProps) =>
    `aspect-ratio: ${p.aspect}; grid-column: span ${p.colSpan} / span ${p.colSpan};`}
`;

export const GuideInfoIconWrapper = styled.div.attrs({
  className: 'absolute top-4 right-6 cursor-pointer',
})``;

export const CreateCollectionButtonWrapper = styled.div.attrs({
  className: 'w-1/6',
})``;
