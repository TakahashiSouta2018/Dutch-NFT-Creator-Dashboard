import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

// components
import {
  Button,
  MediaUpload,
  TextArea,
  TextInput,
  OutlineButton,
} from '@/common';
import Breadcrumb from '../../shared/Breadecrumb';

// icons
import useNFTHook from '@/hooks/useNFTHook';
import { useForm } from '@/hooks/useForm';
import { pinFileToIPFS } from '@/lib/pinata';
import CollectionDropdown from '@/common/Dropdown/CollectionDropdown';
import { useRouter } from 'next/router';
import NFTProperty from './NFTProperty';
import Layout from '../shared/Layout';

// types
type NFTPropertyT = {
  type: string;
  value: string;
};

const DraftNFTPage: React.FC = () => {
  const { push } = useRouter();

  const { createDraftNFT } = useNFTHook();

  const [counter, setCounter] = useState(1);
  const [media, setMedia] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState<string>('');

  const [properties, setProperties] = useState<NFTPropertyT[]>([
    {
      type: 'Cloth',
      value: 'jeans',
    },
  ]);

  const [values, handleChange] = useForm({
    name: '',
    amount: '',
    royalty: '',
    description: '',
  });

  const handleAddProperty = useCallback(() => {
    setProperties((properties) => [
      ...properties,
      {
        type: 'Cloth',
        value: 'jeans',
      },
    ]);

    setCounter((counter) => counter + 1);
  }, [counter]);

  const handleRemoveProperty = useCallback(
    (index: number) => {
      if (index >= 0) {
        setProperties((properties) => [
          ...properties.slice(0, index),
          ...properties.slice(index + 1),
        ]);
      }
    },
    [properties]
  );

  const handleCreateDraftNFT = async () => {
    setIsLoading(true);
    const mediaUrl = await pinFileToIPFS([media]);

    const parsedProperties: Record<string, string> = {};

    properties.forEach((property: any) => {
      parsedProperties[property.type] = property.value;
    });

    if (mediaUrl) {
      await createDraftNFT({
        properties: JSON.stringify(parsedProperties),
        collection: selectedCollectionAddress,
        media: String(mediaUrl),
        name: values.name,
        royalty: values.royalty,
        amount: values.amount,
        description: values.description,
      });
      toast('Draft saved successfully', { type: 'success' });
      push('/create');
    } else toast('Unable to pin media', { type: 'error' });

    setIsLoading(false);
  };

  return (
    <Layout>
      <Breadcrumb />

      <div className="flex flex-col space-y-4 p-4 border border-black/10 rounded-lg dark:border-white/10">
        <div className="text-2xl font-bold whitespace-nowrap text-black dark:text-white">
          Add NFTs Metadata
        </div>

        {/* Collection Selector */}
        <div className="w-1/3 mr-2">
          <CollectionDropdown
            selectedCollectionAddress={selectedCollectionAddress}
            setSelectedCollectionAddress={setSelectedCollectionAddress}
          />
        </div>

        <div className="grid grid-cols-3 space-x-4">
          {/* Media Upload */}
          <div className="flex flex-col space-y-1">
            <div className="flex flex-col text-sm text-black/70 whitespace-nowrap">
              <span className="font-medium dark:text-white/70">Media*</span>
              <span className="dark:text-white/70 truncate">
                (Supported: JPG, PNG, GIF, WEBP, WEBM, MP4, GLB, GLTF)
              </span>
            </div>

            <div className="flex aspect-square">
              <MediaUpload
                variant="default"
                setImageUrl={setMedia}
                imageUrl={media}
                name="media"
              />
            </div>
          </div>

          {/* Detail Edit */}
          <div className="flex flex-col space-y-4">
            {/* Name */}
            <TextInput
              label="Name"
              onChange={handleChange}
              value={values.name}
              name="name"
            />
            {/* Amount */}
            <TextInput
              type="number"
              label="Amount"
              helper="Max: 100,000"
              min={1}
              max={100000}
              onChange={handleChange}
              value={values.amount}
              name="amount"
            />
            {/* Royalty (%) */}
            <TextInput
              type="number"
              label="Royalty (%)"
              helper="Max: 10"
              min={1}
              max={10}
              onChange={handleChange}
              value={values.royalty}
              name="royalty"
            />

            {/* Properties */}
            <div className="flex flex-col space-y-1">
              <div className="text-sm whitespace-nowrap font-medium text-black dark:text-white">
                Properties
              </div>

              {/* list */}
              {properties.map((property, index) => (
                <NFTProperty
                  key={index}
                  onRemove={() => handleRemoveProperty(index)}
                  {...property}
                />
              ))}

              <div
                className="inline-flex w-fit text-sm whitespace-nowrap text-black/70 cursor-pointer dark:text-white/70"
                onClick={handleAddProperty}
              >
                + Add property
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                loading={isLoading}
                onClick={handleCreateDraftNFT}
              >
                Save Draft
              </Button>
              <OutlineButton>Cancel</OutlineButton>
            </div>
          </div>

          {/* Description */}
          <TextArea
            label="Description"
            placeholder="Describe your NFT"
            onChange={handleChange}
            value={values.description}
            name="description"
          />
        </div>
      </div>
    </Layout>
  );
};

export default DraftNFTPage;
