import React, { useState } from 'react';
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
  setCollectionNfts,
  setSelectedNfts,
} from '@/components/dashboard/ducks';
import { useRouter } from 'next/router';

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
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { syncNft } = useNFTManagement();

  const [listName, setListName] = useState<string>('');
  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState<string>('');

  const { accountInfo } = useAppSelector((state) => {
    const { accountInfo } = state.webAppReducer;
    return { accountInfo };
  }, shallowEqual);

  const handleSubmitButtonClick = async () => {
    try {
      if (currentTab === 'LIST' && listName === '')
        return toast('Add a list name', { type: 'info' });

      if (currentTab === 'ALL' || currentTab === 'LIST') {
        await syncNft(listName);
      }

      dispatch(setSelectedNfts([]));
      dispatch(setCollectionNfts([]));

      onClose();
      push('/dummy/nft-management');
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
            {accountInfo?.accInfo.owner}
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

          <SearchInput placeholder="NFT name or id" />

          <NFTList lists={lists} currentTab={currentTab} />

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
