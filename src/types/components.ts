import * as sdk from '@loopring-web/loopring-sdk';
import { StaticImageData } from 'next/image';

/**
 * Button
 */
export type ButtonVariants = {
  variant?: 'solid' | 'outline' | 'text';
  size?: 'small' | 'large';
};

export type IconButtonVariants = {};

/**
 * Icon
 */
export type IconVariants = {
  variant?: 'solid' | 'outline';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?:
    | 'black'
    | 'gray'
    | 'white'
    | 'orange'
    | 'dark-gray'
    | 'white-gray'
    | 'accent-red'
    | 'accent-green'
    | 'dark-red';
};

export type SwitchButtonVariants = {
  bgColor?: string;
  size?: string;
};

/**
 * Input
 */
// --- Text Input

// --- Search Input
export type SearchInputVariant = {
  isShortCut?: boolean;
};

/**
 * Badge
 */
export type BadgeVariants = 'default' | 'dot' | 'icon';

/**
 * Link
 */
export type LinkSizes = 'small' | 'large';

/**
 * Dropdown
 */
export type DropdownPositionVariants = 'TL' | 'TR' | 'BL' | 'BR';

/**
 * Media Upload
 */
export type MediaUploadVariants = 'tile' | 'avatar' | 'banner' | 'default';

export interface AccountInfoI {
  accInfo: sdk.AccountInfo;
  eddsaKey: {
    keyPair: {
      publicKeyX: string;
      publicKeyY: string;
      secretKey: string;
    };
    formatedPx: string;
    formatedPy: string;
    sk: string;
    counterFactualInfo: any;
  };
  apiKey: string;
}

export interface CollectionObjectI {
  name: string;
  tileUri: string;
  description: string;
  avatar: string;
  banner: string;
}

export interface DraftNFTI {
  name: string;
  owner: string;
  collection: string;
  description: string;
  properties: string;
  royalty: string;
  amount: string;
  media: string;
}

export interface UserCollectionI {
  accountInfo: AccountInfoI;
  offset?: number;
  limit?: number;
  tokenAddress?: string;
  isMintable?: boolean;
}

export interface FeeI {
  raw_data: unknown;
  fees: sdk.LoopringMap<sdk.OffchainFeeInfo>;
}
export interface CSVMetadataI {
  amount: string;
  description: string;
  name: string;
  properties: string;
  royalties: string;
}

export interface LooseObjectI {
  [key: string]: string | string[] | number | any;
}

export interface NftDataI {
  image: string;
  animation_url: string;
  name: string;
  royalty_percentage: number;
  description: string;
  collection_metadata: string;
  mint_channel: string;
  properties: Record<string, string>;
  attributes: AttributeI[];
}

export interface AttributeI {
  trait_type: string;
  value: unknown;
}

export interface ConstrucMetadataI {
  folderCID: string;
  collectionMetadata: string;
  mintChannel?: string;
  imageNames: string[];
  animationUrlNames: string[];
  csvFileContents: CSVMetadataI[];
}

export interface MintNFTPostDataI {
  exchange: string;
  minterId: number;
  minterAddress: string;
  toAccountId: number;
  toAddress: string;
  nftType: number;
  tokenAddress: string;
  nftId: string;
  amount: string;
  creatorFeeBips: number;
  validUntil: number;
  storageId: number;
  maxFee: {
    tokenId: number;
    amount: string;
  };
  eddsaSignature: string;
  forceToMint: boolean;
  counterFactualNftInfo: {
    nftFactory: string;
    nftOwner: string;
    nftBaseUri: string;
  };
  royaltyAddress: string;
  royaltyPercentage: number;
}

export interface CollectionI {
  id: number;
  owner: string;
  name: string;
  contractAddress: string;
  collectionAddress: string;
  baseUri: string;
  nftFactory: string;
  description: string;
  avatar: string;
  banner: string;
  thumbnail: string;
  tileUri: string;
  cached: {
    avatar: string;
    banner: string;
    tileUri: string;
    thumbnail: string;
  };
  deployStatus: string;
  nftType: string;
  times: {
    createdAt: number;
    updatedAt: number;
  };
  extra: {
    properties: {
      isLegacy: boolean;
      isPublic: boolean;
      isCounterFactualNFT: boolean;
      isMintable: boolean;
      isEditable: boolean;
      isDeletable: boolean;
    };
    mintChannel: string;
  };
  extends: Record<string, unknown>;
}

export interface StepType {
  id: number;
  title: string;
  active: boolean;
}

export interface TransactionType {
  id: string;
  img: StaticImageData;
  title: string;
  status: number;
}

export interface nftListType {
  sr?: string;
  burned?: boolean;
  name: string;
  collection: string;
  selected: boolean;
  mintCount: number;
  img?: string;
  nftId: string;
}

export type PositionType = 'TL' | 'TR' | 'BL' | 'BR';
