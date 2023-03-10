import { DraftNFTI } from '@/types';
import Service from '.';

export default class DraftNFTService extends Service<any> {
  constructor() {
    super('/draftNFT');
  }

  public createDraftNFT(draftNFTI: DraftNFTI) {
    return this.postRequest(``, { ...draftNFTI });
  }

  public getAllDraftNFT(accessToken: string) {
    return this.getRequest(`status`, accessToken);
  }
}
