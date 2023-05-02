import React, { useState } from 'react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import DepositModalHeader from './DepositModalHeader';
import { ModalBody, Modal, IconButton } from '@/common';

interface DepositInProcessModalProps {
  className?: string;
}

export const DepositInProcessModal: React.FC<DepositInProcessModalProps> = ({
  className,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const [status, setStatus] = useState('calculating');
  const [cnt, setCnt] = useState(0);
  setTimeout(() => {
    setCnt((cnt + 1) % 4);
    console.log(cnt);
  }, 1000);

  return (
    <Modal isOpen={isOpen} className={clsx(className)}>
      <DepositModalHeader title="Deposit in process" />
      <ModalBody>
        <div className="p-6 space-y-6 flex flex-col items-center">
          <span className="text-sm text-center">
            Your funds will be available on the DUTCH0x (Loopring L2) after 12
            block confirmations.
          </span>
          <div className="border bg-black/30 rounded-full grid grid-cols-2 gap-0 overflow-hidden w-[100px] h-[100px]">
            {(() => {
              let gridItems = [];
              for (let i = 0; i < 4; i++) {
                gridItems.push(
                  <div
                    key={uuidv4()}
                    className={clsx(
                      'w-full h-full bg-black/30',
                      {
                        '!bg-black': i < 2 && i == cnt,
                      },
                      {
                        '!bg-black': i == 2 && cnt == 3,
                      },
                      {
                        '!bg-black': i == 3 && cnt == 2,
                      }
                    )}
                  ></div>
                );
              }
              return gridItems;
            })()}
          </div>
          <div className="rounded-lg bg-black/10 flex flex-col p-4 items-center">
            <span className="text-base font-bold">
              Estimated time:{' '}
              <span className="first-letter:uppercase">{status}</span>
            </span>
            <div className="flex items-center gap-1">
              <span className="text-sm">Transaction Pending</span>
              <IconButton
                icon="iarrow-up-right"
                className="!w-4 !h-4 border border-black/20 !rounded-md"
                onClick={() => {
                  console.log('clicked');
                }}
              />
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
