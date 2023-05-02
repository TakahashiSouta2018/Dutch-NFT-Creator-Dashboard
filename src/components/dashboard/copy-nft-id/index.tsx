import React, { useState } from 'react';
import { useTheme } from 'next-themes';

import * as Icons from '@/common/Icons';

import * as DutchC from './styles';

type CopyNFTIdProps = {
  id: string;
  type?: 'long' | 'short';
  onClick?: () => void;
  text?: string;
};

const CopyNFTId: React.FC<CopyNFTIdProps> = ({
  type = 'short',
  id,
  onClick,
  text = 'NFT id',
}) => {
  const { theme } = useTheme();
  const [status, setStatus] = useState<'default' | 'active' | 'copied'>(
    'default'
  );
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  return (
    <DutchC.CopyNFTId
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
        <DutchC.CopyNFTIdTooltip>Copied</DutchC.CopyNFTIdTooltip>
      )}
      <DutchC.CopyNFTIdIconWrapper>
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
      </DutchC.CopyNFTIdIconWrapper>
      <DutchC.CopyNFTIdText
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
      </DutchC.CopyNFTIdText>
    </DutchC.CopyNFTId>
  );
};

export default CopyNFTId;
