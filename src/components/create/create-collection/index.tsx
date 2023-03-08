import React, { useState } from 'react';
import { useTheme } from 'next-themes';

// components
import { MediaUpload, TextInput, TextArea, Button } from '@/common';
import { Guide } from '@/components/shared';
import * as DutchC from './styles';
import Breadcrumb from '../Breadcrumb';

// icons
import * as Icons from '@/common/Icons';

const CreateCollectionHome: React.FC = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(true);

  const toggleGuide = () => {
    setOpen((open) => !open);
  };

  return (
    <DutchC.CreateWrapper>
      <DutchC.CreateCollectionWrapper open={open ? 1 : 0}>
        <DutchC.CreateCollectionContent>
          <Breadcrumb />

          <DutchC.CreateCollectionContentBody>
            <DutchC.CreateCollectionHeader>
              Create Collection
            </DutchC.CreateCollectionHeader>

            <DutchC.CreateCollectionMediaUploadWrapper>
              {/* label */}
              <DutchC.CreateCollectionMediaUploadLabel>
                <span className="font-medium dark:text-white/70">Media*</span>
                <span className="dark:text-white/70">
                  (Supported: JPG, JPEG, PNG, GIF)
                </span>
              </DutchC.CreateCollectionMediaUploadLabel>
              {/* Media Upload */}
              <DutchC.CreateCollectionMediaUploadInner>
                <DutchC.CreateCollectionMediaUploadItem
                  colSpan="1"
                  aspect="5/7"
                >
                  <MediaUpload variant="tile" />
                </DutchC.CreateCollectionMediaUploadItem>
                <DutchC.CreateCollectionMediaUploadItem
                  colSpan="1"
                  aspect="1/1"
                >
                  <MediaUpload variant="avatar" />
                </DutchC.CreateCollectionMediaUploadItem>
                <DutchC.CreateCollectionMediaUploadItem
                  colSpan="3"
                  aspect="3/1"
                >
                  <MediaUpload variant="banner" />
                </DutchC.CreateCollectionMediaUploadItem>
              </DutchC.CreateCollectionMediaUploadInner>
            </DutchC.CreateCollectionMediaUploadWrapper>

            {/* Name */}
            <TextInput label="Name" required />

            {/* Description */}
            <TextArea label="Description" placeholder="Text" />

            {/* Create */}
            <DutchC.CreateCollectionButtonWrapper>
              <Button variant="solid">Create Collection</Button>
            </DutchC.CreateCollectionButtonWrapper>
          </DutchC.CreateCollectionContentBody>
        </DutchC.CreateCollectionContent>
      </DutchC.CreateCollectionWrapper>

      {/* toggle guide */}
      <DutchC.GuideInfoIconWrapper onClick={toggleGuide}>
        <Icons.IInformationCircle
          variant="solid"
          size="large"
          color={theme === 'light' ? 'black' : 'white'}
        />
      </DutchC.GuideInfoIconWrapper>
      <Guide open={open} />
    </DutchC.CreateWrapper>
  );
};

export default CreateCollectionHome;
