import React from 'react';

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
};

const types = {
  tile: 'Title',
  avatar: 'Avatar',
  banner: 'Banner',
};

const MediaUpload: React.FC<MediaUploadProps> = ({ variant }) => {
  return (
    <DutchC.ImageUploadWrapper>
      <IPhoto variant="solid" size="xlarge" color="gray" />
      <span className="mt-2">
        <b>{types[variant]}</b> Dimension {aspects[variant]}
      </span>
      <span className="mb-2">Drag and drop your media or</span>
      <Button variant="outline" size="small">
        Upload Media
      </Button>
    </DutchC.ImageUploadWrapper>
  );
};

export default MediaUpload;
