import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useTheme } from 'next-themes';

// components
import { Button, OutlineButton } from '@/common';
import * as DutchC from './styles';

// icons
import { IPhoto, ISearchPlus } from '@/common/Icons';

// types
import { MediaUploadVariants } from '@/types';
import { toBase64 } from '@/lib/pinata';
import { CustomRange } from '../Range';

interface MediaUploadProps {
  variant: MediaUploadVariants;
  name: string;
  imageUrl: string;
  setImageUrl: (value: string) => void;
  profile?: boolean;
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

const MediaUpload: React.FC<MediaUploadProps> = ({
  variant,
  name,
  imageUrl,
  setImageUrl,
  profile,
}) => {
  const { theme } = useTheme();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [selectedImageName, setSelectedImageName] = useState<string>('');
  const [scale, setScale] = useState([50]);
  const [angle, setAngle] = useState([0]);

  const handleOpen = () => {
    if (hiddenFileInput) {
      hiddenFileInput.current?.click();
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const { size, type, name } = e.target.files[0];
      if (!type.toLowerCase().match(/image\/(jpg|jpeg|png|gif)$/)) {
        toast('Selected file image must be jpg, jpeg, png or gif image only', {
          type: 'error',
        });
        return;
      }
      const x = await toBase64(e.target.files[0]);
      setImageUrl(x as string);
      setSelectedImageName(name);
    } else toast('Image upload failed', { type: 'error' });
  };

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
          {profile ? (
            <Image
              alt="Mountains"
              src={imageUrl}
              width={(312 * Number(scale)) / 100}
              height={(312 * Number(scale)) / 100}
              className={`${aspectClassNames[variant]}`}
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            />
          ) : (
            <Image
              alt="Mountains"
              src={imageUrl}
              fill
              className={aspectClassNames[variant]}
            />
          )}

          {/* actions */}
          {profile ? (
            <DutchC.ImageUploadEditWrapper>
              <DutchC.ImageUploadEditInner>
                <ISearchPlus
                  variant="solid"
                  size="large"
                  color={theme === 'dark' ? 'white' : 'black'}
                />
                <DutchC.ImageUploadEditRangeSlider>
                  <CustomRange values={scale} setValues={setScale} />
                </DutchC.ImageUploadEditRangeSlider>
                <DutchC.ImageUploadEditRangeText>
                  {scale}%
                </DutchC.ImageUploadEditRangeText>
              </DutchC.ImageUploadEditInner>
              <DutchC.ImageUploadEditInner>
                <ISearchPlus
                  variant="solid"
                  size="large"
                  color={theme === 'dark' ? 'white' : 'black'}
                />
                <DutchC.ImageUploadEditRangeSlider>
                  <CustomRange
                    values={angle}
                    setValues={setAngle}
                    min={-180}
                    max={180}
                  />
                </DutchC.ImageUploadEditRangeSlider>
                <DutchC.ImageUploadEditRangeText>
                  {angle}°
                </DutchC.ImageUploadEditRangeText>
              </DutchC.ImageUploadEditInner>
            </DutchC.ImageUploadEditWrapper>
          ) : (
            <DutchC.ImageUploadActions>
              <div>
                <p>
                  <span className="text-white font-bold">{types[variant]}</span>{' '}
                  <span className="text-white/70">{aspects[variant]}</span>
                </p>
                <span className="text-white font-bold">
                  {selectedImageName}
                </span>
              </div>
              <Button onClick={handleOpen}>Change</Button>
            </DutchC.ImageUploadActions>
          )}
        </>
      )}
      {/* hidden input */}
      <input
        ref={hiddenFileInput}
        type="file"
        style={{ display: 'none' }}
        name={name}
        onChange={handleChange}
      />
    </DutchC.ImageUploadWrapper>
  );
};

export default MediaUpload;
