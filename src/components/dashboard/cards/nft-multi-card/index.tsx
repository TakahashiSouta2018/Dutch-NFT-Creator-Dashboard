import * as DutchC from './styles';
import Image from 'next/image';
import ShortcutContextMenu from '@/components/shared/shortcut-context-menu';

interface MultiCardProps {
  name?: string;
  collection?: string;
  imageUrls: string[];
  className: string;
  onShowListModal: () => void;
}

const NFTMultiCard: React.FC<MultiCardProps> = ({
  name,
  collection,
  imageUrls,
  className,
  onShowListModal,
}) => {
  return (
    <DutchC.MultiUploadWrapper onClick={onShowListModal}>
      <DutchC.MultiUploadInner className={className}>
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
      {name && collection && (
        <DutchC.MultiUploadLastMediaContentWrapper>
          <DutchC.MultiUploadLastMediaContentInner>
            <p className="text-md font-bold text-black">{name}</p>
            <div className="text-sm text-black ">
              <div className="">{collection}</div>
            </div>
            <p className="tex-xs font-medium bg-black/10 p-1 rounded-md text-black/50 w-16">
              {imageUrls.length} NFTs
            </p>
          </DutchC.MultiUploadLastMediaContentInner>
          <ShortcutContextMenu
            position="TR"
            options={['Find Holders', 'Show Sales', 'Move to Achieves']}
          />
        </DutchC.MultiUploadLastMediaContentWrapper>
      )}
    </DutchC.MultiUploadWrapper>
  );
};

export default NFTMultiCard;
