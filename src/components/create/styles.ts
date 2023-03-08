import styled from 'styled-components';
import Link from 'next/link';

// types
type CreateContentWrapperProps = {
  open?: number;
};

// components
export const CreateWrapper = styled.div.attrs({
  className: 'relative flex px-6 py-4 mt-16 overflow-x-hidden',
})``;

// --- Main Content
export const CreateContentWrapper = styled.div.attrs({
  className: 'flex transition-all',
})`
  ${(p: CreateContentWrapperProps) =>
    p.open ? 'width: 83.333333%;' : 'width: 100%;'}
`;

export const CreateContent = styled.div.attrs({
  className: 'flex flex-col w-full space-y-4',
})``;

export const CreateContentHeader = styled.div.attrs({
  className: 'flex justify-between border-b border-black/10',
})``;

export const CreateContentLeft = styled.div.attrs({
  className: 'flex flex-col',
})``;

export const CreateContentTitle = styled.h1.attrs({
  className: 'text-2xl whitespace-nowrap font-bold',
})``;

export const CreateContentSubTitle = styled.h3.attrs({
  className: 'text-sm whitespace-nowrap text-black/70',
})``;

export const CreateContentCollection = styled.div.attrs({
  className: 'flex w-4/5 my-4',
})``;

export const CreateContentHeaderActions = styled.div.attrs({
  className: 'flex space-x-3',
})``;

export const CreateContentBody = styled.div.attrs({
  className:
    'flex items-center justify-center min-h-[315px] border border-black/10 px-4 rounded-lg',
})``;

// --- Breadcrumb
export const BreadcrumbWrapper = styled.div.attrs({
  className: 'flex items-center',
})`
  & > * + * {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 40%;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
`;

export const BreadcrumbItem = styled(Link).attrs({
  className:
    'relative inline-flex items-center justify-center px-4 first:pl-2 last:pr-2 text-black/60 capitalize',
})``;

export const GuideInfoIconWrapper = styled.div.attrs({
  className: 'absolute top-4 right-6 cursor-pointer',
})``;
