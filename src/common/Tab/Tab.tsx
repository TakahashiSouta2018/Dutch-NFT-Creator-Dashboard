import React from 'react';
import { useTheme } from 'next-themes';

// component
import * as DutchC from './styles';

type WIDEFILTER = 'ALL' | 'LIST' | 'COLLECTION' | 'ARCHIVE' | 'BANK0X';
type PROFILE_EDIT = 'FROMNFT' | 'UPLOADNEW';

interface TabProps {
  children: React.ReactNode;
  active: boolean;
  onClick: (slug: WIDEFILTER | PROFILE_EDIT) => void;
  slug: WIDEFILTER | PROFILE_EDIT;
}

const Tab: React.FC<TabProps> = ({
  children,
  active = false,
  onClick,
  slug,
}) => {
  const { theme } = useTheme();

  return (
    <DutchC.TabWrapper
      active={active ? true : false}
      onClick={() => {
        onClick(slug);
      }}
      theme={theme}
    >
      {children}
    </DutchC.TabWrapper>
  );
};

export default Tab;
