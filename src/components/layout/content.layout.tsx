import React, { useState } from 'react';
import { Breadcrumb, Guide } from '../shared';

import { useTheme } from 'next-themes';
import * as Icons from '@/common/Icons';
import * as DutchC from './styles';

interface ContentLayoutProps {
  children: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const toggleGuide = () => {
    setOpen((open) => !open);
  };
  return (
    <>
      <DutchC.ContentLayoutWrapper>
        <Breadcrumb />
        <DutchC.ContentLayoutBody open={open}>
          <DutchC.ContentLayoutBodyInner>
            {children}
          </DutchC.ContentLayoutBodyInner>
        </DutchC.ContentLayoutBody>

        <DutchC.GuideInfoIconWrapper onClick={toggleGuide}>
          <Icons.IInformationCircle
            variant="solid"
            size="large"
            color={theme === 'light' ? 'black' : 'white'}
          />
        </DutchC.GuideInfoIconWrapper>
        <Guide open={open} />
      </DutchC.ContentLayoutWrapper>
    </>
  );
};

export default ContentLayout;
