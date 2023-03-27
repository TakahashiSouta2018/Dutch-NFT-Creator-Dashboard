import React, { useEffect, useState } from 'react';
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
import Breadcrumb from '../../shared/Breadcrumb';
import MintingModal from '../minting';

// icons
import * as Icons from '@/common/Icons';
import FolderUpload from '@/common/Upload/FolderUpload';
import { CSVMetadataI } from '@/types';
import CollectionDropdown from '@/common/Dropdown/CollectionDropdown';
import useNFTHook from '@/hooks/useNFTHook';
import { pinFileToIPFS } from '@/lib/pinata';
import { useAppDispatch } from '@/redux/store';
import { setMintModalIsOpen, setSelectedDraftNFTs } from '../ducks';
import { handleNFTPropertiesFromFolder } from '@/lib/metadata';


const CreateBulkMintHome: React.FC = () => {
  const dispatch = useAppDispatch();

  const { theme } = useTheme();
  const { createDraftNFT } = useNFTHook();

  const [open, setOpen] = useState(true);
  const [isSavingToDraft, setIsSavingToDraft] = useState<boolean>(false);
  const [isMintingNft, setIsMintingNft] = useState<boolean>(false);
  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [selectedCSVFileContent, setSelectedCSVFileContent] = useState<
    CSVMetadataI[]
  >([]);

  const toggleGuide = () => {
    setOpen((open) => !open);
  };


  const handleSaveToDraft = async () => {
    if (selectedCSVFileContent.length !== imageUrls.length) {
      return alert("CSV content not equal to selected images folder");
    }

    setIsSavingToDraft(true);

    await Promise.all(
      selectedCSVFileContent.map(async (csvFileContent, index) => {
        const mediaUrl = await pinFileToIPFS([String(imageUrls[index])]);
        const { properties } = handleNFTPropertiesFromFolder(csvFileContent.properties);

        return await createDraftNFT({
          properties: JSON.stringify(properties),
          collection: selectedCollectionAddress,
          media: String(mediaUrl),
          name: csvFileContent.name,
          royalty: csvFileContent.royalties,
          amount: csvFileContent.amount,
          description: csvFileContent.description,
        });

      })
    );

    alert("NFTs are saved to draft");
    
    setIsSavingToDraft(false);

  };

  const handleMintNfts = async () => {

    if (selectedCSVFileContent.length !== imageUrls.length) {
      return alert("CSV content not equal to selected images folder");
    }

    setIsMintingNft(true);

    const nfts = await Promise.all(
      selectedCSVFileContent.map(async (csvFileContent, index) => {
        const mediaUrl = await pinFileToIPFS([String(imageUrls[index])]);
        const { properties } = handleNFTPropertiesFromFolder(csvFileContent.properties);

        return {
          properties: JSON.stringify(properties),
          collection: selectedCollectionAddress,
          media: String(mediaUrl),
          name: csvFileContent.name,
          royalty: csvFileContent.royalties,
          amount: csvFileContent.amount,
          description: csvFileContent.description,
        };

      })
    );    

    dispatch(setSelectedDraftNFTs(nfts))
    dispatch(setMintModalIsOpen(true))
    setIsMintingNft(false);

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
              <CollectionDropdown
                selectedCollectionAddress={selectedCollectionAddress}
                setSelectedCollectionAddress={setSelectedCollectionAddress}
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

                  <FolderUpload
                    setImageUrls={setImageUrls}
                    imageUrls={imageUrls}
                  />
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

                  <CSVUpload
                    selectedCSVFileContent={selectedCSVFileContent}
                    setSelectedCSVFileContent={setSelectedCSVFileContent}
                  />
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
                        {selectedCSVFileContent.length === imageUrls.length && selectedCSVFileContent.map((csvFileContent, index) => {
                          return (
                            <TR key={index}>
                              <TD className="flex items-center space-x-2 text-sm text-black font-medium dark:text-white">
                                <Image
                                  src={imageUrls[index]}
                                  alt=""
                                  width={40}
                                  height={40}
                                  className="border border-black/10 rounded dark:border-white/10"
                                />
                                <span>{csvFileContent.name}</span>
                              </TD>
                              <TD className="text-sm text-black dark:text-white whitespace-nowrap">
                                {csvFileContent.name}
                              </TD>
                              <TD className="text-sm text-black dark:text-white">
                                {csvFileContent.amount}
                              </TD>
                              <TD className="text-sm text-black dark:text-white">
                                {csvFileContent.royalties}
                              </TD>
                              <TD className="text-sm text-black dark:text-white max-w-[190px] truncate">
                                {csvFileContent.description}
                              </TD>
                              <TD className="text-sm text-black dark:text-white max-w-[190px] truncate">
                                {csvFileContent.properties}
                              </TD>
                            </TR>
                          );
                        })}
                      </TBody>
                    </Table>
                  </DutchC.CreateBulkMintContentNFTPreviewInner>
                </DutchC.CreateBulkMintContentNFTPreviewWrapper>
              </DutchC.CreateBulkMintContentMainRight>
            </DutchC.CreateBulkMintContentMain>

            {/* Actions */}
            <DutchC.CreateBulkMintContentActions>
              <Button onClick={handleMintNfts} loading={isMintingNft}>
                Mint all NFTs
              </Button>
              <Button onClick={handleSaveToDraft} loading={isSavingToDraft}>Save to Drafts</Button>
              <OutlineButton>Cancel</OutlineButton>
            </DutchC.CreateBulkMintContentActions>
          </DutchC.CreateBulkMintContentBody>
        </DutchC.CreateBulkMintContent>
      </DutchC.CreateBulkMintWrapper>

      <MintingModal className="!max-w-xl" />

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
