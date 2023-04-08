import { TradeNFTI } from '@/types';
import { ethers } from 'ethers';
import moment from 'moment';
import MilkGif from '@/assets/milk.gif';

export enum TransactionTypeEnum {
  PRIMARY = 'Primary sales',
  SECONDARY = 'NFT trades',
  TRANSFER = 'Transfer',
}

export interface AllTransactionsI {
  type: TransactionTypeEnum;
  from: string;
  to: string;
  nftId: {
    src: any;
    groupName: string;
    id: string;
  };
  units: number;
  price: number;
  gas: number;
  date: string;
}

export const getTimestampDaysLater = (
  days: number,
  date: Date = new Date()
) => {
  const ts = Math.round(date.getTime() / 1000) + days * 86400;
  return ts;
};

export const convertNumToHexdecimal = (num: string | number) => {
  return num.toString(16);
};

const formatTransactionRangeDate = (dateStr: string) => {
  const date = moment(dateStr);

  // format the moment object using the desired format string
  const formattedDate = date.format('MMM D, YYYY');
  return formattedDate;
};

export const getAllTransactionDuration = (
  allTransactions: AllTransactionsI[]
) => {
  if (allTransactions.length === 1) {
    return formatTransactionRangeDate(allTransactions[0].date);
  } else if (allTransactions.length > 1) {
    return `${formatTransactionRangeDate(
      String(allTransactions.at(1)?.date)
    )} - ${formatTransactionRangeDate(String(allTransactions.at(-1)?.date))}`;
  } else return 'Mar 1, 2022 - Feb 28 2023';
};

export const truncateText = (
  text: string,
  startChars: number,
  endChars?: number
) => {
  const { length } = text;

  if (!startChars || length <= startChars || (endChars && length <= endChars))
    return text;
  else if (startChars && !endChars)
    return `${text.substring(0, startChars)}...`;
  else if (startChars && endChars) {
    return `${text.substring(0, startChars)}...${text.substring(endChars)}`;
  }
};

export const shortenAddress = (text: string) => {
  return truncateText(text, 6, 38) || '';
};

export const getTradeType = (tradeNFT: TradeNFTI, account: string) => {
  if (tradeNFT.nfts[0].minter.address === account.toLowerCase()) {
    return TransactionTypeEnum.PRIMARY;
  } else return TransactionTypeEnum.SECONDARY;
};

export const getTradeNftsUtils = (tradeNFTs: TradeNFTI[], account: string) => {
  const ethTradeNFTs = tradeNFTs.filter(
    (tradeNFT) => tradeNFT.token.symbol === 'ETH'
  );

  const lrcTradeNFTs = tradeNFTs.filter(
    (tradeNFT) => tradeNFT.token.symbol === 'LRC'
  );

  const totalTurnoverETH = ethTradeNFTs.reduce((accumulator, object) => {
    return (
      accumulator +
      Number(
        ethers.utils.formatUnits(object.realizedNFTPrice, object.token.decimals)
      )
    );
  }, 0);

  const totalRoyatliesETH = ethTradeNFTs.reduce((accumulator, object) => {
    const x = (totalTurnoverETH * object.nfts[0].creatorFeeBips) / 100;
    return accumulator + x;
  }, 0);

  const totalTurnoverLRC = lrcTradeNFTs.reduce((accumulator, object) => {
    return (
      accumulator +
      Number(
        ethers.utils.formatUnits(object.realizedNFTPrice, object.token.decimals)
      )
    );
  }, 0);

  const totalRoyatliesLRC = lrcTradeNFTs.reduce((accumulator, object) => {
    const x = (totalTurnoverLRC * object.nfts[0].creatorFeeBips) / 100;
    return accumulator + x;
  }, 0);

  const primarySales = tradeNFTs.filter(
    (tradeNFT) => tradeNFT.nfts[0].minter.address === account.toLowerCase()
  );

  const secondaryTrade = tradeNFTs.filter(
    (tradeNFT) => tradeNFT.nfts[0].minter.address !== account.toLowerCase()
  );

  const allTransactions = tradeNFTs.map((tradeNFT) => {
    const price = Number(
      ethers.utils.formatUnits(
        tradeNFT.realizedNFTPrice,
        tradeNFT.token.decimals
      )
    );
    const gas =
      Number(tradeNFT.block.gasLimit) * Number(tradeNFT.block.gasPrice);

    const date = moment.unix(Number(tradeNFT.block.timestamp));
    const formattedDate = date.format('MMM DD, YYYY hh:mm:ss');

    return {
      type: getTradeType(tradeNFT, account),
      from: shortenAddress(tradeNFT.accountSeller.address),
      to: shortenAddress(tradeNFT.accountBuyer.address),
      nftId: {
        src: MilkGif,
        groupName: '',
        id: tradeNFT.nfts[0].nftID,
      },
      units: tradeNFT.fFillSB,
      date: formattedDate,
      price,
      gas,
    };
  });

  return {
    totalTurnoverETH,
    totalRoyatliesETH,
    totalTurnoverLRC,
    totalRoyatliesLRC,
    primarySales,
    secondaryTrade,
    allTransactions,
  };
};

