import Image from 'next/image';
import { useTheme } from 'next-themes';

import * as DutchC from './styles';
import { UserListI } from '@/types';
import { getIpfsHttpUrl } from '@/lib/pinata';

interface NFTCollectionCardProps {
  collection: UserListI;
  onClick?: () => void;
}

const NFTCollectionCard: React.FC<NFTCollectionCardProps> = ({
  collection,
  onClick,
}) => {
  const { theme } = useTheme();

  return (
    <DutchC.NFTCollectionCard onClick={onClick} theme={theme}>
      <Image
        src={getIpfsHttpUrl(collection.imageUrls[0])}
        alt={collection.imageUrls[0]}
        width={230}
        height={230}
        className="aspect-square w-60 h-60"
      />
      <DutchC.NFTFooter>
        <DutchC.NFTDetail>
          {/* <DutchC.NFTTitleWrapper> */}
          <DutchC.NFTTitle>{collection.collectionName}</DutchC.NFTTitle>
          {/* </DutchC.NFTTitleWrapper> */}
          <DutchC.NFTDescription>{collection.nfts.length} items</DutchC.NFTDescription>
        </DutchC.NFTDetail>
      </DutchC.NFTFooter>
    </DutchC.NFTCollectionCard>
  );
};

export default NFTCollectionCard;
