import styled from 'styled-components';

// types

// components
export const CreateWrapper = styled.div.attrs({
  className: 'relative flex px-6 py-4 mt-16',
})``;

// --- Main Content
export const CreateContentWrapper = styled.div.attrs({
  className: 'flex w-full grow',
})``;

export const CreateContent = styled.div.attrs({
  className: 'flex flex-col w-full space-y-4',
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

export const BreadcrumbItem = styled.a.attrs({
  className:
    'relative inline-flex items-center justify-center px-4 first:pl-2 last:pr-2 text-black/60',
})``;
