import React, { useState } from 'react';
import {
  Modal,
  ModalHead,
  ModalBody,
  OutlineButton,
  Button,
  TabContainer,
  Tab,
  SearchInput,
} from '@/common';
import SortSelect from '@/common/Input/SortSelect';

import { IconButton } from '@/common';
import ProfileNFTCard from './ProfileNFTCard';
import { MediaUpload } from '@/common';

import * as DutchC from './styles';

type PROFILE_EDIT = 'FROMNFT' | 'UPLOADNEW';

const tabs = [
  {
    label: 'From Your NFTs',
    slug: 'FROMNFT',
  },
  {
    label: 'Upload New',
    slug: 'UPLOADNEW',
  },
];

const nfts = [
  {
    src: '/images/rice.webp',
    title: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game...',
  },
  {
    src: '/images/rice.webp',
    title: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game...',
  },
  {
    src: '/images/rice.webp',
    title: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game...',
  },
  {
    src: '/images/rice.webp',
    title: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game...',
  },
  {
    src: '/images/rice.webp',
    title: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game...',
  },
  {
    src: '/images/rice.webp',
    title: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game...',
  },
  {
    src: '/images/rice.webp',
    title: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game...',
  },
  {
    src: '/images/rice.webp',
    title: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game...',
  },
];

interface PhotoEditProps {
  isPhotoEdit: boolean;
  onPhotoEdit: () => void;
}
const PhotoEdit: React.FC<PhotoEditProps> = ({ isPhotoEdit, onPhotoEdit }) => {
  const [currentSwitch, setCurrentSwitch] = useState('FROMNFT' as PROFILE_EDIT);
  return (
    <Modal isOpen={isPhotoEdit}>
      <ModalHead onClose={onPhotoEdit} title="Edit Profile Photo" />
      <ModalBody>
        <DutchC.ProfileEditModalBodyWrapper>
          <DutchC.ProfileEditModalBodyInner>
            <TabContainer>
              {tabs.map((tab) => (
                <Tab
                  key={tab.slug}
                  active={tab.slug === currentSwitch}
                  onClick={(slug) => {
                    setCurrentSwitch(slug as PROFILE_EDIT);
                  }}
                  slug={tab.slug as PROFILE_EDIT}
                >
                  {tab.label}
                </Tab>
              ))}
            </TabContainer>
            {currentSwitch === 'FROMNFT' ? <FromNFTs /> : <UploadNew />}
          </DutchC.ProfileEditModalBodyInner>
          <DutchC.ProfileEditActions>
            <OutlineButton onClick={onPhotoEdit}>Cancel</OutlineButton>
            <Button>Set As Profile Photo</Button>
          </DutchC.ProfileEditActions>
        </DutchC.ProfileEditModalBodyWrapper>
      </ModalBody>
    </Modal>
  );
};

export default PhotoEdit;

export const FromNFTs = () => {
  return (
    <DutchC.FromNFTsWrapper>
      <DutchC.FromNFTsNavbar>
        <IconButton icon="funnel" rounded className="p-2" />
        <SearchInput className="flex-grow" />
        <SortSelect />
      </DutchC.FromNFTsNavbar>
      <DutchC.FromNFTsItem>
        {nfts.map((nft, i) => (
          <ProfileNFTCard
            key={i}
            src={nft.src}
            title={nft.title}
            collection={nft.collection}
          />
        ))}
      </DutchC.FromNFTsItem>
    </DutchC.FromNFTsWrapper>
  );
};

export const UploadNew = () => {
  const [media, setMedia] = useState<string>('');

  return (
    <DutchC.UploadNewWrapper>
      <MediaUpload
        variant="default"
        setImageUrl={setMedia}
        imageUrl={media}
        name="media"
        profile={true}
      />
    </DutchC.UploadNewWrapper>
  );
};
