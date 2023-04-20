import { CreateNftManagementI, UsageStatusEnum } from '@/types';
import Service from '.';

export default class NFTManagementService extends Service<any> {
  constructor() {
    super('/nftManagement');
  }

  public syncNFT(createNftManagements: CreateNftManagementI[]) {
    return this.postRequest(``, { data: [...createNftManagements] });
  }

  public manageNFT(
    createNftManagement: Omit<CreateNftManagementI, 'id' | 'createdAt'>
  ) {
    return this.postRequest(``, { ...createNftManagement });
  }

  public getUserNFTByAvailablity(ownerAddress: string, amount: number, available: number) {
    return this.getRequest(`findByAvailablity?ownerAddress=${ownerAddress}&amount=${amount}&available=${available}`);
  }

  public getUserNFTByCollection(ownerAddress: string, collectionAddress: string) {
    return this.getRequest(`findByCollection?ownerAddress=${ownerAddress}&collectionAddress=${collectionAddress}`);
  }

  public getUserNftId(ownerAddress: string, nftId: string) {
    return this.getRequest(`nft/${ownerAddress}/${nftId}`);
  }

  public getAllUserNFTAttribute(ownerAddress: string) {
    return this.getRequest(`userNftAttribute/${ownerAddress}`);
  }

  public getUserNFTByAttribute(ownerAddress: string, attributeValue: string) {
    return this.getRequest(`findByAttribute?ownerAddress=${ownerAddress}&attributeValue=${attributeValue}`);
  }

  public getUserNftList(ownerAddress: string) {
    return this.getRequest(`list/${ownerAddress}`);
  }

  public getUserCollectionList(ownerAddress: string) {
    return this.getRequest(`collection/${ownerAddress}`);
  }

  public getUserNfts(ownerAddress: string, isArchived: UsageStatusEnum) {
    return this.getRequest(`${ownerAddress}/${isArchived}`);
  }
}
