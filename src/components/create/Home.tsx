import React, { useState, useCallback, useEffect } from 'react';
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
import useCollectionHook from '@/hooks/useCollectionHook';
import useNFTHook from '@/hooks/useNFTHook';
import { DraftNFTResponseI } from '@/types';
import { LoopringService } from '@/lib/LoopringService';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';


type DraftNFTProps = DraftNFTResponseI & {
  onSelect: () => void;
};

const CreateHome: React.FC = () => {
  const { theme } = useTheme();
  const { userCollection, collectionNames } = useCollectionHook();
  const { getCollectionDraftNFT } = useNFTHook();

  const loopringService = new LoopringService();

  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState<string>('');
  const [selectedCollectionName, setSelectedCollectionName] =
    useState<string>('');

  const [open, setOpen] = useState(true);
  const [openMintModal, setOpenMintModal] = useState(false);
  const [draftNFTs, setDraftNFTs] = useState<DraftNFTResponseI[]>([]);

  const { accountInfo } = useAppSelector((state) => {
    const { accountInfo } = state.webAppReducer;
    return { accountInfo };
  }, shallowEqual);


  useEffect(() => {
    (async () => {
      if (selectedCollectionAddress) {
        const nft = await getCollectionDraftNFT(selectedCollectionAddress);
        if (nft) {
          setDraftNFTs(nft)
        }
      }
    })();
  }, [selectedCollectionAddress]);

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

  const handleMintSelectedNft = async () => {
    if (!accountInfo) return alert('wallet not connect');

    const selectedNftsTokenAddress = draftNFTs
      .filter(draftNFT => draftNFT.selected)
      .map(draftNFT => draftNFT.collection)

    const fees = [];
    let totalFeeAmount = 0;

    for (const tokenAddress of selectedNftsTokenAddress) {
      const collectionMeta = await loopringService.getCollectionMeta(accountInfo, tokenAddress)
      if (!collectionMeta) return;

      const fee = await loopringService.getNFTOffchainFeeAmt(accountInfo, collectionMeta);

      const feeAmount = fee.fees['ETH'].fee;
      totalFeeAmount += Number(feeAmount);
      fees.push(feeAmount);

    }
    
    setOpenMintModal(true);
  };

  const handleSelectCollection = (value: string, index: number) => {
    setSelectedCollectionName(value);
    setSelectedCollectionAddress(userCollection[index].collectionAddress);
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
                  label="Collection"
                  value={selectedCollectionName}
                  options={collectionNames}
                  position="BL"
                  onSelect={handleSelectCollection}
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
              <Button onClick={handleMintSelectedNft}>
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
  id,
  name,
  media,
  amount,
  description,
  selected,
  onSelect,
}) => {
  const { theme } = useTheme();
  const { deleteDraftNFT } = useNFTHook();


  return (
    <DutchC.DraftNFTCard selected={selected ? 1 : 0} onClick={onSelect}>
      {/* unit */}
      <DutchC.DraftNFTUnitBadge>{amount}</DutchC.DraftNFTUnitBadge>
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
        src={media}
        alt="rice"
        width={230}
        height={230}
        className="aspect-square w-full"
      />
      {/* detail */}
      <DutchC.DraftNFTDetail>
        <DutchC.DraftNFTTitle>{name}</DutchC.DraftNFTTitle>
        <DutchC.DraftNFTDescription>{description}</DutchC.DraftNFTDescription>
      </DutchC.DraftNFTDetail>
      {/* actions */}
      <DutchC.DraftNFTActions>
        <DutchC.DraftNFTEdit>Edit</DutchC.DraftNFTEdit>
        <DutchC.DraftNFTDelete onClick={() => deleteDraftNFT(id)}>Delete</DutchC.DraftNFTDelete>
      </DutchC.DraftNFTActions>
    </DutchC.DraftNFTCard>
  );
};

export default CreateHome;
