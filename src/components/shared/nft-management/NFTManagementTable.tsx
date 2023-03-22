import { Table, THead, TBody, TR, TD } from '@/common';
import { NFTListType } from '@/types';
import { IconButton } from '@/common';

import * as DutchC from './styles';
import * as Icons from '@/common';
import Image from 'next/image';

interface TableProps {
  nftList: NFTListType[];
  onClick: (nftId: string) => void;
}

const NFTManagementTable: React.FC<TableProps> = ({
  nftList,
  onClick,
}): JSX.Element => {
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
        {nftList.map((list) => {
          return (
            <TR
              key={list.sr}
              onClick={() => {
                onClick(list.nftId);
              }}
              className="cursor-pointer"
              style={
                list.selected
                  ? {
                      border: '2px solid rgba(0, 0, 0, 0.3)',
                      boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.3)',
                    }
                  : {}
              }
            >
              <TD>
                {list.selected ? (
                  <Icons.ICheckCircle color="black" size="large" />
                ) : (
                  <DutchC.IconRound />
                )}
              </TD>
              <TD>
                <div className="flex gap-2 items-center">
                  {list.img && (
                    <Image src={list.img} alt="img" width={30} height={30} />
                  )}
                  {list.name}
                </div>
              </TD>
              <TD>{list.collection}</TD>
              <TD>{`${list.availableCount}/${list.mintCount}`}</TD>
              <TD>
                <DutchC.FlexRowBetween>
                  <DutchC.NFTIdWrapper>
                    <IconButton icon="document" />
                    <DutchC.TextEllipsis>{list.nftId}</DutchC.TextEllipsis>
                  </DutchC.NFTIdWrapper>
                  <IconButton icon="ellipsishorizontal" />
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
