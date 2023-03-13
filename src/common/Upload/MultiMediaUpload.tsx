import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { toBase64 } from '@/lib/pinata';

// components
import { Button, OutlineButton } from '@/common';
import * as DutchC from './styles';

// icons
import { IExtMultiMedia } from '../svg';

interface MultiMediaUploadProps {}

const MultiMediaUpload: React.FC<MultiMediaUploadProps> = () => {
  const { theme } = useTheme();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleOpen = () => {
    if (hiddenFileInput) {
      hiddenFileInput.current?.click();
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const urls: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const url = await toBase64(e.target.files[i]);
        urls.push(url as string);
      }
      setImageUrls(urls);
    } else alert('Image upload failed');
  };

  return (
    <DutchC.MultiUploadWrapper>
      {/* if files does not exist */}
      {imageUrls.length ? (
        <>
          <DutchC.MultiUploadInner>
            {imageUrls
              .slice(0, Math.min(imageUrls.length, 10) - 1)
              .map((url, index) => (
                <Image
                  key={index}
                  alt=""
                  src={url}
                  width={140}
                  height={140}
                  className="aspect-square border border-black/10 rounded dark:border-white/10"
                />
              ))}
            {/* additional image */}
            <DutchC.MultiUploadLastMediaWrapper>
              <Image
                alt=""
                src={imageUrls[imageUrls.length - 1]}
                width={140}
                height={140}
                className="aspect-square border border-black/10 rounded dark:border-white/10"
              />
              {/* backdrop */}
              {imageUrls.length > 10 && (
                <DutchC.MultiUploadLastMediaInner>
                  +{imageUrls.length - 10}
                </DutchC.MultiUploadLastMediaInner>
              )}
            </DutchC.MultiUploadLastMediaWrapper>
          </DutchC.MultiUploadInner>

          {/* actions */}
          <DutchC.MultiUploadActions>
            <DutchC.MultiUploadFilesLengthLabel>
              {imageUrls.length} files uploaded
            </DutchC.MultiUploadFilesLengthLabel>

            <Button size="small" onClick={handleOpen}>
              Re-Upload
            </Button>
          </DutchC.MultiUploadActions>
        </>
      ) : (
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
