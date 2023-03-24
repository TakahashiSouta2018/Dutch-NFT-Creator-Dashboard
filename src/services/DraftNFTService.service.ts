import { DeleteDraftNFTRequestI, DraftNFTI } from '@/types';
import Service from '.';


export default class DraftNFTService extends Service<any> {
  constructor() {
    super('/draftNFT');
  }

  public createDraftNFT(draftNFTI: DraftNFTI) {
    return this.postRequest(``, { ...draftNFTI });
  }

  public deleteDraftNFT(reqData: DeleteDraftNFTRequestI) {
    return this.postRequest(`deleteDraftNft`, {...reqData});
  }

  public getCollectionDraftNFT(collectionAddress: string, ownerAddress: string) {
    return this.getRequest(`draftNft/${ownerAddress}/${collectionAddress}`);
  }

  public getAllDraftNFT(accessToken: string) {
    return this.getRequest(`status`, accessToken);
  }
}
