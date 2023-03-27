import Image from 'next/image';
import { useTheme } from 'next-themes';

import * as Icons from '@/common/Icons';
import CopyNFTId from '../../copy-nft-id';
import ShortcutContextMenu from '../../../shared/shortcut-context-menu';
import { NFTListType } from '@/types';
import * as DutchC from './styles';

type NFTCardProps = NFTListType & {
  type: 'all' | 'collections' | 'archives' | 'bank0x';
  onSelect: () => void;
};

const NFTCard: React.FC<NFTCardProps> = ({
  nftId,
  type,
  name,
  img,
  mintCount,
  availableCount,
  collection,
  selected = false,
  onSelect,
}) => {
  const { theme } = useTheme();
  const ShortcutContextMenuItems = [
    ['Find Holders', 'Show Sales', 'Move to Archives'],
    ['Recover', 'Remove from DUTCH0x'],
  ];

  return (
    <DutchC.NFTCard selected={selected} onClick={onSelect} theme={theme}>
      <DutchC.NFTUnitBadge theme={theme}>
        <Icons.IEye
          color={theme === 'light' ? 'black' : 'white'}
          size="large"
        ></Icons.IEye>
        {`${availableCount}/${mintCount}`}
      </DutchC.NFTUnitBadge>
      <DutchC.NFTSelectedMark>
        {selected && (
          <Icons.ICheckCircle
            color={theme === 'light' ? 'black' : 'white'}
            size="large"
          />
        )}
      </DutchC.NFTSelectedMark>
      {img && (
        <Image
          src={img}
          alt={img}
          width={230}
          height={230}
          className="aspect-square w-60 h-60"
        />
      )}
      <DutchC.NFTFooter>
        <DutchC.NFTDetail>
          <DutchC.NFTTitleWrapper>
            <DutchC.NFTTitle>{name}</DutchC.NFTTitle>
            {type === 'bank0x' && (
              <Icons.ICheckBadge variant="solid" color="orange" size="medium" />
            )}
          </DutchC.NFTTitleWrapper>
          <DutchC.NFTDescription>{collection}</DutchC.NFTDescription>
          <CopyNFTId id={nftId} type="short" />
        </DutchC.NFTDetail>
        {type !== 'collections' && (
          <ShortcutContextMenu
            position="TR"
            options={
              type === 'bank0x'
                ? ShortcutContextMenuItems[0]
                : ShortcutContextMenuItems[1]
            }
            onSelect={() => {}}
          />
        )}
      </DutchC.NFTFooter>
    </DutchC.NFTCard>
  );
};

export default NFTCard;
