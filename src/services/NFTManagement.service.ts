import { CreateNftManagementI } from '@/types';
import Service from '.';

export default class DraftNFTService extends Service<any> {
  constructor() {
    super('/nftManagement');
  }

  public manageNFT(
    createNftManagement: Omit<CreateNftManagementI, 'id' | 'createdAt'>
  ) {
    return this.postRequest(``, { ...createNftManagement });
  }

  public getAllNFT(accessToken: string) {
    return this.getRequest(``, accessToken);
  }
}