export const TOKEN_INFO = {
  tokenMap: {
    ETH: {
      type: 'ETH',
      tokenId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      precision: 7,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: '5000000000000000',
        maximum: '1000000000000000000000',
        dust: '200000000000000',
      },
      luckyTokenAmounts: {
        minimum: '50000000000000',
        maximum: '1000000000000000000000',
        dust: '50000000000000',
      },
      fastWithdrawLimit: '100000000000000000000',
      gasAmounts: {
        distribution: '85000',
        deposit: '100000',
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ['LRC', 'USDT', 'USDC'],
    },
    LRC: {
      type: 'erc20Trade',
      tokenId: 1,
      symbol: 'LRC',
      name: 'Loopring',
      address: '0xfc28028d9b1f6966fe74710653232972f50673be',
      decimals: 18,
      precision: 3,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: '5000000000000000000',
        maximum: '5000000000000000000000000',
        dust: '5000000000000000000',
      },
      luckyTokenAmounts: {
        minimum: '50000000000000000',
        maximum: '5000000000000000000000000',
        dust: '50000000000000000',
      },
      fastWithdrawLimit: '750000000000000000000000',
      gasAmounts: {
        distribution: '101827',
        deposit: '200000',
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ['ETH'],
    },
    USDT: {
      type: 'erc20Trade',
      tokenId: 2,
      symbol: 'USDT',
      name: 'USDT',
      address: '0xd4e71c4bb48850f5971ce40aa428b09f242d3e8a',
      decimals: 6,
      precision: 2,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: '5000000',
        maximum: '2000000000000',
        dust: '250000',
      },
      luckyTokenAmounts: {
        minimum: '50000',
        maximum: '200000000000',
        dust: '50000',
      },
      fastWithdrawLimit: '250000000000',
      gasAmounts: {
        distribution: '106233',
        deposit: '200000',
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ['ETH', 'DAI'],
    },
    'LP-LRC-ETH': {
      type: 'erc20Trade',
      tokenId: 4,
      symbol: 'LP-LRC-ETH',
      name: 'AMM-LRC-ETH',
      address: '0xfeb069407df0e1e4b365c10992f1bc16c078e34b',
      decimals: 8,
      precision: 6,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: '100000000',
        maximum: '10000000000000000000',
        dust: '100000000',
      },
      luckyTokenAmounts: {
        minimum: '100000000',
        maximum: '10000000000000000000',
        dust: '100000000',
      },
      fastWithdrawLimit: '20000000000',
      gasAmounts: {
        distribution: '150000',
        deposit: '200000',
      },
      enabled: true,
      isLpToken: true,
    },
    'LP-ETH-USDT': {
      type: 'erc20Trade',
      tokenId: 7,
      symbol: 'LP-ETH-USDT',
      name: 'LP-ETH-USDT',
      address: '0x049a02fa9bc6bd54a2937e67d174cc69a9194f8e',
      decimals: 8,
      precision: 6,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: '100000000',
        maximum: '10000000000000',
        dust: '100000000',
      },
      luckyTokenAmounts: {
        minimum: '100000000',
        maximum: '10000000000000',
        dust: '100000000',
      },
      fastWithdrawLimit: '20000000000',
      gasAmounts: {
        distribution: '150000',
        deposit: '200000',
      },
      enabled: true,
      isLpToken: true,
    },
    DAI: {
      type: 'erc20Trade',
      tokenId: 6,
      symbol: 'DAI',
      name: 'dai',
      address: '0xcd2c81b322a5b530b5fa3432e57da6803b0317f7',
      decimals: 18,
      precision: 6,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: '10000000000000000000',
        maximum: '100000000000000000000000',
        dust: '10000000000000000',
      },
      luckyTokenAmounts: {
        minimum: '10000000000000000000',
        maximum: '100000000000000000000000',
        dust: '10000000000000000000',
      },
      fastWithdrawLimit: '10000000000000000000000',
      gasAmounts: {
        distribution: '150000',
        deposit: '200000',
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ['USDT'],
    },
    USDC: {
      type: 'USDC',
      tokenId: 8,
      symbol: 'USDC',
      name: 'USDC',
      address: '0x47525e6a5def04c9a56706e93f54cc70c2e8f165',
      decimals: 6,
      precision: 6,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: '1000',
        maximum: '10000000000000000000',
        dust: '100',
      },
      luckyTokenAmounts: {
        minimum: '1000000',
        maximum: '10000000000',
        dust: '1000000',
      },
      fastWithdrawLimit: '20000000000000000000',
      gasAmounts: {
        distribution: '150000',
        deposit: '200000',
      },
      enabled: true,
      isLpToken: false,
      tradePairs: ['ETH'],
    },
    'LP-USDC-ETH': {
      type: 'LP-USDC-ETH',
      tokenId: 9,
      symbol: 'LP-USDC-ETH',
      name: 'LP-USDC-ETH',
      address: '0xf37cf4ced77b985708d591acc6bfd08586ab3409',
      decimals: 8,
      precision: 7,
      precisionForOrder: 3,
      orderAmounts: {
        minimum: '100000',
        maximum: '1000000000000000000000000000000000000000',
        dust: '10000',
      },
      luckyTokenAmounts: {
        minimum: '1000000000000000',
        maximum: '10000000000000000000',
        dust: '1000000000000000',
      },
      fastWithdrawLimit: '20000000000000000000',
      gasAmounts: {
        distribution: '150000',
        deposit: '200000',
      },
      enabled: true,
      isLpToken: true,
    },
  },
  idIndex: {
    '0': 'ETH',
    '1': 'LRC',
    '2': 'USDT',
    '4': 'LP-LRC-ETH',
    '6': 'DAI',
    '7': 'LP-ETH-USDT',
    '8': 'USDC',
    '9': 'LP-USDC-ETH',
  },
  marketMap: {
    'LRC-ETH': {
      baseTokenId: 1,
      enabled: true,
      market: 'LRC-ETH',
      orderbookAggLevels: 5,
      precisionForPrice: 6,
      quoteTokenId: 0,
      status: 3,
      isSwapEnabled: true,
      createdAt: 1617967800000,
    },
    'ETH-USDT': {
      baseTokenId: 0,
      enabled: true,
      market: 'ETH-USDT',
      orderbookAggLevels: 3,
      precisionForPrice: 3,
      quoteTokenId: 2,
      status: 3,
      isSwapEnabled: true,
      createdAt: 1617972300000,
    },
    'DAI-USDT': {
      baseTokenId: 6,
      enabled: true,
      market: 'DAI-USDT',
      orderbookAggLevels: 2,
      precisionForPrice: 4,
      quoteTokenId: 2,
      status: 3,
      isSwapEnabled: true,
      createdAt: 0,
    },
    'USDC-ETH': {
      baseTokenId: 8,
      enabled: true,
      market: 'USDC-ETH',
      orderbookAggLevels: 3,
      precisionForPrice: 3,
      quoteTokenId: 0,
      status: 3,
      isSwapEnabled: true,
      createdAt: 1636974420000,
    },
  },
};
