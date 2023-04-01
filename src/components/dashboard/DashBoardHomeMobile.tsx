import React from 'react';
import MobileLogo from '../../assets/mobile_logo.svg';
import MobileDisplay from '../../assets/mobile_display.svg';
import MobileTextA from '../../assets/mobile_text_A.svg';
import MobileReload from '../../assets/mobile_reload.svg';
import { useTheme } from 'next-themes';

import * as Icons from '@/common/Icons';

const DashBoardHomeMobile = () => {
  const { theme } = useTheme();
  return (
    <div className="mt-6 flex flex-col divide-y divide-black/30 text-center dark:bg-[#121212] overflow-y-auto max-h-[800px]">
      <div className="px-10 pb-5 flex flex-col items-center">
        <MobileLogo currentColor={theme === 'dark' ? 'white' : 'black'} />
        <div className="flex flex-col gap-4 items-center mt-32 mb-28 dark:text-white">
          <div className="p-4">
            <MobileDisplay
              currentColor={theme === 'dark' ? 'white' : 'black'}
            />
          </div>
          <p className="font-bold text-2xl leading-9 text-center">
            Please use the Dashboard on your desktop.
          </p>
          <p>While we work on creating a mobile version.</p>
        </div>
        <div className="text-black/50">Team DUTCH0x</div>
      </div>
      <div className="p-2 dark:bg-[#3d3d3d]">
        <div className="mx-6 p-4 bg-black/10 dark:bg-white/20 rounded-xl flex justify-between items-center">
          <MobileTextA />
          <div className="flex gap-1 items-center">
            <Icons.ILockClosed
              size="medium"
              color={theme === 'dark' ? 'white' : 'black'}
            />
            <p>domain.com</p>
          </div>
          <MobileReload currentColor={theme === 'dark' ? 'white' : 'black'} />
        </div>
        <div className="flex justify-between px-7 py-3">
          <Icons.IArrowSmallLeft size="large" color="accent-blue" />
          <Icons.IArrowRight size="large" color="dark-gray" />
          <Icons.IArrowUpOnSquare
            size="large"
            color="accent-blue"
            variant="outline"
          />
          <Icons.IBookOpen
            size="large"
            color="accent-blue"
            variant="outline"
            className="cursor-pointer"
          />
          <Icons.ISquare2Stack
            size="large"
            color="accent-blue"
            variant="outline"
            className="cursor-pointer"
          />
        </div>
        <div className="rounded-[100px] mx-32 border-4 border-black dark:border-white my-4" />
      </div>
    </div>
  );
};

export default DashBoardHomeMobile;
