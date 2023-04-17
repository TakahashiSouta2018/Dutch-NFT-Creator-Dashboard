import Service from '.';

export default class LoopringApi extends Service<any> {
  constructor() {
    super('/loopring');
  }

  public getUserCollection(ownerAddress: string, apiKey: string) {
    return this.getRequest(`user-collection/${ownerAddress}`, apiKey);
  }

  public getUserCollectionNFTs(ownerAddress: string, tokenAddress: string) {
    return this.getRequest(`user-collection-nft/${ownerAddress}/${tokenAddress}`);
  }

}
