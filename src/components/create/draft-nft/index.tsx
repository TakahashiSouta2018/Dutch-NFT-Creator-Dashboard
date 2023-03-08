import React, { useState } from 'react';
import { useTheme } from 'next-themes';

// components
import { Dropdown, MediaUpload, TextArea, TextInput } from '@/common';
import { Guide } from '@/components/shared';
import Breadcrumb from '../Breadcrumb';
import * as DutchC from './styles';

// icons
import * as Icons from '@/common/Icons';

interface NFTPropertyProps {
  type: string;
  value: string;
}

const CreateDraftNFTHome: React.FC = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(true);

  const toggleGuide = () => {
    setOpen((open) => !open);
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

const NFTProperty: React.FC = () => {
  return <></>;
};

export default CreateDraftNFTHome;
