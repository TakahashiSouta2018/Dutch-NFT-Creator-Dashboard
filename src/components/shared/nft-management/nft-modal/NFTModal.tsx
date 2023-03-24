import React, { useState } from 'react';
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
  Dropdown,
} from '@/common';
import { IconButton } from '@/common';
import * as DutchC from './styles';
import NFTList from '../NFTList';
import { NFTListType } from '@/types';

interface NFTModalProp {
  onClose: () => void;
  onSynced?: () => void;
  lists: NFTListType[];
  currentTab?: 'ALL' | 'LIST' | 'COLLECTION' | 'ARCHIVE' | 'BANK0X';
  showSyncModal: boolean;
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
          All{`(5)`}
        </Tab>
        {/* <Tab active={!selected} slug="ALL" onClick={onSelected}>
          Selected{`(3)`}
        </Tab> */}
      </TabGroup>
    </TabContainer>
  );
};
const options = [
  'A 🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
  'B 🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
  'C 🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
];

const NFTModal: React.FC<NFTModalProp> = ({
  onClose,
  onSynced,
  lists,
  currentTab,
  showSyncModal,
}) => {
  const [selected, setSelected] = useState(true);
  const [collection, setCollection] = useState(options[0]);

  const onCollectionSelect = (value: string) => {
    setCollection(value);
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
            0xa613c0e37979f1a3bf9e96c9a42ef7b9e6392025
          </p>
        </DutchC.NFTWalletAddress>
      </ModalHead>
      <ModalBody>
        <DutchC.NFTModalBodyInner>
          <div className="flex gap-6 justify-between">
            {currentTab === 'LIST' && (
              <div className="w-1/2">
                <p>List Name</p>
                <TextInput />
              </div>
            )}
            <div className="w-1/2 z-10">
              <Dropdown
                value={collection}
                onSelect={onCollectionSelect}
                options={options}
                position="BL"
                label="Collection"
              />
            </div>
          </div>
          <NFTListSwitch
            selected={selected}
            onAll={() => {
              setSelected(true);
            }}
            onSelected={() => {
              setSelected(false);
            }}
          />
          <SearchInput placeholder="NFT name or id" />
          <NFTList selected={!selected} lists={lists} currentTab={currentTab} />
          <DutchC.NFTModalFooterWrapper>
            <OutlineButton
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              Cancel
            </OutlineButton>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onSynced && onSynced();
                onClose();
              }}
            >
              {currentTab === 'LIST' ? 'Save Changes' : 'Sync NFTs'}
            </Button>
          </DutchC.NFTModalFooterWrapper>
        </DutchC.NFTModalBodyInner>
      </ModalBody>
    </Modal>
  );
};

export default NFTModal;
