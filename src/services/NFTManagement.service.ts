import { CreateNftManagementI } from '@/types';
import Service from '.';

export default class NFTManagementService extends Service<any> {
  constructor() {
    super('/nftManagement');
  }

  public syncNFT(
    createNftManagement: Omit<CreateNftManagementI, 'id' | 'createdAt'>
  ) {
    return this.postRequest(``, { ...createNftManagement });
  }

  public manageNFT(
    createNftManagement: Omit<CreateNftManagementI, 'id' | 'createdAt'>
  ) {
    return this.postRequest(``, { ...createNftManagement });
  }

  public getUserNftId(
    ownerAddress: string,
    nftId: string
  ) {
    return this.getRequest(`nft/${ownerAddress}/${nftId}`);
  }

  public getUserNftList(ownerAddress: string) {
    return this.getRequest(`list/${ownerAddress}`);
  }

  public getAllNFT(ownerAddress: string) {
    return this.getRequest(`${ownerAddress}`);
  }
}
