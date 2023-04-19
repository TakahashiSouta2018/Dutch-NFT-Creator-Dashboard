import React, { useEffect, useState } from 'react';
import { Button, Select, SearchInput, Accordion } from '@/common';

import { Unit } from './unit';
import { OptionSwitch } from '../option-switch';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { TrackListI, TrackListTypeEnum, setTrackList } from '../../ducks';
import { LoopringService } from '@/lib/LoopringService';

import * as DutchC from './styles';

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

interface AnalyticsSideBarProps {
  currentTracking: number;
  onCurrentTracking: (currentValue: string) => void;
}

const AnalyticsSideBar: React.FC<AnalyticsSideBarProps> = ({
  currentTracking,
  onCurrentTracking,
}) => {
  const { isConnected } = useAppSelector((state) => state.webAppReducer);

  const [trackBy, setTrackBy] = useState({
    id: 0,
    slug: 'Collections',
  });
  const [currentCrypto, setCurrentCrypto] = useState('0');
  const [currentFiat, setCurrentFiat] = useState('0');

  const loopringService = new LoopringService();
  const dispatch = useAppDispatch();

  const { accountInfo, userCollection } = useAppSelector((state) => {
    const { accountInfo, userCollection } = state.webAppReducer;
    return { accountInfo, userCollection };
  }, shallowEqual);

  const { trackList } = useAppSelector((state) => {
    const { trackList } = state.dashboardPageReducer;
    return { trackList };
  }, shallowEqual);

  useEffect(() => {
    (async () => {
      try {
        if (!accountInfo) return;

        let list: TrackListI[] = [];
        if (trackBy.id === 0) {
          list = userCollection.map((item: any, i: number) => {
            const isSelected = i === 0;
            return {
              id: item.collectionAddress,
              type: TrackListTypeEnum.COLLECTION,
              avatar: item.avatar,
              title: item.name,
              content: item.description,
              isSelected: isSelected,
            };
          });
        } else {
          const collectionAddresses = userCollection.map(
            (item: any) => item.collectionAddress
          );
          const nftsInfo = await loopringService.getUserNFTCollection({
            accountInfo,
            tokensAddress: collectionAddresses,
            offset: 0,
            limit: 50,
          });

          if (nftsInfo && nftsInfo.nfts && nftsInfo.nfts.length > 0) {
            list = nftsInfo.nfts.map((item, i) => {
              const isSelected = i === 0;
              return {
                id: item.nftId,
                type: TrackListTypeEnum.NFT,
                avatar: item.metadata.image,
                title: item.metadata.name,
                content: '',
                isSelected: isSelected,
              };
            });
          }
        }
        dispatch(setTrackList(list));
      } catch (error) {}
    })();
  }, [trackBy]);

  const handleTrackingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCurrentTracking(e.target.value);
  };

  const handleSelected = (id: number) => {
    dispatch(
      setTrackList(
        trackList.map((item: any, i: number) => {
          if (i === id)
            return {
              ...item,
              isSelected: !item.isSelected,
            };
          else return item;
        })
      )
    );
  };

  const handleOnTrackChange = (option: any) => {
    dispatch(setTrackList([]));
    setTrackBy(option);
  };

  return (
    <DutchC.SideBarWrapper>
      <DutchC.SideBarBg />
      <DutchC.SideBarMain>
        <DutchC.SideBarHeader>
          <DutchC.SideBarHeaderText>Analytics</DutchC.SideBarHeaderText>
          <Select
            className="border-none w-full flex-grow"
            options={[
              { key: '0', value: 'NFT Tracking' },
              { key: '1', value: 'Wallet Tracking' },
            ]}
            onChange={handleTrackingChange}
          />
        </DutchC.SideBarHeader>
        <DutchC.SideBarBody>
          <DutchC.CurrencySelect>
            <Select
              className="border-none w-full flex-grow"
              options={[
                { key: '0', value: 'Crypto: ETH' },
                { key: '1', value: 'Crypto: LRC' },
                { key: '2', value: 'Crypto: USDC' },
              ]}
              onChange={(e) => {
                setCurrentCrypto(e.target.value);
              }}
            />
          </DutchC.CurrencySelect>
          <DutchC.CurrencySelect>
            <Select
              className="border-none w-full flex-grow"
              options={[
                { key: '0', value: 'Fiat: USD' },
                { key: '1', value: 'Fiat: EURO' },
              ]}
              onChange={(e) => {
                setCurrentFiat(e.target.value);
              }}
            />
          </DutchC.CurrencySelect>
          <DutchC.TrackWrapper>
            <p className="text-sm text-black/70 dark:text-white/70">
              Track by:
            </p>
            {!currentTracking && (
              <div className="border border-black/10 dark:border-white/10 rounded-lg bg-black/5 dark:bg-white/5">
                <DutchC.TrackSwitchWrapper>
                  {options.map((option, i) => (
                    <OptionSwitch
                      key={i}
                      currentOption={trackBy}
                      option={option}
                      onCurrentOption={(option) => {
                        setTrackBy(option);
                      }}
                    />
                  ))}
                </DutchC.TrackSwitchWrapper>
              </div>
            )}
            <SearchInput
              placeholder={
                currentTracking
                  ? 'Wallet address or ENS'
                  : 'Collection name or id'
              }
            />
            <DutchC.TrackListWrapper>
              {!!trackList &&
                trackList.map((item: TrackListI, i: number) => (
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
            <p className="text-black/50 text-xs dark:text-white/50">
              Data is from Loopring L2 Explorer, and CoinMarketCap values are
              used for calculations. DUTCH0x is not liable for any data errors.
            </p>
          </DutchC.DownloadFullReport>
        </DutchC.SideBarBody>
      </DutchC.SideBarMain>
    </DutchC.SideBarWrapper>
  );
};

export default AnalyticsSideBar;
