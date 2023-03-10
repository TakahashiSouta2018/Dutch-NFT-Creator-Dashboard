import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

// components
import { Button, OutlineButton } from '@/common';
import * as DutchC from './styles';

// icons
import { IExtMultiMedia } from '../svg';

interface MultiMediaUploadProps {}

const MultiMediaUpload: React.FC<MultiMediaUploadProps> = () => {
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
    <DutchC.MultiUploadWrapper>
      {/* if files does not exist */}
      {!imageUrl && (
        <>
          <IExtMultiMedia />
          <span className="mt-2 dark:text-white/70">Dimention 1:1</span>
          <span className="mb-2 dark:text-white/70">
            Drag and drop your media or
          </span>
          <OutlineButton size="small" onClick={handleOpen}>
            Upload media files
          </OutlineButton>
        </>
      )}
      {/* show files & actions */}
      {imageUrl && <></>}
      {/* hidden input */}
      <input
        ref={hiddenFileInput}
        type="file"
        style={{ display: 'none' }}
        onChange={handleChange}
        accept="image/*, .webp, .webm, .mp4, .glb, .gltf"
        multiple
      />
    </DutchC.MultiUploadWrapper>
  );
};

export default MultiMediaUpload;
