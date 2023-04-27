import React, { useState } from 'react';
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

import SkeletonLoader from '@/common/Loader/SkeletonLoader';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const { selectedNFTs } = useAppSelector((state) => {
    const { selectedNFTs } = state.dashboardPageReducer;
    return { selectedNFTs };
  }, shallowEqual);

  // const isSelected = (nftId: string) => {
  //   return (
  //     selectedNFTs.filter((selectedNFT: NFTI) => selectedNFT.nftId === nftId)
  //       .length > 0
  //   );
  // };

  const handleCheck = () => {
    onSelect();
    setIsSelected(!isSelected);
  };

  return (
    <DutchC.NFTCard selected={isSelected} onClick={handleCheck} theme={theme}>
      <SkeletonLoader count={1} width={230} height={230} loading={loading}>
        <div className="relative w-full h-full">
          <DutchC.NFTUnitBadge theme={theme}>
            <Icons.IEye
              color={theme === 'light' ? 'black' : 'white'}
              size="large"
            ></Icons.IEye>
            {`${0}/${1000}`}
          </DutchC.NFTUnitBadge>
          <div className="absolute top-4 left-4 flex items-center justify-center w-5 h-5 rounded-full">
            {isSelected ? (
              <Icons.ICheckCircle
                color={theme === 'light' ? 'black' : 'white'}
                size="large"
              />
            ) : (
              <DutchC.NFTSelectedMark />
            )}
          </div>

          <Image
            src="/images/rice.webp"
            alt={image}
            width={230}
            height={230}
            className="aspect-square"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </SkeletonLoader>

      <SkeletonLoader count={2} width={230} height={20} loading={loading}>
        <DutchC.NFTFooter>
          <DutchC.NFTDetail>
            <DutchC.NFTTitleWrapper>
              <DutchC.NFTTitle>{name}</DutchC.NFTTitle>
            </DutchC.NFTTitleWrapper>
            <DutchC.NFTDescription>{description}</DutchC.NFTDescription>
            <CopyNFTId id={nftId} type="short" />
          </DutchC.NFTDetail>
          {type !== 'collections' && (
            <ShortcutContextMenu position="TR">
              {
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
              }
            </ShortcutContextMenu>
          )}
        </DutchC.NFTFooter>
      </SkeletonLoader>
    </DutchC.NFTCard>
  );
};

export default NFTCard;
