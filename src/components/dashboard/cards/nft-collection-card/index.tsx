import Image from 'next/image';
import { useTheme } from 'next-themes';

import * as DutchC from './styles';

interface NFTCollectionCardProps {
  id: string;
  title: string;
  image: string;
  amount: number;
  onClick?: () => void;
}

const NFTCollectionCard: React.FC<NFTCollectionCardProps> = ({
  id,
  title,
  image,
  amount = 0,
  onClick,
}) => {
  const { theme } = useTheme();

  return (
    <DutchC.NFTCollectionCard onClick={onClick}>
      <Image
        src={image}
        alt={image}
        width={230}
        height={230}
        className="aspect-square w-full"
      />
      <DutchC.NFTFooter>
        <DutchC.NFTDetail>
          {/* <DutchC.NFTTitleWrapper> */}
          <DutchC.NFTTitle>{title}</DutchC.NFTTitle>
          {/* </DutchC.NFTTitleWrapper> */}
          <DutchC.NFTDescription>{amount} items</DutchC.NFTDescription>
        </DutchC.NFTDetail>
      </DutchC.NFTFooter>
    </DutchC.NFTCollectionCard>
  );
};

export default NFTCollectionCard;
