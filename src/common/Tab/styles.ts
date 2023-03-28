import styled from 'styled-components';

// types
interface TabWrapperProps {
  active: boolean;
  theme: string;
}

// components
// --- Tab Container
export const TabContainerWrapper = styled.div.attrs({
  className: 'flex items-center ',
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
  className:
    'relative flex items-center gap-1 border border-black/10 rounded-lg dark:border-white/10 ',
})``;

// --- Tab
export const TabWrapper = styled.div.attrs({
  className:
    'inline-flex items-center justify-center h-10 rounded-lg px-6 whitespace-nowrap cursor-pointer transition text-black hover:bg-black/10 dark:text-white hover:bg-white/10',
})`
  ${(p: TabWrapperProps) =>
    p.active
      ? 'background-color: #FF4800; color: white; font-weight: 700; &:hover { background-color: #FF4800 !important; }'
      : ''}
`;
