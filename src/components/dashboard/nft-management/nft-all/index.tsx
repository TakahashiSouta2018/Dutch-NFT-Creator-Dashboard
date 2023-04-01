import React, { useState, useCallback, useEffect } from 'react';
import { CreateNftManagementI, UsageStatusEnum } from '@/types';
import NFTAllByCard from './NFTAllByCard';
import NFTAllByTable from './NFTALLByTable';
import useNFTManagement from '@/hooks/useNFTManagement';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';

interface NFTAllProps {
  tableListSwtich: number;
}

const NFTAll: React.FC<NFTAllProps> = ({ tableListSwtich }): JSX.Element => {
  const { getUserNfts } = useNFTManagement();
  const [NFTs, setNFTs] = useState<CreateNftManagementI[]>([]);

  const { accountInfo } = useAppSelector((state) => {
    const { accountInfo } = state.webAppReducer;
    return { accountInfo };
  }, shallowEqual);

  useEffect(() => {
    (async () => {
      if (accountInfo) {
        const nfts = await getUserNfts(
          accountInfo.accInfo.owner,
          UsageStatusEnum.UNARCHIVED
        );
        console.log({ nfts });

        if (nfts) {
          setNFTs(nfts);
        }
      }
    })();
  }, [accountInfo?.accInfo.owner]);

  const onNFTSelect = useCallback(
    (nftId: string) => {
      const index = NFTs.findIndex((nft) => nft.nftId === nftId);
      const nft = NFTs.find((nft) => nft.nftId === nftId);
      if (nft) {
        setNFTs([
          ...NFTs.slice(0, index),
          {
            ...nft,
          },
          ...NFTs.slice(index + 1),
        ]);
      }
    },
    [NFTs]
  );

  if (tableListSwtich)
    return <NFTAllByTable NFTs={NFTs} onNFTSelect={onNFTSelect} />;
  else return <NFTAllByCard NFTs={NFTs} onNFTSelect={onNFTSelect} />;
};

export default NFTAll;
