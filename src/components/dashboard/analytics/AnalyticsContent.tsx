import React, { useState } from 'react';
import { Accordion } from '@/common/Accordion';
import Image from 'next/image';
import { Button, OutlineButton, SearchInput } from '@/common';
import AvatarIcon from '@/assets/avatar.png';
import { ICheckCircle } from '@/common';

const AnalyticsContent = () => {
  const [track, setTrack] = useState(0);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4 w-[265px]">
        <div className="flex gap-4">
          <p className="text-2xl font-bold">Analytics</p>
          <div className="border rounded-lg border-black/10 w-full">
            <Accordion>NFT Tracking</Accordion>
          </div>
        </div>
        <div className="border rounded-lg border-black/10 w-full divide-y pb-2">
          <div className="py-2">
            <Accordion>
              <div className="flex gap-1 text-sm text-black/70">
                <p>Crypto:</p>
                <p className="font-medium">ETH</p>
              </div>
            </Accordion>
          </div>
          <div className="py-2">
            <Accordion>
              <div className="flex gap-1 text-sm text-black/70">
                <p>Fiat:</p>
                <p className="font-medium">USD</p>
              </div>
            </Accordion>
          </div>
          <div className="py-2 px-4 flex flex-col gap-2">
            <p className="text-sm text-black/70">Track by:</p>
            <div className="flex gap-1">
              <Button  
                onClick={() => {
                  setTrack(0);
                }}
              >
                Collections
              </Button>
              <OutlineButton
                className="flex-grow"
                onClick={() => {
                  setTrack(1);
                }}
              >
                NFTs
              </OutlineButton>
            </div>
            <SearchInput placeholder="Collection name or id" />
            <div className="pb-2 flex flex-col gap-2">
              <div className="flex p-2 gap-2 border border-black/10 rounded-lg bg-black/10">
                <Image src={AvatarIcon} alt="avatar" width={40} height={40} />
                <div className="flex-grow relative text-xs">
                  <p className="text-black text-medium leading-5">Inkheads</p>
                  <p className="text-black/50 leading-5">204 Items</p>
                  <ICheckCircle
                    size="large"
                    className="absolute right-0.5 top-0.5"
                  />
                </div>
              </div>

              <div className="flex p-2 gap-2 border border-black/10 rounded-lg bg-black/10">
                <Image src={AvatarIcon} alt="avatar" width={40} height={40} />
                <div className="flex-grow relative text-xs">
                  <p className="text-black text-medium leading-5">Inkheads</p>
                  <p className="text-black/50 leading-5">204 Items</p>
                  <div className="absolute right-0.5 top-0.5">
                    <div className="border border-black/20 rounded-full w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-2 px-4 flex flex-col">
            <div className="p-1">
              <Button className="w-full">Download full report</Button>
            </div>
            <p className="text-black/50 text-xs">
              Data is from Loopring L2 Explorer, and CoinMarketCap values are
              used for calculations. DUTCH0x is not liable for any data errors.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};

export default AnalyticsContent;
