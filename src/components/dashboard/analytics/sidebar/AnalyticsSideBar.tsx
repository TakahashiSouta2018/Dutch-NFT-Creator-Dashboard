import React, { useState } from 'react';
import { Accordion } from '@/common/Accordion';
import { Button } from '@/common';
import { SearchInput } from '@/common';

import * as DutchC from './styles';
import { Unit } from './unit';
import { OptionSwitch } from '../option-switch';

const mockCollections = [
  {
    avatar: '/images/avatar.png',
    title: 'Inkheads',
    content: '204 Items',
    isSelected: true,
  },
  {
    avatar: '/images/avatar.png',
    title: 'Inkheads',
    content: '204 Items',
    isSelected: false,
  },
  {
    avatar: '/images/avatar.png',
    title: 'Inkheads',
    content: '204 Items',
    isSelected: false,
  },
  {
    avatar: '/images/avatar.png',
    title: 'Inkheads',
    content: '204 Items',
    isSelected: false,
  },
  {
    avatar: '/images/avatar.png',
    title: 'Inkheads',
    content: '204 Items',
    isSelected: false,
  },
  {
    avatar: '/images/avatar.png',
    title: 'Inkheads',
    content: '204 Items',
    isSelected: false,
  },
];

const mockNFTs = [
  {
    avatar: '/images/rice.webp',
    title: 'WAGMI Wolves Club Bodies #056',
    content: 'Wagmi Wolves Club Bodies',
    isSelected: true,
  },
  {
    avatar: '/images/rice.webp',
    title: 'WAGMI Wolves Club Bodies #056',
    content: 'Wagmi Wolves Club Bodies',
    isSelected: false,
  },
  {
    avatar: '/images/rice.webp',
    title: 'WAGMI Wolves Club Bodies #056',
    content: 'Wagmi Wolves Club Bodies',
    isSelected: false,
  },
  {
    avatar: '/images/rice.webp',
    title: 'WAGMI Wolves Club Bodies #056',
    content: 'Wagmi Wolves Club Bodies',
    isSelected: false,
  },
  {
    avatar: '/images/rice.webp',
    title: 'WAGMI Wolves Club Bodies #056',
    content: 'Wagmi Wolves Club Bodies',
    isSelected: false,
  },
  {
    avatar: '/images/rice.webp',
    title: 'WAGMI Wolves Club Bodies #056',
    content: 'Wagmi Wolves Club Bodies',
    isSelected: false,
  },
];

const options = [
  {
    id: 0,
    slug: 'Collections',
  },
  {
    id: 1,
    slug: 'NFTs',
  },
];

const AnalyticsSideBar = () => {
  const [currentTrack, setCurrentTrack] = useState(0);

  const [trackList, setTrackList] = useState([
    ...(currentTrack ? mockNFTs : mockCollections),
  ]);

  const handleSelected = (id: number) => {
    setTrackList(
      trackList.map((item, i) => {
        if (i === id)
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        else return item;
      })
    );
  };

  return (
    <DutchC.SideBarWrapper>
      <div className="w-full bg-transparent h-full" />
      <div className="fixed left-6 w-[265px]">
        <DutchC.SideBarHeader>
          <DutchC.SideBarHeaderText>Analytics</DutchC.SideBarHeaderText>
          <DutchC.SideBarHeaderDropdown>
            <Accordion>NFT Tracking</Accordion>
          </DutchC.SideBarHeaderDropdown>
        </DutchC.SideBarHeader>
        <DutchC.SideBarBody>
          <DutchC.CurrencySelect>
            <Accordion>
              <div className="flex gap-1 text-sm text-black/70">
                <p>Crypto:</p>
                <p className="font-medium">ETH</p>
              </div>
            </Accordion>
          </DutchC.CurrencySelect>
          <DutchC.CurrencySelect>
            <Accordion>
              <div className="flex gap-1 text-sm text-black/70">
                <p>Fiat:</p>
                <p className="font-medium">USD</p>
              </div>
            </Accordion>
          </DutchC.CurrencySelect>
          <DutchC.TrackWrapper>
            <p className="text-sm text-black/70">Track by:</p>
            <DutchC.TrackSwitchWrapper>
              {options.map((option, i) => (
                <OptionSwitch
                  key={i}
                  currentOptionId={currentTrack}
                  option={option}
                  onCurrentOption={(id) => {
                    setCurrentTrack(id);
                  }}
                />
              ))}
            </DutchC.TrackSwitchWrapper>
            <SearchInput placeholder="Collection name or id" />
            <DutchC.TrackListWrapper>
              {!!trackList &&
                trackList.map((item, i) => (
                  <Unit
                    key={i}
                    id={i}
                    avatar={item.avatar}
                    title={item.title}
                    content={item.content}
                    isSelected={item.isSelected}
                    onSelected={handleSelected}
                  />
                ))}
            </DutchC.TrackListWrapper>
          </DutchC.TrackWrapper>
          <DutchC.DownloadFullReport>
            <div className="p-1">
              <Button className="w-full">Download full report</Button>
            </div>
            <p className="text-black/50 text-xs">
              Data is from Loopring L2 Explorer, and CoinMarketCap values are
              used for calculations. DUTCH0x is not liable for any data errors.
            </p>
          </DutchC.DownloadFullReport>
        </DutchC.SideBarBody>
      </div>
    </DutchC.SideBarWrapper>
  );
};

export default AnalyticsSideBar;
