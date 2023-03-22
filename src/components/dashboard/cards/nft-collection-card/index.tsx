import Image from 'next/image';
import { useTheme } from 'next-themes';

import * as DutchC from './styles';

interface NFTCollectionCardProps {
  id: string;
  name: string;
  img: string;
  amount: number;
  onClick?: () => void;
}

const NFTCollectionCard: React.FC<NFTCollectionCardProps> = ({
  id,
  name,
  img,
  amount = 0,
  onClick,
}) => {
  const { theme } = useTheme();

  return (
    <DutchC.NFTCollectionCard onClick={onClick}>
      <Image
        src={img}
        alt={img}
        width={230}
        height={230}
        className="aspect-square w-full"
      />
      <DutchC.NFTFooter>
        <DutchC.NFTDetail>
          {/* <DutchC.NFTTitleWrapper> */}
          <DutchC.NFTTitle>{name}</DutchC.NFTTitle>
          {/* </DutchC.NFTTitleWrapper> */}
          <DutchC.NFTDescription>{amount} items</DutchC.NFTDescription>
        </DutchC.NFTDetail>
      </DutchC.NFTFooter>
    </DutchC.NFTCollectionCard>
  );
};

export default NFTCollectionCard;
