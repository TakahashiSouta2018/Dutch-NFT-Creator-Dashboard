import { Table, THead, TBody, TR, TD } from '@/common';
import { CreateNftManagementI, NFTI } from '@/types';
import { IconButton } from '@/common';

import * as Icons from '@/common';
import Image from 'next/image';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { getIpfsHttpUrl } from '@/lib/pinata';
import { DashboardPageReducerI } from '@/components/dashboard/ducks';

interface NFTAllByTableProps {
  NFTs: CreateNftManagementI[];
  onNFTSelect: (nftId: string) => void;
}

const NFTAllByTable: React.FC<NFTAllByTableProps> = ({
  NFTs,
  onNFTSelect,
}): JSX.Element => {
  const { selectedNFTs } = useAppSelector((state) => {
    const { selectedNFTs } =
      state.dashboardPageReducer as DashboardPageReducerI;
    return { selectedNFTs };
  }, shallowEqual);

  const isSelected = (nftId: string) => {
    console.log({ selectedNFTs });

    return (
      selectedNFTs.filter((selectedNFT) => selectedNFT.nftID === nftId).length >
      0
    );
  };

  return (
    <Table>
      <THead>
        <TR>
          <TD>
            <div className="mx-auto border rounded-full w-4 h-4 border-black/70 dark:border-white" />
          </TD>
          <TD>Name</TD>
          <TD>Collection</TD>
          <TD>Available/Mint count</TD>
          <TD>NFT id</TD>
        </TR>
      </THead>
      <TBody>
        {NFTs.map((list, index) => {
          console.log({ list });

          return (
            <TR
              key={index}
              onClick={() => {
                onNFTSelect(list.nftId);
              }}
              className="cursor-pointer"
              style={
                isSelected(list.nftId)
                  ? {
                      border: '2px solid rgba(0, 0, 0, 0.3)',
                      boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.3)',
                    }
                  : {}
              }
            >
              <TD>
                {isSelected(list.nftId) ? (
                  <Icons.ICheckCircle color="black" size="large" />
                ) : (
                  <div className="mx-auto border rounded-full w-4 h-4 border-black/70 dark:border-white" />
                )}
              </TD>
              <TD>
                <div className="flex gap-2 items-center">
                  {list.image && (
                    <Image
                      src={getIpfsHttpUrl(list.image)}
                      alt="img"
                      width={30}
                      height={30}
                    />
                  )}
                  {list.name}
                </div>
              </TD>
              <TD>{list.collectionName}</TD>
              <TD>{`${list.available}/${list.amount}`}</TD>
              <TD>
                <div className="flex justify-between">
                  <div className="flex items-center gap-1 px-2 border border-black/10 rounded-md">
                    <IconButton icon="document" />
                    <div className="w-[10vw] whitespace-nowrap  overflow-hidden overflow-ellipsis font-normal text-sm text-black/70">
                      {list.nftId}
                    </div>
                  </div>
                  <IconButton icon="ellipsis-horizontal" />
                </div>
              </TD>
            </TR>
          );
        })}
      </TBody>
    </Table>
  );
};

export default NFTAllByTable;
