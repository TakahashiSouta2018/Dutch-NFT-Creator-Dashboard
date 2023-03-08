import React from 'react';
import { useTheme } from 'next-themes';

// components
import { Button } from '@/common';
import * as DutchC from './styles';

// icons
import { IPhoto } from '@/common/Icons';

// types
import { MediaUploadVariants } from '@/types';

interface MediaUploadProps {
  variant: MediaUploadVariants;
}

const aspects = {
  tile: '5:7',
  avatar: '1:1',
  banner: '3:1',
  default: '1:1',
};

const types = {
  tile: 'Title',
  avatar: 'Avatar',
  banner: 'Banner',
  default: '',
};

const MediaUpload: React.FC<MediaUploadProps> = ({ variant }) => {
  const { theme } = useTheme();

  return (
    <DutchC.ImageUploadWrapper>
      <IPhoto
        variant="solid"
        size="xlarge"
        color={theme === 'dark' ? 'white-gray' : 'gray'}
      />
      <span className="mt-2 dark:text-white/70">
        <b className="dark:text-white">{types[variant]}</b> Dimension{' '}
        {aspects[variant]}
      </span>
      <span className="mb-2 dark:text-white/70">
        Drag and drop your media or
      </span>
      <Button variant="outline" size="small">
        Upload Media
      </Button>
    </DutchC.ImageUploadWrapper>
  );
};

export default MediaUpload;
