import * as DutchC from './styles';
import Image from 'next/image';

interface MultiCardProps {
  imageUrls: string[];
}

const NFTMutiCard: React.FC<MultiCardProps> = ({ imageUrls }) => {
  return (
    <DutchC.MultiUploadInner>
      {imageUrls
        .slice(0, Math.min(imageUrls.length, 4) - 1)
        .map((url, index) => (
          <Image
            key={index}
            alt=""
            src={url}
            width={140}
            height={140}
            className="aspect-square border border-black/10 rounded dark:border-white/10"
          />
        ))}
      {/* additional image */}
      <DutchC.MultiUploadLastMediaWrapper>
        <Image
          alt=""
          src={imageUrls[imageUrls.length - 1]}
          width={140}
          height={140}
          className="aspect-square border border-black/10 rounded dark:border-white/10"
        />
        {/* backdrop */}
        {imageUrls.length > 4 && (
          <DutchC.MultiUploadLastMediaInner>
            +{imageUrls.length - 4}
          </DutchC.MultiUploadLastMediaInner>
        )}
      </DutchC.MultiUploadLastMediaWrapper>
    </DutchC.MultiUploadInner>
  );
};

export default NFTMutiCard;
