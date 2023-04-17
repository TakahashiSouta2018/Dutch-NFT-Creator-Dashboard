import Image from 'next/image';
import { useTheme } from 'next-themes';

import * as Icons from '@/common/Icons';
import CopyNFTId from '../../copy-nft-id';
import {
  ShortcutContextMenu,
  ShortcutContextMenuItem,
} from '../../../shared/shortcut-context-menu';
import { CreateNftManagementI, NFTI } from '@/types';
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
      selectedNFTs.filter((selectedNFT: NFTI) => selectedNFT.nftId === nftId)
        .length > 0
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
      <div className="absolute top-4 left-4 flex items-center justify-center w-5 h-5 rounded-full">
        {isSelected(nftId) ? (
          <Icons.ICheckCircle
            color={theme === 'light' ? 'black' : 'white'}
            size="large"
          />
        ) : (
          <DutchC.NFTSelectedMark />
        )}
      </div>

      {image && (
        <Image
          src={image}
          alt={image}
          width={230}
          height={230}
          className="aspect-square"
          onLoad={() => {
            console.log(true);
          }}
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
          <ShortcutContextMenu position="TR">
            {(type === 'bank0x' && (
              <>
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
              </>
            )) || (
              <>
                <ShortcutContextMenuItem
                  text="Recover"
                  onClick={() => {
                    console.log('234567890');
                  }}
                />
                <ShortcutContextMenuItem
                  text="Remove from DUTCH0x"
                  onClick={() => {
                    console.log('234567890');
                  }}
                />
              </>
            )}
          </ShortcutContextMenu>
        )}
      </DutchC.NFTFooter>
    </DutchC.NFTCard>
  );
};

export default NFTCard;
