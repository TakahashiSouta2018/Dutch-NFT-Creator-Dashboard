import styled from 'styled-components';

// types

// components

export const NFTWrapper = styled.div.attrs({
  className: 'flex fle-col',
})``;

export const NFTManagementWrapper = styled.div.attrs({
  className: 'relative flex px-6 py-4 overflow-hidden',
})``;

export const GuideInfoIconWrapper = styled.div.attrs({
  className: 'absolute right-6 top-4 ',
})``;

// --- Main Content
export const NFTManagementContentWrapper = styled.div.attrs({
  className: 'flex flex-col w-full grow',
})``;

export const NFTManagementContent = styled.div.attrs({
  className: 'flex flex-col w-full space-y-4',
})``;

export const NFTManagementContentHeader = styled.div.attrs({
  className: 'inline-flex items-center px-2 space-x-4',
})``;

export const NFTManagementContentHeaderLabel = styled.span.attrs({
  className: 'text-black/60 ',
})``;

export const NFTManagementContentBody = styled.div.attrs({
  className: 'flex flex-col',
})``;

export const NFTManagementTopTool = styled.div.attrs({
  className: 'flex items-center justify-between pb-4 border-b border-black/10',
})``;

export const NFTManagementContentBodyInner = styled.div.attrs({
  className: 'flex space-x-2 items-start w-full',
})``;

export const NFTManagementContentBodyInnerContainer = styled.div.attrs({
  className: 'flex flex-col w-full gap-4',
})``;

export const NFTManagementSubTool = styled.div.attrs({
  className: 'flex justify-between py-4',
})``;

export const NFTManagementSubToolLeft = styled.div.attrs({
  className: 'flex gap-2 self-stretch items-center',
})``;

export const NFTManagementSubToolRight = styled.div.attrs({
  className: 'flex gap-2',
})``;

export const NFTManagementDot = styled.div.attrs({
  className: 'w-[5px] h-[5px] inline-flex rounded-full bg-black/60',
})``;

export const FlexRow = styled.div.attrs<{ className: string }>({
  className: 'flex ',
})``;

export const FlexCol = styled.div.attrs<{ className: string }>({
  className: 'flex flex-col',
})``;
