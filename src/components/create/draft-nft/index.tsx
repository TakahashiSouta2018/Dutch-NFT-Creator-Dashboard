import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from 'next-themes';

// components
import {
  Button,
  Dropdown,
  MediaUpload,
  TextArea,
  TextInput,
  OutlineButton,
} from '@/common';
import { Guide } from '@/components/shared';
import Breadcrumb from '../Breadcrumb';
import * as DutchC from './styles';

// icons
import * as Icons from '@/common/Icons';
import useNFTHook from '@/hooks/useNFTHook';
import { useForm } from '@/hooks/useForm';
import useCollectionHook from '@/hooks/useCollectionHook';

// types
type NFTPropertyT = {
  id: number;
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
  const [open, setOpen] = useState(true);
  const [counter, setCounter] = useState(1);
  const [media, setMedia] = useState<string>('');
  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState<string>('');
  const [selectedCollectionName, setSelectedCollectionName] =
    useState<string>('');
  const [collectionNames, setCollectionNames] = useState<string[]>([]);
  const [properties, setProperties] = useState<NFTPropertyT[]>([
    {
      id: 0,
      type: '',
      value: '',
    },
  ]);

  const { createDraftNFT } = useNFTHook();
  const { userCollection } = useCollectionHook();

  const [values, handleChange] = useForm({
    name: '',
    amount: '',
    royalty: '',
    description: '',
  });

  useEffect(() => {
    if (userCollection.length > 0) {
      const collectionNames = userCollection.map(
        (collection) => collection.name
      );
      setCollectionNames(collectionNames);
      setSelectedCollectionName(collectionNames[0]);
    }
  }, []);

  const toggleGuide = () => {
    setOpen((open) => !open);
  };

  const handleAddProperty = useCallback(() => {
    setProperties((properties) => [
      ...properties,
      {
        id: counter,
        type: '',
        value: '',
      },
    ]);

    setCounter((counter) => counter + 1);
  }, [counter]);

  const handleRemoveProperty = useCallback(
    (id: number) => {
      const index = properties.findIndex((property) => property.id === id);

      if (index >= 0) {
        setProperties((properties) => [
          ...properties.slice(0, index),
          ...properties.slice(index + 1),
        ]);
      }
    },
    [properties]
  );

  const handleSelectCollection = (value: string, index: number) => {
    setSelectedCollectionName(value);
    console.log({ index, value, jdjfd: userCollection[index] });

    setSelectedCollectionAddress(userCollection[index].collectionAddress);
  };

  const handleCreateDraftNFT = async () => {
    // const mediaUrl = await pinFileToIPFS([media]);
    const x = 'https://';

    if (x) {
      console.log({
        properties: JSON.stringify(properties),
        collection: selectedCollectionAddress,
        media: x,
        name: values.name,
        royalty: values.royalty,
        amount: values.amount,
        description: values.description,
      });

      await createDraftNFT({
        properties: JSON.stringify(properties),
        collection: selectedCollectionAddress,
        media: x,
        name: values.name,
        royalty: values.royalty,
        amount: values.amount,
        description: values.description,
      });
    }
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
              <Dropdown
                label="Collection"
                value={selectedCollectionName}
                options={collectionNames}
                position="BL"
                onSelect={handleSelectCollection}
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
                  {properties.map((property) => (
                    <NFTProperty
                      key={property.id}
                      onRemove={() => handleRemoveProperty(property.id)}
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
                  <Button type="button" onClick={handleCreateDraftNFT}>
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
