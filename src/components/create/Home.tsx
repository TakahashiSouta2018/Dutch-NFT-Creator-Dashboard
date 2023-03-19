import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

// components
import { Dropdown, Button, SearchInput } from '@/common';
import { Guide } from '@/components/shared';
import * as DutchC from './styles';
import Breadcrumb from './Breadcrumb';

// icons
import * as Icons from '@/common/Icons';
import MintingModal from './minting';

// types
type NFTT = {
  id: number;
  title: string;
  image: string;
  unit: number;
  description: string;
  selected: boolean;
};

type DraftNFTProps = NFTT & {
  onSelect: () => void;
};

const options = ['Option A', 'Option B', 'Option C'];

const CreateHome: React.FC = () => {
  const { theme } = useTheme();
  const [collection, setCollection] = useState(options[0]);
  const [open, setOpen] = useState(true);
  const [openMintModal, setOpenMintModal] = useState(false);
  const [draftNFTs, setDraftNFTs] = useState<NFTT[]>([
    {
      id: 1,
      title: 'Green Grapes',
      image: '/images/rice.webp',
      unit: 1000,
      description:
        'Green Olive🫒 1/1,000 Olive trees are special in the Holy Land. The olive branch is universally regarded as a symbol of peace.',
      selected: false,
    },
    {
      id: 2,
      title: 'Green Grapes Test',
      image: '/images/rice.webp',
      unit: 1000,
      description:
        'Green Olive🫒 1/1,000 Olive trees are special in the Holy Land. The olive branch is universally regarded as a symbol of peace.',
      selected: false,
    },
  ]);

  const onCollectionSelect = (value: string) => {
    setCollection(value);
  };

  const onNFTSelect = useCallback(
    (id: number) => {
      const index = draftNFTs.findIndex((nft) => nft.id === id);
      const nft = draftNFTs.find((nft) => nft.id === id);
      if (nft) {
        setDraftNFTs([
          ...draftNFTs.slice(0, index),
          {
            ...nft,
            selected: !nft.selected,
          },
          ...draftNFTs.slice(index + 1),
        ]);
      }
    },
    [draftNFTs]
  );

  const toggleGuide = () => {
    setOpen((open) => !open);
  };

  const handleClose = () => {
    setOpenMintModal(false);
  };

  const handleBack = () => {
    setOpenMintModal(false);
  };

  return (
    <DutchC.CreateWrapper>
      {/* modals */}
      {/* --- NFT mint modal */}
      {openMintModal && (
        <MintingModal onClose={handleClose} onBack={handleBack} />
      )}
      <DutchC.CreateContentWrapper open={open ? 1 : 0}>
        <DutchC.CreateContent>
          <Breadcrumb />
          <DutchC.CreateContentHeader>
            <DutchC.CreateContentLeft>
              <DutchC.CreateContentTitle>
                Drafted NFTs
              </DutchC.CreateContentTitle>
              <DutchC.CreateContentSubTitle>
                NFTs that you have uploaded in DUTCH0x but not minted yet will
                show here.
              </DutchC.CreateContentSubTitle>
              <DutchC.CreateContentCollection>
                <Dropdown
                  value={collection}
                  onSelect={onCollectionSelect}
                  options={options}
                  position="BL"
                  label="Collection"
                />
              </DutchC.CreateContentCollection>
            </DutchC.CreateContentLeft>

            <DutchC.CreateContentHeaderActions>
              <Button>
                <Link href="/create/create-collection">Create Collection</Link>
              </Button>
              <Button>
                <Link href="/create/draft-nft">Draft NFT</Link>
              </Button>
              <Button>
                <Link href="/create/bulk-mint">Bulk NFT</Link>
              </Button>
            </DutchC.CreateContentHeaderActions>
          </DutchC.CreateContentHeader>

          <DutchC.CreateContentBody>
            {/* No items */}
            {/* <DutchC.CreateContentNoItems>
              <span className="dark:text-white/50">No items to show here.</span>
            </DutchC.CreateContentNoItems> */}
            {/* If some draft nfts are avaiable to show */}
            <DutchC.CreateContentTools>
              <SearchInput />
              <Button onClick={() => setOpenMintModal(true)}>
                Mint Selected NFTs
              </Button>
              <Button>Mint all NFTs</Button>
            </DutchC.CreateContentTools>
            <DutchC.CreateContentDraftNFTs>
              {draftNFTs.map((nft) => (
                <DraftNFT
                  key={nft.id}
                  onSelect={() => onNFTSelect(nft.id)}
                  {...nft}
                />
              ))}
            </DutchC.CreateContentDraftNFTs>
          </DutchC.CreateContentBody>
        </DutchC.CreateContent>
      </DutchC.CreateContentWrapper>

      {/* toggle guide */}
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

const DraftNFT: React.FC<DraftNFTProps> = ({
  title,
  image,
  unit,
  description,
  selected,
  onSelect,
}) => {
  const { theme } = useTheme();

  return (
    <DutchC.DraftNFTCard selected={selected ? 1 : 0} onClick={onSelect}>
      {/* unit */}
      <DutchC.DraftNFTUnitBadge>{unit}</DutchC.DraftNFTUnitBadge>
      {/* selected mark */}
      {selected && (
        <DutchC.DraftNFTSelectedMark>
          <Icons.ICheckCircle
            color={theme === 'light' ? 'black' : 'white'}
            size="large"
          />
        </DutchC.DraftNFTSelectedMark>
      )}
      {/* image */}
      <Image
        src={image}
        alt="rice"
        width={230}
        height={230}
        className="aspect-square w-full"
      />
      {/* detail */}
      <DutchC.DraftNFTDetail>
        <DutchC.DraftNFTTitle>{title}</DutchC.DraftNFTTitle>
        <DutchC.DraftNFTDescription>{description}</DutchC.DraftNFTDescription>
      </DutchC.DraftNFTDetail>
      {/* actions */}
      <DutchC.DraftNFTActions>
        <DutchC.DraftNFTEdit>Edit</DutchC.DraftNFTEdit>
        <DutchC.DraftNFTDelete>Delete</DutchC.DraftNFTDelete>
      </DutchC.DraftNFTActions>
    </DutchC.DraftNFTCard>
  );
};

export default CreateHome;
