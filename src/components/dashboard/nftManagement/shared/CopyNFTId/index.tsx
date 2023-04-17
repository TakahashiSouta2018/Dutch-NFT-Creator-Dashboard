import React, { useState } from 'react';
import { useTheme } from 'next-themes';

import * as Icons from '@/common/Icons';

type CopyNFTIdProps = {
  id: string;
  type?: 'long' | 'short';
  onClick?: () => void;
};

const CopyNFTId: React.FC<CopyNFTIdProps> = ({
  type = 'short',
  id,
  onClick,
}) => {
  const { theme } = useTheme();
  const [status, setStatus] = useState<'default' | 'active' | 'copied'>(
    'default'
  );
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  return (
    <div
      className="reltive group rounded-md inline-flex items-center justify-center gap-x-1 px-2.5 py-0.5 w-fit h-fit max-w-full border border-black/10 backdrop-blur hover:bg-black/10 active:bg-black dark:border-white/10 dark:hover:bg-white/10 dark:active:bg-white/50"
      onClick={(e) => {
        e.stopPropagation();
        return onClick;
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        clearTimeout(timer);
        setStatus('active');
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        if (type === 'long') {
          setStatus('default');
          return;
        }
        setStatus('copied');
        clearTimeout(timer);
        setTimer(
          setTimeout(() => {
            setStatus('default');
          }, 1000)
        );
      }}
    >
      {status === 'copied' && (
        <div className="absolute top-[-30px] bg-black/70 rounded-md backdrop-blur px-3 py-1 text-xs text-white dark:bg-white/30">
          Copied
        </div>
      )}
      <div className="opacity-50 flex items-center justify-center group-hover:opacity-100">
        <Icons.IDocumentDuplicateIcon
          size="medium"
          color={
            theme === 'light'
              ? status === 'default'
                ? 'black'
                : status === 'active'
                ? 'white'
                : 'black'
              : 'white'
          }
        />
      </div>
      <div
        className="text-xs truncate max-w-[170px]"
        color={
          theme === 'light'
            ? status === 'default'
              ? 'black'
              : status === 'active'
              ? 'white'
              : 'black'
            : 'white'
        }
      >
        {type === 'long' ? id : 'NFT id'}
      </div>
    </div>
  );
};

export default CopyNFTId;
