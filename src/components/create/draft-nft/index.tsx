import React, { useState, useCallback } from 'react';
import { useTheme } from 'next-themes';

// components
import {
  Button,
  MediaUpload,
  TextArea,
  TextInput,
  OutlineButton,
} from '@/common';
import { Guide } from '@/components/shared';
import Breadcrumb from '../../shared/Breadcrumb';
import * as DutchC from './styles';

// icons
import * as Icons from '@/common/Icons';
import useNFTHook from '@/hooks/useNFTHook';
import { useForm } from '@/hooks/useForm';
import { pinFileToIPFS } from '@/lib/pinata';
import CollectionDropdown from '@/common/Dropdown/CollectionDropdown';
import { useRouter } from 'next/router';

// types
type NFTPropertyT = {
  type: string;
  value: string;
};

interface NFTPropertyI {
  type: string;
  value: string;
  onRemove?: () => void;
}

const CreateDraftNFTHome: React.FC = () => {
  const { theme } = useTheme();
  const { push } = useRouter();

  const { createDraftNFT } = useNFTHook();

  const [open, setOpen] = useState(true);
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

  const toggleGuide = () => {
    setOpen((open) => !open);
  };

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
      alert('Draft saved successfully');
      push('/create');
    } else alert('Unable to pin media');

    setIsLoading(false);
  };

  return (
    <DutchC.CreateWrapper>
      <DutchC.CreateDraftNFTWrapper open={open ? 1 : 0}>
        <DutchC.CreateDraftNFTContent>
          <Breadcrumb />

          <DutchC.CreateDraftNFTContentBody>
            <DutchC.CreateDraftNFTHeader>
              Add NFTs Metadata
            </DutchC.CreateDraftNFTHeader>

            {/* Collection Selector */}
            <DutchC.CreateDraftNFTCollectionSelectWrapper>
              <CollectionDropdown
                selectedCollectionAddress={selectedCollectionAddress}
                setSelectedCollectionAddress={setSelectedCollectionAddress}
              />
            </DutchC.CreateDraftNFTCollectionSelectWrapper>

            <DutchC.CreateDraftNFTContentMain>
              {/* Media Upload */}
              <DutchC.CreateDraftNFTMediaUploadWrapper>
                <DutchC.CreateDraftNFTMediaUploadLabel>
                  <span className="font-medium dark:text-white/70">Media*</span>
                  <span className="dark:text-white/70 truncate">
                    (Supported: JPG, PNG, GIF, WEBP, WEBM, MP4, GLB, GLTF)
                  </span>
                </DutchC.CreateDraftNFTMediaUploadLabel>

                <DutchC.CreateDraftNFTMediaUpload>
                  <MediaUpload
                    variant="default"
                    setImageUrl={setMedia}
                    imageUrl={media}
                    name="media"
                  />
                </DutchC.CreateDraftNFTMediaUpload>
              </DutchC.CreateDraftNFTMediaUploadWrapper>

              {/* Detail Edit */}
              <DutchC.CreateDraftNFTContentMainMiddle>
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
                <DutchC.CreateDraftNFTPropertiesWrapper>
                  <DutchC.CreateDraftNFTPropertiesLabel>
                    Properties
                  </DutchC.CreateDraftNFTPropertiesLabel>

                  {/* list */}
                  {properties.map((property, index) => (
                    <NFTProperty
                      key={index}
                      onRemove={() => handleRemoveProperty(index)}
                      {...property}
                    />
                  ))}

                  <DutchC.CreateDraftNFTPropertiesAdd
                    onClick={handleAddProperty}
                  >
                    + Add property
                  </DutchC.CreateDraftNFTPropertiesAdd>
                </DutchC.CreateDraftNFTPropertiesWrapper>

                {/* Actions */}
                <DutchC.CreateDraftNFTActions>
                  <Button
                    type="button"
                    loading={isLoading}
                    onClick={handleCreateDraftNFT}
                  >
                    Save Draft
                  </Button>
                  <OutlineButton>Cancel</OutlineButton>
                </DutchC.CreateDraftNFTActions>
              </DutchC.CreateDraftNFTContentMainMiddle>

              {/* Description */}
              <TextArea
                label="Description"
                placeholder="Describe your NFT"
                onChange={handleChange}
                value={values.description}
                name="description"
              />
            </DutchC.CreateDraftNFTContentMain>
          </DutchC.CreateDraftNFTContentBody>
        </DutchC.CreateDraftNFTContent>
      </DutchC.CreateDraftNFTWrapper>

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

const NFTProperty: React.FC<NFTPropertyI> = ({ type, value, onRemove }) => {
  const { theme } = useTheme();

  return (
    <DutchC.NFTPropertyWrapper>
      <TextInput placeholder="Type" />
      <TextInput placeholder="Value" />
      <DutchC.NFTPropertyRemove onClick={onRemove}>
        <Icons.IMinusCircle
          variant="solid"
          color={theme === 'dark' ? 'dark-red' : 'accent-red'}
          size="large"
        />
      </DutchC.NFTPropertyRemove>
    </DutchC.NFTPropertyWrapper>
  );
};

export default CreateDraftNFTHome;
