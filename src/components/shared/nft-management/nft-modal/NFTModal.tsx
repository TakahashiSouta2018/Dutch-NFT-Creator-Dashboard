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
import * as DutchC from './styles';
import NFTList from '../NFTList';
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
  setIsSynced?: () => void;
}

interface SwitchProps {
  selected: boolean;
  onAll: () => void;
  onSelected: () => void;
}

export const NFTListSwitch: React.FC<SwitchProps> = ({
  selected,
  onAll,
  onSelected,
}) => {
  return (
    <TabContainer>
      <TabGroup>
        <Tab active={selected} slug="ALL" onClick={onAll}>
          All{` (5)`}
        </Tab>
        <Tab active={!selected} slug="LIST" onClick={onSelected}>
          Selected{` (3)`}
        </Tab>
      </TabGroup>
    </TabContainer>
  );
};

const NFTModal: React.FC<NFTModalProp> = ({
  onClose,
  lists,
  currentTab,
  showSyncModal,
  setIsSynced,
}) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { syncNft } = useNFTManagement();

  const [listName, setListName] = useState<string>('');
  const [selected, setSelected] = useState<boolean>(true);
  const [isSelectedTable, setIsSelectedTable] = useState(false);
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
        // await syncNft(listName);
        setIsSynced && setIsSynced();
      }

      dispatch(setSelectedNfts([]));
      dispatch(setCollectionNfts([]));

      onClose();
      push('/nft-management');
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
        <DutchC.NFTWalletAddress>
          <IconButton icon="document" />
          <p className="text-sm text-black/70 dark:text-white">
            {accountInfo?.accInfo.owner}
          </p>
        </DutchC.NFTWalletAddress>
      </ModalHead>
      <ModalBody>
        <DutchC.NFTModalBodyInner>
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
          <NFTListSwitch
            selected={!isSelectedTable}
            onAll={() => {
              setIsSelectedTable(false);
            }}
            onSelected={() => {
              setIsSelectedTable(true);
            }}
          />
          <SearchInput placeholder="NFT name or id" />
          <NFTList
            lists={lists}
            currentTab={currentTab}
            isSelectedTable={isSelectedTable}
          />
          <DutchC.NFTModalFooterWrapper>
            <OutlineButton
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              Cancel
            </OutlineButton>
            <Button onClick={handleSubmitButtonClick}>
              {currentTab === 'LIST' ? 'Save Changes' : 'Sync NFTs'}
            </Button>
          </DutchC.NFTModalFooterWrapper>
        </DutchC.NFTModalBodyInner>
      </ModalBody>
    </Modal>
  );
};

export default NFTModal;
