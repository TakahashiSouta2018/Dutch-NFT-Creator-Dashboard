import React, { useState } from 'react';
import clsx from 'clsx';
import QRCode from 'react-qr-code';

import DepositModalHeader from './DepositModalHeader';
import { ModalBody, Modal } from '@/common';
import CopyNFTId from '@/components/dashboard/copy-nft-id';

interface DepositFromFriendModalProps {
  className?: string;
}

export const DepositFromFriendModal: React.FC<DepositFromFriendModalProps> = ({
  className,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal isOpen={isOpen} className={clsx(className)}>
      <DepositModalHeader title="Deposit from a friend" />
      <ModalBody>
        <div className="p-6 space-y-6 flex flex-col items-center">
          <span className="text-sm text-center">
            Ask your friend to send in this L2 wallet from their L2 wallet.{' '}
          </span>
          <div className="p-2.5">
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={'as;dfj;adsf'}
              viewBox={`0 0 256 256`}
            />
          </div>
          <div className="rounded-lg bg-black/10 flex flex-col p-4">
            <div className="flex gap-1 items-center">
              <span className="text-sm">Your wallet address</span>
              <CopyNFTId
                id="OxDD8d98CD31A87f028eaCce96584bAD18A01be340"
                type="short"
                text="Click to copy"
              />
            </div>
            <span className="text-base font-bold">
              OxDD8d98CD31A87f028eaCce96584bAD18A01be340
            </span>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
