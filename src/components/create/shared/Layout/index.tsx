import React, { useState } from 'react';

import { useTheme } from 'next-themes';

import { Guide } from '@/components/shared';

// icons
import * as Icons from '@/common/Icons';

import MintingModal from '../MintingModal';

interface PropsI {
  children: React.ReactNode;
}

const Layout = ({ children }: PropsI) => {
  const { theme } = useTheme();

  const [open, setOpen] = useState(true);

  const toggleGuide = () => {
    setOpen((open) => !open);
  };

  return (
    <div className="relative flex px-6 mt-16 overflow-x-hidden">
      <div
        className={`flex transition-all ${
          open ? 'width: 83.333333%;' : 'width: 100%;'
        }`}
        style={{ width: `${open ? '83.333333%' : '100%'}` }}
      >
        <div className="flex flex-col w-full">{children}</div>
      </div>

      <MintingModal className="!max-w-xl" />

      <div
        className="absolute top-4 right-6 cursor-pointer"
        onClick={toggleGuide}
      >
        <Icons.IInformationCircle
          variant="solid"
          size="large"
          color={theme === 'light' ? 'black' : 'white'}
        />
      </div>
      <Guide open={open} />
    </div>
  );
};

export default Layout;
