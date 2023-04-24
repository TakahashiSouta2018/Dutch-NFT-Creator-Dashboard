import Link from 'next/link';
import Image from 'next/image';
import useNFTHook from '@/hooks/useNFTHook';
import { getIpfsHttpUrl } from '@/lib/pinata';
import { useAppDispatch } from '@/redux/store';
import { DraftNFTResponseI } from '@/types';
import { useTheme } from 'next-themes';
import { toast } from 'react-toastify';
import * as Icons from '@/common/Icons';
import { setDraftNFTs } from '@/components/create/ducks';

type DraftNFTProps = DraftNFTResponseI & {
  onSelect: () => void;
};

const DraftNFTCard: React.FC<DraftNFTProps> = ({
  id,
  name,
  media,
  amount,
  description,
  selected,
  collection,
  onSelect,
}) => {
  const dispatch = useAppDispatch();

  const { theme } = useTheme();
  const { deleteDraftNFT, getCollectionDraftNFT } = useNFTHook();

  const mediaUrl = getIpfsHttpUrl(media);

  const handleDeleteNft = async (id: number) => {
    const isDeleted = await deleteDraftNFT(id);

    if (isDeleted) {
      toast('Draft deleted successfully', { type: 'error' });
    } else {
      toast('Error occured saving nft', { type: 'error' });
    }

    const nft = await getCollectionDraftNFT(collection);
    if (nft) {
      dispatch(setDraftNFTs(nft));
    }
  };

  return (
    <div
      className={`
        relative flex flex-col bg-white border border-black/10 rounded dark:bg-dark-surface dark:border-white/10 cursor-pointer transition
      `}
      style={{
        borderColor: `${selected ? 'var(--border-color) !important' : ''}`,
      }}
      onClick={onSelect}
    >
      {/* unit */}
      <div className="absolute top-4 right-0 flex items-center justify-center text-xs font-medium text-white h-5.5 px-1 bg-black/50 rounded-l backdrop-blur dark:bg-white/50 dark:text-dark-surface">
        {amount}
      </div>
      {/* selected mark */}
      {selected && (
        <div className="absolute top-4 left-4 flex items-center justify-center w-5 h-5 rounded-full">
          <Icons.ICheckCircle
            color={theme === 'light' ? 'black' : 'white'}
            size="large"
          />
        </div>
      )}
      {/* image */}
      <Image
        src={mediaUrl}
        alt="rice"
        width={230}
        height={230}
        className="aspect-square w-60 h-60"
      />
      {/* detail */}
      <div className="flex flex-col space-y-1 p-4">
        <div className="text-black font-bold truncate max-w-full dark:text-white">
          {name}
        </div>
        <div className="text-sm text-black/50 truncate max-w-full dark:text-white/50">
          {description}
        </div>
      </div>
      {/* actions */}
      <div className="grid grid-cols-2 divide-x divide-black/10 border-t border-black/10 dark:divide-white/10 dark:border-white/10">
        <div className="inline-flex items-center justify-center h-9 text-sm font-medium text-black cursor-pointer dark:text-white">
          Edit
        </div>
        <div
          className="inline-flex items-center justify-center h-9 text-sm font-medium text-accent-red cursor-pointer dark:text-dark-red"
          onClick={() => handleDeleteNft(id)}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default DraftNFTCard;
