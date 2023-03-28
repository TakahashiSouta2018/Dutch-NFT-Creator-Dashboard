import Image from 'next/image';
import { useTheme } from 'next-themes';

import * as Icons from '@/common/Icons';
import CopyNFTId from '../../copy-nft-id';
import ShortcutContextMenu from '../../../shared/shortcut-context-menu';
import { CreateNftManagementI } from '@/types';
import * as DutchC from './styles';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { getIpfsHttpUrl } from '@/lib/pinata';

interface NFTCardProps extends CreateNftManagementI {
  type: 'all' | 'collections' | 'archives' | 'bank0x';
  onSelect: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({
  nftId,
  type,
  image,
  name,
  amount,
  description,
  onSelect,
}) => {
  const { theme } = useTheme();

  const { selectedNFTs } = useAppSelector((state) => {
    const { selectedNFTs } = state.dashboardPageReducer;
    return { selectedNFTs };
  }, shallowEqual);

  const isSelected = (nftId: string) => {
    return (
      selectedNFTs.filter((selectedNFT) => selectedNFT.nftId === nftId).length >
      0
    );
  };

  const ShortcutContextMenuItems = [
    ['Find Holders', 'Show Sales', 'Move to Archives'],
    ['Recover', 'Remove from DUTCH0x'],
  ];

  return (
    <DutchC.NFTCard
      selected={isSelected(nftId)}
      onClick={onSelect}
      theme={theme}
    >
      <DutchC.NFTUnitBadge theme={theme}>
        <Icons.IEye
          color={theme === 'light' ? 'black' : 'white'}
          size="large"
        ></Icons.IEye>
        {`${0}/${amount}`}
      </DutchC.NFTUnitBadge>
      <DutchC.NFTSelectedMark>
        {isSelected(nftId) && (
          <Icons.ICheckCircle
            color={theme === 'light' ? 'black' : 'white'}
            size="large"
          />
        )}
      </DutchC.NFTSelectedMark>
      {image && (
        <Image
          src={getIpfsHttpUrl(image)}
          alt={image}
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
          <DutchC.NFTDescription>{description}</DutchC.NFTDescription>
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
