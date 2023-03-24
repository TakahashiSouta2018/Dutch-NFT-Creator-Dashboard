import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

// components
import {
  Button,
  Dropdown,
  MultiMediaUpload,
  CSVUpload,
  OutlineButton,
  Table,
  THead,
  TBody,
  TR,
  TD,
} from '@/common';
import { Guide } from '@/components/shared';
import * as DutchC from './styles';
import Breadcrumb from '../Breadcrumb';
import MintingModal from '../minting';

// icons
import * as Icons from '@/common/Icons';

const nfts = [
  {
    id: 1,
    name: 'Green Grapes',
    image: {
      path: '/images/rice.webp',
      name: '01.jpg',
    },
    unit: 1000,
    royalty: 9,
    description:
      'Green Olive🫒 1/1,000 Olive trees are special in the Holy Land. The olive branch is universally regarded as a symbol of peace.',
    properties:
      'Green Olive🫒 1/1,000 Olive trees are special in the Holy Land. The olive branch is universally regarded as a symbol of peace.',
  },
  {
    id: 2,
    name: 'Lychee',
    image: {
      path: '/images/rice.webp',
      name: '02.jpg',
    },
    unit: 1000,
    royalty: 9,
    description:
      'Green Olive🫒 1/1,000 Olive trees are special in the Holy Land. The olive branch is universally regarded as a symbol of peace.',
    properties:
      'Green Olive🫒 1/1,000 Olive trees are special in the Holy Land. The olive branch is universally regarded as a symbol of peace.',
  },
];

const CreateBulkMintHome: React.FC = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(true);

  const [isMinting, setMinting] = useState(false);

  const toggleGuide = () => {
    setOpen((open) => !open);
  };

  const handleClose = () => {
    setMinting(false);
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
                    <span className="font-medium text-black/70 dark:text-white/70">
                      CSV file*
                    </span>{' '}
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
                  <DutchC.CreateBulkMintContentNFTPreviewInner>
                    {/* preview table */}
                    <Table>
                      <THead>
                        <TR>
                          <TD>Media</TD>
                          <TD>Name</TD>
                          <TD>Unit</TD>
                          <TD>Royalty</TD>
                          <TD>Description</TD>
                          <TD>Properties</TD>
                        </TR>
                      </THead>
                      <TBody>
                        {nfts.map((nft) => (
                          <TR key={nft.id}>
                            <TD className="flex items-center space-x-2 text-sm text-black font-medium dark:text-white">
                              <Image
                                src={nft.image.path}
                                alt=""
                                width={40}
                                height={40}
                                className="border border-black/10 rounded dark:border-white/10"
                              />
                              <span>{nft.image.name}</span>
                            </TD>
                            <TD className="text-sm text-black dark:text-white whitespace-nowrap">
                              {nft.name}
                            </TD>
                            <TD className="text-sm text-black dark:text-white">
                              {nft.unit}
                            </TD>
                            <TD className="text-sm text-black dark:text-white">
                              {nft.royalty}
                            </TD>
                            <TD className="text-sm text-black dark:text-white max-w-[190px] truncate">
                              {nft.description}
                            </TD>
                            <TD className="text-sm text-black dark:text-white max-w-[190px] truncate">
                              {nft.properties}
                            </TD>
                          </TR>
                        ))}
                      </TBody>
                    </Table>
                  </DutchC.CreateBulkMintContentNFTPreviewInner>
                </DutchC.CreateBulkMintContentNFTPreviewWrapper>
              </DutchC.CreateBulkMintContentMainRight>
            </DutchC.CreateBulkMintContentMain>

            {/* Actions */}
            <DutchC.CreateBulkMintContentActions>
              <Button
                onClick={() => {
                  setMinting(true);
                }}
              >
                Mint all NFTs
              </Button>
              <Button>Save to Drafts</Button>
              <OutlineButton>Cancel</OutlineButton>
            </DutchC.CreateBulkMintContentActions>
          </DutchC.CreateBulkMintContentBody>
        </DutchC.CreateBulkMintContent>
      </DutchC.CreateBulkMintWrapper>

      <MintingModal
        onClose={handleClose}
        openModal={isMinting}
        className="!max-w-xl"
      />

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
