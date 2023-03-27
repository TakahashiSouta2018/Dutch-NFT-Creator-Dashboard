import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

// components
import { Dropdown, Button, SearchInput } from '@/common';
import { Guide, Breadcrumb } from '@/components/shared';
import * as DutchC from './styles';

// icons
import * as Icons from '@/common/Icons';
import MintingModal from './minting';
import useNFTHook from '@/hooks/useNFTHook';
import { DraftNFTResponseI } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import CollectionDropdown from '@/common/Dropdown/CollectionDropdown';
import { getIpfsHttpUrl } from '@/lib/pinata';
import { setDraftNFTs, setMintModalIsOpen } from './ducks';
import { useRouter } from 'next/router';

type DraftNFTProps = DraftNFTResponseI & {
  onSelect: () => void;
};

const CreateHome: React.FC = () => {
  const { theme } = useTheme();
  const { getCollectionDraftNFT } = useNFTHook();

  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState<string>('');
  const [open, setOpen] = useState(true);

  const { draftNFTs } = useAppSelector((state) => {
    const { draftNFTs } = state.createPageReducer;
    return { draftNFTs };
  }, shallowEqual);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (selectedCollectionAddress) {
        const nft = await getCollectionDraftNFT(selectedCollectionAddress);
        if (nft) {
          dispatch(setDraftNFTs(nft));
        }
      }
    })();
  }, [selectedCollectionAddress]);

  const onNFTSelect = useCallback(
    (id: number) => {
      const updatedNfts = draftNFTs.map((draftNFT) => {
        if (draftNFT.id === id) {
          return { ...draftNFT, selected: !draftNFT.selected };
        } else return draftNFT;
      });
      dispatch(setDraftNFTs(updatedNfts));
    },
    [draftNFTs]
  );

  const toggleGuide = () => {
    setOpen((open) => !open);
  };

  const isDraftNtSelected =
    draftNFTs.filter((draftNFT) => draftNFT.selected).length > 0;

  return (
    <DutchC.CreateWrapper>
      {/* --- NFT mint modal */}
      <MintingModal className="max-w-xl" />

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
                <CollectionDropdown
                  selectedCollectionAddress={selectedCollectionAddress}
                  setSelectedCollectionAddress={setSelectedCollectionAddress}
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

              {isDraftNtSelected && (
                <Button onClick={() => dispatch(setMintModalIsOpen(true))}>
                  Mint Selected NFTs
                </Button>
              )}
              {draftNFTs.length > 0 && <Button>Mint all NFTs</Button>}
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
  const { push } = useRouter();

  const { theme } = useTheme();
  const { deleteDraftNFT } = useNFTHook();

  const mediaUrl = getIpfsHttpUrl(media);

  const handleDeleteNft = async (id: number) => {
    const isDeleted = await deleteDraftNFT(id);

    if (isDeleted) {
      alert('Draft deleted successfully');
      push('/create');
    } else {
      alert('Error occured saving nft');
    }
  };

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
        src={mediaUrl}
        alt="rice"
        width={230}
        height={230}
        className="aspect-square w-60 h-60"
      />
      {/* detail */}
      <DutchC.DraftNFTDetail>
        <DutchC.DraftNFTTitle>{name}</DutchC.DraftNFTTitle>
        <DutchC.DraftNFTDescription>{description}</DutchC.DraftNFTDescription>
      </DutchC.DraftNFTDetail>
      {/* actions */}
      <DutchC.DraftNFTActions>
        <DutchC.DraftNFTEdit>Edit</DutchC.DraftNFTEdit>
        <DutchC.DraftNFTDelete onClick={() => handleDeleteNft(id)}>
          Delete
        </DutchC.DraftNFTDelete>
      </DutchC.DraftNFTActions>
    </DutchC.DraftNFTCard>
  );
};

export default CreateHome;
