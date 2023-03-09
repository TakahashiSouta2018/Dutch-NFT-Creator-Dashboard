import React, { useState, useCallback } from 'react';
import { useTheme } from 'next-themes';

// components
import { Button, Dropdown, MediaUpload, TextArea, TextInput } from '@/common';
import { Guide } from '@/components/shared';
import Breadcrumb from '../Breadcrumb';
import * as DutchC from './styles';

// icons
import * as Icons from '@/common/Icons';

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
  const [properties, setProperties] = useState<NFTPropertyT[]>([
    {
      id: 0,
      type: '',
      value: '',
    },
  ]);

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
                value=""
                options={[]}
                position="BL"
                onSelect={() => {}}
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
                  <MediaUpload variant="default" />
                </DutchC.CreateDraftNFTMediaUpload>
              </DutchC.CreateDraftNFTMediaUploadWrapper>

              {/* Detail Edit */}
              <DutchC.CreateDraftNFTContentMainMiddle>
                {/* Name */}
                <TextInput label="Name" />
                {/* Amount */}
                <TextInput
                  type="number"
                  label="Amount"
                  helper="Max: 100,000"
                  min={1}
                  max={100000}
                />
                {/* Royalty (%) */}
                <TextInput
                  type="number"
                  label="Royalty (%)"
                  helper="Max: 10"
                  min={1}
                  max={10}
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
                  <Button>Save Draft</Button>
                  <Button>Cancel</Button>
                </DutchC.CreateDraftNFTActions>
              </DutchC.CreateDraftNFTContentMainMiddle>

              {/* Description */}
              <TextArea label="Description" placeholder="Describe your NFT" />
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
