interface Block {
  timestamp: string;
  gasPrice: string;
  gasLimit: string;
  txHash: string;
}

interface User {
  address: string;
}

interface NFT {
  minter: User;
  creatorFeeBips: number;
  nftID: string;
}

interface Token {
  decimals: number;
  name: string;
  symbol: string;
}

export interface TradeNFTI {
  feeSeller: string;
  realizedNFTPrice: string;
  internalID: string;
  fFillSB: number;
  block: Block;
  token: Token;
  nfts: NFT[];
  accountBuyer: User;
  accountSeller: User;
}
