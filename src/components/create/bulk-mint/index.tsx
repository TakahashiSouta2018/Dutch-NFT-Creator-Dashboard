import React, { useState } from 'react';
import { useTheme } from 'next-themes';

// components
import {
  Button,
  Dropdown,
  MultiMediaUpload,
  CSVUpload,
  OutlineButton,
} from '@/common';
import { Guide } from '@/components/shared';
import * as DutchC from './styles';
import Breadcrumb from '../Breadcrumb';

// icons
import * as Icons from '@/common/Icons';

const CreateBulkMintHome: React.FC = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(true);

  const toggleGuide = () => {
    setOpen((open) => !open);
  };

  return (
    <DutchC.CreateWrapper>
      <DutchC.CreateBulkMintWrapper open={open ? 1 : 0}>
        <DutchC.CreateBulkMintContent>
          <Breadcrumb />

          <DutchC.CreateBulkMintContentBody>
            <DutchC.CreateBulkMintHeader>Bulk Mint</DutchC.CreateBulkMintHeader>

            {/* Collection Selector */}
            <DutchC.CreateBulkMintCollectionSelectWrapper>
              <Dropdown
                label="Collection"
                value="🍎🍌🍍The Fruit Salad Game🍆🥦🥕"
                options={['🍎🍌🍍The Fruit Salad Game🍆🥦🥕']}
                position="BL"
                onSelect={() => {}}
              />
            </DutchC.CreateBulkMintCollectionSelectWrapper>

            {/* Main Content */}
            <DutchC.CreateBulkMintContentMain>
              {/* left */}
              <DutchC.CreateBulkMintContentMainLeft>
                {/* Multi Media Upload */}
                <DutchC.CreateBulkMintContentMultiMediaUploadWrapper>
                  <DutchC.CreateBulkMintContentMultiMediaUploadLabel>
                    Media files* <br /> (Supported : JPG, PNG, GIF, WEBP, WEBM,
                    MP4, GLB, GLTF)
                  </DutchC.CreateBulkMintContentMultiMediaUploadLabel>

                  <MultiMediaUpload />
                </DutchC.CreateBulkMintContentMultiMediaUploadWrapper>
                {/* CSV Upload */}
                <DutchC.CreateBulkMintContentCSVUploadWrapper>
                  <DutchC.CreateBulkMintContentCSVUploadLabel>
                    <span className="font-medium text-black/70">CSV file*</span>{' '}
                    <br />
                    <p>
                      <span className="font-bold">
                        Download our CSV template
                      </span>{' '}
                      to make sure your CSV is formatted correctly.
                    </p>
                  </DutchC.CreateBulkMintContentCSVUploadLabel>

                  <CSVUpload />
                </DutchC.CreateBulkMintContentCSVUploadWrapper>
              </DutchC.CreateBulkMintContentMainLeft>
              {/* right */}
              <DutchC.CreateBulkMintContentMainRight>
                <DutchC.CreateBulkMintContentNFTPreviewLabel>
                  NFT Preview <br />
                  The previews are shown according to the files you upload.
                </DutchC.CreateBulkMintContentNFTPreviewLabel>
                <DutchC.CreateBulkMintContentNFTPreviewWrapper>
                  No items to show.
                </DutchC.CreateBulkMintContentNFTPreviewWrapper>
              </DutchC.CreateBulkMintContentMainRight>
            </DutchC.CreateBulkMintContentMain>

            {/* Actions */}
            <DutchC.CreateBulkMintContentActions>
              <Button>Mint all NFTs</Button>
              <Button>Save to Drafts</Button>
              <OutlineButton>Cancel</OutlineButton>
            </DutchC.CreateBulkMintContentActions>
          </DutchC.CreateBulkMintContentBody>
        </DutchC.CreateBulkMintContent>
      </DutchC.CreateBulkMintWrapper>

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

export default CreateBulkMintHome;
