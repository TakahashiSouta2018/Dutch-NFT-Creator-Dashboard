import { Table, THead, TBody, TR, TD } from '@/common';
import { CreateNftManagementI, NFTI } from '@/types';
import { IconButton } from '@/common';

import * as DutchC from '../../../shared/nft-management/styles';
import * as Icons from '@/common';
import Image from 'next/image';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { getIpfsHttpUrl } from '@/lib/pinata';

interface TableProps {
  nftList: CreateNftManagementI[];
  onClick: (nftId: string) => void;
}

const NFTManagementTable: React.FC<TableProps> = ({
  nftList,
  onClick,
}): JSX.Element => {

  const { selectedNFTs } = useAppSelector((state) => {
    const { selectedNFTs } = state.dashboardPageReducer;
    return { selectedNFTs };
  }, shallowEqual);

  const isSelected = (nftId: string) => {
    return selectedNFTs.filter(selectedNFT => selectedNFT.nftId === nftId).length > 0;
  }

  return (
    <Table>
      <THead>
        <TR>
          <TD>
            <DutchC.IconRound />
          </TD>
          <TD>Name</TD>
          <TD>Collection</TD>
          <TD>Available/Mint count</TD>
          <TD>NFT id</TD>
        </TR>
      </THead>
      <TBody>
        {nftList.map((list, index) => {
          return (
            <TR
              key={index}
              onClick={() => {
                onClick(list.nftId);
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
                  <DutchC.IconRound />
                )}
              </TD>
              <TD>
                <div className="flex gap-2 items-center">
                  {list.image && (
                    <Image src={getIpfsHttpUrl(list.image)} alt="img" width={30} height={30} />
                  )}
                  {list.name}
                </div>
              </TD>
              <TD>{list.collectionName}</TD>
              <TD>{`${0}/${list.amount}`}</TD>
              <TD>
                <DutchC.FlexRowBetween>
                  <DutchC.NFTIdWrapper>
                    <IconButton icon="document" />
                    <DutchC.TextEllipsis>{list.nftId}</DutchC.TextEllipsis>
                  </DutchC.NFTIdWrapper>
                  <IconButton icon="ellipsis-horizontal" />
                </DutchC.FlexRowBetween>
              </TD>
            </TR>
          );
        })}
      </TBody>
    </Table>
  );
};

export default NFTManagementTable;
