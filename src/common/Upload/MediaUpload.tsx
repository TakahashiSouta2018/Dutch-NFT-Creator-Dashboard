import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

// components
import { Button, OutlineButton } from '@/common';
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

const aspectClassNames = {
  tile: 'aspect-[5/7]',
  avatar: 'aspect-square',
  banner: 'aspect-[3/1]',
  default: 'aspect-square',
};

const MediaUpload: React.FC<MediaUploadProps> = ({ variant }) => {
  const { theme } = useTheme();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleOpen = () => {
    if (hiddenFileInput) {
      hiddenFileInput.current?.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e.target.files ? e.target.files[0] : null);
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <DutchC.ImageUploadWrapper>
      {/* if image does not exist */}
      {!imageUrl && (
        <>
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
          <OutlineButton size="small" onClick={handleOpen}>
            Upload Media
          </OutlineButton>
        </>
      )}
      {/* show image & actions */}
      {imageUrl && (
        <>
          {/* image */}
          <Image
            alt="Mountains"
            src={imageUrl}
            fill
            className={aspectClassNames[variant]}
          />

          {/* actions */}
          <DutchC.ImageUploadActions>
            <div>
              <p>
                <span className="text-white font-bold">{types[variant]}</span>{' '}
                <span className="text-white/70">{aspects[variant]}</span>
              </p>
              <span className="text-white font-bold">
                {selectedImage?.name}
              </span>
            </div>
            <Button onClick={handleOpen}>Change</Button>
          </DutchC.ImageUploadActions>
        </>
      )}
      {/* hidden input */}
      <input
        ref={hiddenFileInput}
        type="file"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </DutchC.ImageUploadWrapper>
  );
};

export default MediaUpload;
