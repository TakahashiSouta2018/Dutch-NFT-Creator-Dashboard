import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

// components
import { Button, OutlineButton } from '@/common';
import * as DutchC from './styles';

// icons
import { ICSV } from '../svg';

interface CSVUploadProps {}

const CSVUpload: React.FC<CSVUploadProps> = () => {
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
          <ICSV />
          <span className="mt-2 dark:text-white/70">Dimention 1:1</span>
          <span className="mb-2 dark:text-white/70">
            Drag and drop your CSV or
          </span>
          <OutlineButton size="small" onClick={handleOpen}>
            Upload CSV
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
        accept=".csv"
        multiple
      />
    </DutchC.MultiUploadWrapper>
  );
};

export default CSVUpload;
