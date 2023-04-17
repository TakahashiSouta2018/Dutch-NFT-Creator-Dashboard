import React from 'react';
import { useTheme } from 'next-themes';

// components
import {
  TextInput,
} from '@/common';


// icons
import * as Icons from '@/common/Icons';

interface NFTPropertyI {
  type: string;
  value: string;
  onRemove?: () => void;
}


const NFTProperty: React.FC<NFTPropertyI> = ({ type, value, onRemove }) => {
  const { theme } = useTheme();

  return (
    <div className='flex items-center space-x-2'>
      <TextInput placeholder="Type" />
      <TextInput placeholder="Value" type="number" />
      <div className='cursor-pointer' onClick={onRemove}>
        <Icons.IMinusCircle
          variant="solid"
          color={theme === 'dark' ? 'dark-red' : 'accent-red'}
          size="large"
        />
      </div>
    </div>
  );
};

export default NFTProperty;
