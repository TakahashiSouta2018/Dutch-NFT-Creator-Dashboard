import styled from 'styled-components';

interface NFTCollectionCardProps {
  selected: boolean;
}

export const NFTCollectionCard = styled.div.attrs({
  className:
    'relative flex flex-col items-center bg-white border border-black/10 hover:border-black/70 active:border-2/70 shadow-sm hover:shadow-lg active:shadow-sm rounded-lg dark:bg-dark-surface dark:border-white/10 cursor-pointer transition',
})``;

export const NFTFooter = styled.div.attrs({
  className: 'relative flex items-end space-x-2 p-4 w-full',
})``;

export const NFTDetail = styled.div.attrs({
  className: 'flex flex-col space-y-1 w-[80%] grow',
})``;

export const NFTTitleWrapper = styled.div.attrs({
  className: 'max-w-full flex items-center justify-start space-x-1',
})``;

export const NFTTitle = styled.div.attrs({
  className: 'text-black font-bold truncate max-w-full dark:text-white/50',
})``;

export const NFTDescription = styled.div.attrs({
  className: 'text-base text-black truncate max-w-full dark:text-white/50',
})``;
