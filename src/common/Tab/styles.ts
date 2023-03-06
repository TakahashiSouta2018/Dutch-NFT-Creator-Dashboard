import styled from 'styled-components';

// types
interface TabWrapperProps {
  active?: number;
}

// components
// --- Tab Container
export const TabContainerWrapper = styled.div.attrs({
  className: 'flex items-center border border-black/10 rounded-lg',
})`
  & > * + * {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      width: 1px;
      height: 60%;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

// --- Tab Group
export const TabGroupWrapper = styled.div.attrs({
  className: 'relative flex items-center gap-1',
})``;

// --- Tab
export const TabWrapper = styled.div.attrs({
  className:
    'inline-flex items-center justify-center h-10 rounded-lg px-6 text-black whitespace-nowrap cursor-pointer transition hover:bg-black/10',
})`
  ${(p: TabWrapperProps) =>
    p.active
      ? 'background-color: #FF4800; color: white; font-weight: 700; &:hover { background-color: #FF4800 !important; }'
      : ''}
`;
