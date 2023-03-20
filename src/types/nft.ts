export interface Pending {
  withdraw: string;
  deposit: string;
}

export interface Preference {
  favourite: boolean;
  hide: boolean;
}

export interface Cached {
  avatar: string;
  banner: string;
  tileUri: string;
  thumbnail: string;
}

export interface Times {
  createdAt: number;
  updatedAt: number;
}

export interface Properties {
  isLegacy: boolean;
  isPublic: boolean;
  isCounterFactualNFT: boolean;
  isMintable: boolean;
  isEditable: boolean;
  isDeletable: boolean;
}

export interface Extra {
  properties: Properties;
  mintChannel: string;
}

export interface NFTCollectionInfo {
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
  cached: Cached;
  deployStatus: string;
  nftType: string;
  times: Times;
  extra: Extra;
}

export interface NFTI {
  id: number;
  accountId: number;
  tokenId: number;
  nftData: string;
  tokenAddress: string;
  nftId: string;
  nftType: string;
  total: string;
  locked: string;
  pending: Pending;
  deploymentStatus: string;
  isCounterFactualNFT: boolean;
  minter: string;
  royaltyPercentage: number;
  preference: Preference;
  collectionInfo: NFTCollectionInfo;
}

export interface CreateNftManagementI {
  id: string;
  collection: string;
  owner: string;
  accountId: string;
  nftId: string;
  nftData: string;
  createdAt?: Date | string;
}
