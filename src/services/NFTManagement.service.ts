import { CreateNftManagementI, UsageStatusEnum } from '@/types';
import Service from '.';

export default class NFTManagementService extends Service<any> {
  constructor() {
    super('/nftManagement');
  }

  public syncNFT(
    createNftManagements: Omit<CreateNftManagementI, 'id' | 'createdAt'>[]
  ) {
    return this.postRequest(``, { data: [...createNftManagements] });
  }

  public manageNFT(
    createNftManagement: Omit<CreateNftManagementI, 'id' | 'createdAt'>
  ) {
    return this.postRequest(``, { ...createNftManagement });
  }

  public getUserNftId(ownerAddress: string, nftId: string) {
    return this.getRequest(`nft/${ownerAddress}/${nftId}`);
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
