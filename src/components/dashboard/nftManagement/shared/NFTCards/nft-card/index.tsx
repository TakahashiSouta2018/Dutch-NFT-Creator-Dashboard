import Image from 'next/image';
import { useTheme } from 'next-themes';

import * as Icons from '@/common/Icons';

import { CreateNftManagementI } from '@/types';
import * as DutchC from './styles';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import {
  ShortcutContextMenu,
  ShortcutContextMenuItem,
} from '@/components/shared/shortcut-context-menu';
import { DashboardPageReducerI } from '@/components/dashboard/ducks';
import { getIpfsHttpUrl } from '@/lib/pinata';
import CopyNFTId from '../../CopyNFTId';

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
  available,
  description,
  onSelect,
}) => {
  const { theme } = useTheme();

  const { selectedNFTs } = useAppSelector((state) => {
    const { selectedNFTs } =
      state.dashboardPageReducer as DashboardPageReducerI;
    return { selectedNFTs };
  }, shallowEqual);

  const isSelected = (nftId: string) => {
    return (
      selectedNFTs.filter((selectedNFT) => selectedNFT.nftID === nftId).length >
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
        {`${available}/${amount}`}
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
          src={getIpfsHttpUrl(image)}
          alt={image}
          width={230}
          height={230}
          className="aspect-square"
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
