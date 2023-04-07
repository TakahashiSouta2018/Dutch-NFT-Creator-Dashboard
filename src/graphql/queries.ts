import { gql } from '@apollo/client';

// fFillSB = unit
export const NFT_ID_TRANSACTIONS = gql`
  query ($nftIds: [String!]!) {
    transferNFTs(
      first: 1000
      orderBy: block__timestamp
      orderDirection: desc
      where: { nfts_: { nftID_in: $nftIds } }
    ) {
      id
    }
    tradeNFTs(
      first: 1000
      where: {
        nfts_: { nftID_in: $nftIds }
        token_: { symbol_in: ["ETH", "LRC"] }
      }
    ) {
      id
      feeSeller
      realizedNFTPrice
      internalID
      fFillSB
      block {
        timestamp
        gasPrice
        gasLimit
        txHash
      }
      token {
        decimals
        name
        symbol
      }
      nfts {
        minter {
          address
        }
        nftID
        creatorFeeBips
      }
      accountBuyer {
        address
      }
      accountSeller {
        id
        address
      }
    }
  }
`;

export const USER_NFTS = gql`
  query ($userAddress: String!) {
    nonFungibleTokens(
      first: 1000
      where: { minter_: { address: $userAddress } }
    ) {
      id
      nftID
      minter {
        address
      }
      nftType
      token
    }
  }
`;
