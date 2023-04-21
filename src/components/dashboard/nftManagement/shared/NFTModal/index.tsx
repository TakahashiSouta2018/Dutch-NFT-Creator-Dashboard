import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Button,
  Modal,
  ModalBody,
  ModalHead,
  OutlineButton,
  SearchInput,
  Tab,
  TabContainer,
  TabGroup,
  TextInput,
} from '@/common';
import { IconButton } from '@/common';
import NFTList from './NFTList';
import { NFTI, TabTypeT } from '@/types';
import CollectionDropdown from '@/common/Dropdown/CollectionDropdown';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import useNFTManagement from '@/hooks/useNFTManagement';
import {
  resetSelectedNfts,
  setCollectionNfts,
  setSelectedNfts,
} from '@/components/dashboard/ducks';
import { useRouter } from 'next/router';
import { WebAppReducerI } from '@/ducks';

interface NFTModalProp {
  onClose: () => void;
  lists: NFTI[];
  currentTab: TabTypeT;
  showSyncModal: boolean;
}

const NFTModal: React.FC<NFTModalProp> = ({
  onClose,
  lists,
  currentTab,
  showSyncModal,
}) => {
  const dispatch = useAppDispatch();
  const { syncNft } = useNFTManagement();

  const [NFTS, setNFTs] = useState<NFTI[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [listName, setListName] = useState<string>('');
  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState<string>('');

  const { account } = useAppSelector((state) => {
    const { account } = state.webAppReducer as WebAppReducerI;
    return { account };
  }, shallowEqual);

  useEffect(() => {
    setNFTs(lists)
  }, [lists.length])

  useEffect(() => {
    const handleSearchText = () => {
      const filterNfts = lists.filter((nft) => (nft.nftID.toLowerCase().includes(searchText.toLowerCase())) ||
        (nft.metadata.name.toLowerCase().includes(searchText.toLowerCase()))
      );
      setNFTs(filterNfts);
    };
    handleSearchText()
  }, [searchText])

  const handleSubmitButtonClick = async () => {
    try {
      if (currentTab === 'LIST' && listName === '')
        return toast('Add a list name', { type: 'info' });

      if (currentTab === 'ALL' || currentTab === 'LIST') {
        await syncNft(listName);
      }

      dispatch(resetSelectedNfts(null));
      dispatch(setCollectionNfts([]));

      onClose();
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={showSyncModal}>
      <ModalHead
        title="Sync NFTs"
        onClose={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <div className="flex pr-2 items-center bg-black/10 rounded-md">
          <IconButton icon="document" />
          <p className="text-sm text-black/70 dark:text-white">
            {account}
          </p>
        </div>
      </ModalHead>
      <ModalBody>
        <div className="flex flex-col gap-6">
          <div className="flex gap-6 justify-between">
            {currentTab === 'LIST' && (
              <div className="w-1/2">
                <p>List Name</p>
                <TextInput onChange={(e) => setListName(e.target.value)} />
              </div>
            )}
            <div className="w-1/2 z-10">
              <CollectionDropdown
                selectedCollectionAddress={selectedCollectionAddress}
                setSelectedCollectionAddress={setSelectedCollectionAddress}
              />
            </div>
          </div>
          <TabContainer>
            <TabGroup>
              <Tab active={true} slug="ALL">
                All {lists.length}
              </Tab>
            </TabGroup>
          </TabContainer>

          <SearchInput onChange={(e) => setSearchText(e.target.value)} placeholder="NFT name or id" />

          <NFTList lists={NFTS} currentTab={currentTab} />

          <div className="flex justify-end gap-3">
            <OutlineButton
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              Cancel
            </OutlineButton>
            <Button onClick={handleSubmitButtonClick} type="button">
              {currentTab === 'LIST' ? 'Save Changes' : 'Sync NFTs'}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default NFTModal;
