import { Table, THead, TBody, TR, TD } from '@/common';

import {
  ShortcutContextMenu,
  ShortcutContextMenuItem,
} from '@/components/shared/shortcut-context-menu';
import { UserListI } from '@/types';
import NFTMultiCard from '../../cards/nft-multi-card';
import * as DutchC from './styles';

const NFTListTable: React.FC<{
  nftMultiList: UserListI[];
  onShowListModal: () => void;
}> = ({ nftMultiList, onShowListModal }): JSX.Element => {
  return (
    <Table>
      <THead>
        <TR>
          <TD>List Name</TD>
          <TD>Collection</TD>
          <TD>NFTs</TD>
          <TD>Notes</TD>
        </TR>
      </THead>
      <TBody>
        {nftMultiList.map((list, i) => {
          return (
            <TR key={i} className="cursor-pointer" onClick={onShowListModal}>
              <TD>
                <DutchC.NFTListTableName>
                  <div>{list.listName}</div>
                  <div className="flex gap-2">
                    <NFTMultiCard
                      key={i}
                      imageUrls={list.imageUrls}
                      className="grid-cols-4 justify-end !p-0"
                      onShowListModal={onShowListModal}
                    />
                  </div>
                </DutchC.NFTListTableName>
              </TD>
              <TD>{list.collectionName}</TD>
              <TD>{list.imageUrls.length}</TD>
              <TD>
                <div className="flex justify-between items-center">
                  <p>Just remarks.</p>
                  <ShortcutContextMenu position="BR">
                    <ShortcutContextMenuItem
                      text="Find Holders"
                      onClick={() => {
                        console.log('234567890');
                      }}
                    />
                    <ShortcutContextMenuItem
                      text="Show Sales"
                      onClick={() => {
                        console.log('234567890');
                      }}
                    />
                    <ShortcutContextMenuItem
                      text="Move to Achieves"
                      onClick={() => {
                        console.log('234567890');
                      }}
                    />
                  </ShortcutContextMenu>
                </div>
              </TD>
            </TR>
          );
        })}
      </TBody>
    </Table>
  );
};

export default NFTListTable;
