import React, { useState } from 'react';
import clsx from 'clsx';

import DepositModalHeader from './DepositModalHeader';
import { ModalBody, Modal } from '@/common';
import { LRCIconSelector } from '@/components/dashboard/analytics/analytics-tables/lrc-icon-selector';

interface DespositFromWalletModalProps {
  className?: string;
}

export const DespositFromWalletModal: React.FC<
  DespositFromWalletModalProps
> = ({ className }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal isOpen={isOpen} className={clsx(className)}>
      <DepositModalHeader title="Deposit ETH from your wallet" />
      <ModalBody>
        <div className="p-6 space-y-6">
          <div className="p-4 border rounded-lg">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex flex-col">
                <span className="first-letter:uppercase text-sm text-opacity-70">
                  From
                </span>
                <span className="first-letter:uppercase text-base font-bold">
                  Ethereum Network (L1)
                </span>
                <span className="first-letter:uppercase text-sm font-bold">
                  0xDD8d...E340
                </span>
              </div>
              <div className="flex flex-col">
                <span className="first-letter:uppercase text-sm text-opacity-70">
                  to
                </span>
                <span className="first-letter:uppercase text-base font-bold">
                  DUTCH0x (Loopring L2)
                </span>
                <span className="first-letter:uppercase text-sm font-bold">
                  0xDD8d...E340
                </span>
              </div>
              <div className="flex flex-col">
                <span className="first-letter:uppercase text-sm text-opacity-70">
                  Wallet Balance
                </span>
                <div className="flex gap-2">
                  <LRCIconSelector id="eth" />
                  <div className="flex flex-col">
                    <span className="first-letter:uppercase text-base font-bold">
                      0.0672 ETH
                    </span>
                    <span className="text-sm">$110,89</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="first-letter:uppercase text-sm text-opacity-70">
                  Wallet Balance
                </span>
                <div className="flex gap-2">
                  <LRCIconSelector id="eth" />
                  <div className="flex flex-col">
                    <span className="first-letter:uppercase text-base font-bold">
                      0.0804
                    </span>
                    <span className="text-sm">$110.89</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 flex flex-col gap-1">
            <span className="text-sm">Amount (ETH)</span>
            <input
              type="text"
              className="rounded-lg text-sm border px-3 py-2"
              placeholder="Text"
            />
            <span className="text-sm text-opacity-70">$0.00 USD</span>
          </div>
          <div className="text-sm">
            Deposits take 8-12 Ethereum confirmations. This can take as little
            as 3 minutes, but can sometimes take longer depending on Ethereum
            network congestion. Deposits are Ethereum transactions, so you will
            need to pay network (gas) fees. The suggested gas fee will pop up in
            your wallet. Once on Layer 2, there are no more gas fees to
            transact!
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
