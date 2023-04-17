import React, { useState } from 'react';

// components
import { MediaUpload, TextInput, TextArea, Button } from '@/common';
import Breadcrumb from '../../shared/Breadecrumb';

// icons
import { useForm } from '@/hooks/useForm';
import useCollectionHook from '@/hooks/useCollectionHook';
import Layout from '../shared/Layout';

const CreateCollectionPage: React.FC = () => {
  const [values, handleChange] = useForm({
    name: '',
    description: '',
  });
  const [tileUri, setTileUri] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [banner, setBanner] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { createCollection } = useCollectionHook();

  const handleCreateCollection = async () => {
    setIsLoading(true);
    await createCollection({
      name: values.name,
      description: values.description,
      tileUri,
      avatar,
      banner,
    });
    setIsLoading(false);
  };

  return (
    <Layout>
      <Breadcrumb />
      <div className="flex flex-col space-y-4 p-4 border border-black/10 rounded-lg dark:border-white/10">
        <div className="text-2xl font-bold whitespace-nowrap text-black dark:text-white">
          Create Collection
        </div>

        <div className="flex flex-col space-y-2">
          {/* label */}
          <div className="flex flex-col text-sm text-black/70 whitespace-nowrap">
            <span className="font-medium dark:text-white/70">Media*</span>
            <span className="dark:text-white/70">
              (Supported: JPG, JPEG, PNG, GIF)
            </span>
          </div>
          {/* Media Upload */}
          <div className="w-full grid grid-cols-5">
            <div
              className={`flex px-1 first:pl-0 last:pr-0 self-end`}
              style={{ aspectRatio: '5/7', gridColumn: `span 1 / span 1` }}
            >
              <MediaUpload
                variant="tile"
                setImageUrl={setTileUri}
                imageUrl={tileUri}
                name="tileUri"
              />
            </div>
            <div
              className={`flex px-1 first:pl-0 last:pr-0 self-end`}
              style={{ aspectRatio: '1/1', gridColumn: `span 1 / span 1` }}
            >
              <MediaUpload
                variant="avatar"
                setImageUrl={setAvatar}
                imageUrl={avatar}
                name="avatar"
              />
            </div>
            <div
              className={`flex px-1 first:pl-0 last:pr-0 self-end`}
              style={{ aspectRatio: '3/1', gridColumn: `span 3 / span 3` }}
            >
              <MediaUpload
                variant="banner"
                setImageUrl={setBanner}
                imageUrl={banner}
                name="banner"
              />
            </div>
          </div>
        </div>

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
        <div className="w-1/6">
          <Button
            type="button"
            loading={isLoading}
            onClick={handleCreateCollection}
          >
            Create Collection
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCollectionPage;
