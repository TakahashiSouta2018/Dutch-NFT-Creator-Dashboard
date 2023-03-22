import Image from 'next/image';
import { useTheme } from 'next-themes';

import * as Icons from '@/common/Icons';
import CopyNFTId from '../../copy-nft-id';
import ShortcutContextMenu from '../../../shared/shortcut-context-menu';

import * as DutchC from './styles';

interface NFTCardProps {
  id: string;
  type: 'collections' | 'archives' | 'bank0x';
  title: string;
  image: string;
  unit: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({
  id,
  type,
  title,
  image,
  unit,
  description,
  selected = false,
  onSelect,
}) => {
  const { theme } = useTheme();
  const ShortcutContextMenuItems = [
    ['Find Holders', 'Show Sales', 'Move to Archives'],
    ['Recover', 'Remove from DUTCH0x'],
  ];

  return (
    <DutchC.NFTCard selected={selected} onClick={onSelect}>
      <DutchC.NFTUnitBadge theme={theme}>
        <Icons.IEye
          color={theme === 'light' ? 'black' : 'white'}
          size="large"
        ></Icons.IEye>
        {unit}
      </DutchC.NFTUnitBadge>
      <DutchC.NFTSelectedMark>
        {selected && (
          <Icons.ICheckCircle
            color={theme === 'light' ? 'black' : 'white'}
            size="large"
          />
        )}
      </DutchC.NFTSelectedMark>
      <Image
        src={image}
        alt={image}
        width={230}
        height={230}
        className="aspect-square w-full"
      />
      <DutchC.NFTFooter>
        <DutchC.NFTDetail>
          <DutchC.NFTTitleWrapper>
            <DutchC.NFTTitle>{title}</DutchC.NFTTitle>
            {type === 'bank0x' && (
              <Icons.ICheckBadge variant="solid" color="orange" size="medium" />
            )}
          </DutchC.NFTTitleWrapper>
          <DutchC.NFTDescription>{description}</DutchC.NFTDescription>
          <CopyNFTId id={id} type="short" />
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
