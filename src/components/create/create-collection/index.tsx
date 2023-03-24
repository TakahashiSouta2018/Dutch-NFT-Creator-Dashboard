import React, { useState } from 'react';
import { useTheme } from 'next-themes';

// components
import { MediaUpload, TextInput, TextArea, Button } from '@/common';
import { Guide } from '@/components/shared';
import * as DutchC from './styles';
import Breadcrumb from '../Breadcrumb';

// icons
import * as Icons from '@/common/Icons';
import { useForm } from '@/hooks/useForm';
import useCollectionHook from '@/hooks/useCollectionHook';

const CreateCollectionHome: React.FC = () => {
  const [values, handleChange] = useForm({
    name: '',
    description: '',
  });
  const [tileUri, setTileUri] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [banner, setBanner] = useState<string>('');

  const { theme } = useTheme();
  const [open, setOpen] = useState<boolean>(true);

  const { createCollection } = useCollectionHook();

  const toggleGuide = () => {
    setOpen((open) => !open);
  };

  const handleCreateCollection = async () => {
    const mediaUrl = 'https://res.cloudinary.com/ddo5l4trk/image/upload/v1669027512/samples/ecommerce/leather-bag-gray.jpg';

    await createCollection({
      name: values.name,
      description: values.description,
      tileUri: mediaUrl,
      avatar: mediaUrl,
      banner: mediaUrl,
    });
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
                  <MediaUpload
                    variant="tile"
                    setImageUrl={setTileUri}
                    imageUrl={tileUri}
                    name="tileUri"
                  />
                </DutchC.CreateCollectionMediaUploadItem>
                <DutchC.CreateCollectionMediaUploadItem
                  colSpan="1"
                  aspect="1/1"
                >
                  <MediaUpload
                    variant="avatar"
                    setImageUrl={setAvatar}
                    imageUrl={avatar}
                    name="avatar"
                  />
                </DutchC.CreateCollectionMediaUploadItem>
                <DutchC.CreateCollectionMediaUploadItem
                  colSpan="3"
                  aspect="3/1"
                >
                  <MediaUpload
                    variant="banner"
                    setImageUrl={setBanner}
                    imageUrl={banner}
                    name="banner"
                  />
                </DutchC.CreateCollectionMediaUploadItem>
              </DutchC.CreateCollectionMediaUploadInner>
            </DutchC.CreateCollectionMediaUploadWrapper>

            {/* Name */}
            <TextInput
              label="Name"
              onChange={handleChange}
              value={values.name}
              name="name"
              required
            />

            {/* Description */}
            <TextArea
              label="Description"
              onChange={handleChange}
              value={values.Description}
              name="Description"
              required
              placeholder="Text"
            />

            {/* Create */}
            <DutchC.CreateCollectionButtonWrapper>
              <Button type="button" onClick={handleCreateCollection}>
                Create Collection
              </Button>
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
