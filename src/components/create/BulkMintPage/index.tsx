import React, { useState } from 'react';
import { toast } from 'react-toastify';

// components
import { Button, CSVUpload, OutlineButton } from '@/common';
import Breadcrumb from '../../shared/Breadcrumb';

// icons
import FolderUpload from '@/common/Upload/FolderUpload';
import { CSVMetadataI } from '@/types';
import CollectionDropdown from '@/common/Dropdown/CollectionDropdown';
import useNFTHook from '@/hooks/useNFTHook';
import { pinFileToIPFS } from '@/lib/pinata';
import { useAppDispatch } from '@/redux/store';
import { setMintModalIsOpen, setSelectedDraftNFTs } from '../ducks';
import { handleNFTPropertiesFromFolder } from '@/lib/metadata';
import PreviewTable from './PreviewTable';
import Layout from '../shared/Layout';

const BulkMintPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { createDraftNFT } = useNFTHook();

  const [isSavingToDraft, setIsSavingToDraft] = useState<boolean>(false);
  const [isMintingNft, setIsMintingNft] = useState<boolean>(false);
  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [selectedCSVFileContent, setSelectedCSVFileContent] = useState<
    CSVMetadataI[]
  >([]);

  const handleSaveToDraft = async () => {
    if (selectedCSVFileContent.length !== imageUrls.length) {
      return toast('CSV content not equal to selected images folder', {
        type: 'error',
      });
    }

    setIsSavingToDraft(true);

    await Promise.all(
      selectedCSVFileContent.map(async (csvFileContent, index) => {
        const mediaUrl = await pinFileToIPFS([String(imageUrls[index])]);
        const { properties } = handleNFTPropertiesFromFolder(
          csvFileContent.properties
        );

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

    toast('NFTs are saved to draft', { type: 'error' });

    setIsSavingToDraft(false);
  };

  const handleMintNfts = async () => {
    if (selectedCSVFileContent.length !== imageUrls.length) {
      return toast('CSV content not equal to selected images folder', {
        type: 'error',
      });
    }

    setIsMintingNft(true);

    const nfts = await Promise.all(
      selectedCSVFileContent.map(async (csvFileContent, index) => {
        const mediaUrl = await pinFileToIPFS([String(imageUrls[index])]);
        const { properties } = handleNFTPropertiesFromFolder(
          csvFileContent.properties
        );

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

    dispatch(setSelectedDraftNFTs(nfts));
    dispatch(setMintModalIsOpen(true));
    setIsMintingNft(false);
  };

  return (
    <Layout>
      <Breadcrumb />

      <div className="flex flex-col space-y-4 p-4 border border-black/10 rounded-lg dark:border-white/10">
        <div className="text-2xl font-bold whitespace-nowrap text-black dark:text-white">
          Bulk Mint
        </div>

        <div className="w-1/3 mr-2">
          <CollectionDropdown
            selectedCollectionAddress={selectedCollectionAddress}
            setSelectedCollectionAddress={setSelectedCollectionAddress}
          />
        </div>

        <div className="grid grid-cols-3 space-x-4">
          <div className="col-span-1 flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium text-black/70 dark:text-white/70">
                Media files* <br /> (Supported : JPG, PNG, GIF, WEBP, WEBM, MP4,
                GLB, GLTF)
              </div>

              <FolderUpload setImageUrls={setImageUrls} imageUrls={imageUrls} />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm">
                <span className="font-medium text-black/70 dark:text-white/70">
                  CSV file*
                </span>{' '}
                <br />
                <p>
                  <span className="font-bold">Download our CSV template</span>{' '}
                  to make sure your CSV is formatted correctly.
                </p>
              </label>

              <CSVUpload
                selectedCSVFileContent={selectedCSVFileContent}
                setSelectedCSVFileContent={setSelectedCSVFileContent}
              />
            </div>
          </div>

          <PreviewTable
            selectedCSVFileContent={selectedCSVFileContent}
            imageUrls={imageUrls}
          />
        </div>

        {/* Actions */}
        <div className="inline-flex items-center space-x-4">
          <Button onClick={handleMintNfts} loading={isMintingNft}>
            Mint all NFTs
          </Button>
          <Button onClick={handleSaveToDraft} loading={isSavingToDraft}>
            Save to Drafts
          </Button>
          <OutlineButton>Cancel</OutlineButton>
        </div>
      </div>
    </Layout>
  );
};

export default BulkMintPage;
