import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

// components
import {
  TabContainer,
  TabGroup,
  Tab,
  OutlineButton,
  IconButton,
  SearchInput,
  Button,
  Switch,
} from '@/common';
import { Guide, Breadcrumb } from '@/components/shared';
import SyncNFTs from '@/components/shared/nft-management/SyncNFTs';
import SortSelect from '@/common/Input/SortSelect';
import { SideFilter } from '@/components/shared/nft-management';
import NFTTabSwitch from './nft-tab-switch';
import { NFTModal } from '@/components/shared/nft-management/nft-modal';

// icons
import * as Icons from '@/common/Icons';

import * as DutchC from './styles';
import ShortcutContextMenu from '@/components/shared/shortcut-context-menu';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';

type WIDEFILTER = 'ALL' | 'LIST' | 'COLLECTION' | 'ARCHIVE' | 'BANK0X';

type WIDEFILTERTYPE = {
  label: string;
  slug: WIDEFILTER;
};

// const nftList = [
//   {
//     sr: '001',
//     name: 'Red Onion',
//     collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
//     availableCount: 29,
//     mintCount: 1000,
//     burned: false,
//     nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
//     selected: true,
//     img: '/images/rice.webp',
//   },
//   {
//     sr: '002',
//     name: 'Red Onion',
//     collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
//     availableCount: 29,
//     mintCount: 100,
//     burned: false,
//     nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b9',
//     selected: true,
//     img: '/images/rice.webp',
//   },
//   {
//     sr: '003',
//     name: 'Red Onion',
//     collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
//     availableCount: 29,
//     mintCount: 1000,
//     burned: false,
//     nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c010',
//     selected: true,
//     img: '/images/rice.webp',
//   },
//   {
//     sr: '004',
//     name: 'Red Onion',
//     collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
//     availableCount: 29,
//     mintCount: 10000,
//     burned: false,
//     nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c011',
//     selected: false,
//     img: '/images/rice.webp',
//   },
//   {
//     sr: '005',
//     name: 'Red Onion',
//     collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
//     availableCount: 29,
//     mintCount: 100,
//     burned: false,
//     nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c012',
//     selected: false,
//     img: '/images/rice.webp',
//   },
// ];

const wideFilters: WIDEFILTERTYPE[][] = [
  [
    {
      label: 'All(5)',
      slug: 'ALL',
    },
    {
      label: 'Lists(5)',
      slug: 'LIST',
    },
    {
      label: 'Collections(2)',
      slug: 'COLLECTION',
    },
    {
      label: 'Archives(2)',
      slug: 'ARCHIVE',
    },
  ],
  [
    {
      label: 'BANK0x(1)',
      slug: 'BANK0X',
    },
  ],
];

const NFTManagement: React.FC = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentWideFilter, setCurrentWideFilter] = useState<WIDEFILTER>('ALL');
  const [tableListSwtich, setTableListSwitch] = useState(0);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showCreateListModal, setShowCreatListModal] = useState(false);

  const { collectionNfts } = useAppSelector((state) => {
    const { collectionNfts } = state.dashboardPageReducer;
    return { collectionNfts };
  }, shallowEqual);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const toggleGuide = () => {
    setOpen((open) => !open);
  };

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <DutchC.NFTManagementWrapper>
      <DutchC.NFTManagementContentWrapper>
        <DutchC.NFTManagementContent>
          <Breadcrumb />

          <DutchC.NFTManagementContentBody>
            {/* Top Toolbar */}
            <DutchC.NFTManagementTopTool>
              {/* Wide Filter */}
              <TabContainer>
                {wideFilters.map((group, index) => (
                  <TabGroup key={index}>
                    {group.map((tab) => (
                      <Tab
                        key={tab.slug}
                        active={tab.slug === currentWideFilter}
                        onClick={(slug) => {
                          setCurrentWideFilter(slug);
                          setTableListSwitch(0);
                          setShowSyncModal(false);
                        }}
                        slug={tab.slug}
                      >
                        {tab.label}
                      </Tab>
                    ))}
                  </TabGroup>
                ))}
              </TabContainer>
              {/* Sync Action */}
              <OutlineButton leftIcon="arrow-down-on-square" color="black">
                Sync NFTs
              </OutlineButton>
            </DutchC.NFTManagementTopTool>
            {/* Sub Toolbar */}
            {/* left */}
            <DutchC.NFTManagementContentBodyInner>
              <SideFilter
                openFilter={openFilter}
                onFilter={() => {
                  setOpenFilter(false);
                }}
              />
              <DutchC.NFTManagementContentBodyInnerContainer>
                <DutchC.NFTManagementSubTool>
                  <DutchC.NFTManagementSubToolLeft>
                    <IconButton icon="funnel" rounded onClick={toggleFilter} />
                    <SearchInput placeholder="NFT name or id" />
                    <SortSelect />
                    {(currentWideFilter === 'ALL' ||
                      currentWideFilter === 'LIST') && (
                      <Switch
                        leftIcon="squares2X2"
                        rightIcon="bars3"
                        currentSwitch={tableListSwtich}
                        onSwitch={(status: number) => {
                          setTableListSwitch(status);
                        }}
                      />
                    )}
                  </DutchC.NFTManagementSubToolLeft>
                  <DutchC.NFTManagementSubToolRight>
                    {(currentWideFilter === 'ALL' ||
                      currentWideFilter === 'ARCHIVE') && (
                      <ShortcutContextMenu
                        position="BR"
                        options={[
                          'Find Holders',
                          'Show Sales',
                          'Move to Achieves',
                        ]}
                      />
                    )}

                    {(currentWideFilter === 'ALL' ||
                      currentWideFilter === 'LIST' ||
                      currentWideFilter === 'ARCHIVE') && (
                      <Button
                        className="bg-black/90 text-opacity-100 text-bold"
                        disabled={false}
                        leftIcon={
                          currentWideFilter === 'LIST' ? 'plus' : undefined
                        }
                        onClick={() => {
                          setShowCreatListModal(true);
                        }}
                      >
                        {currentWideFilter === 'ARCHIVE'
                          ? 'Recover'
                          : currentWideFilter === 'LIST'
                          ? 'Create a List'
                          : 'Add to List'}
                      </Button>
                    )}
                  </DutchC.NFTManagementSubToolRight>
                </DutchC.NFTManagementSubTool>

                {currentWideFilter === 'LIST' && (
                  <NFTModal
                    onClose={() => {
                      setShowCreatListModal(false);
                    }}
                    lists={collectionNfts}
                    currentTab={currentWideFilter}
                    showSyncModal={showCreateListModal}
                  />
                )}

                <NFTTabSwitch
                  currentTab={currentWideFilter}
                  tableListSwtich={tableListSwtich}
                  nftList={collectionNfts}
                  onShowListModal={() => {
                    setShowCreatListModal(true);
                  }}
                />

                <SyncNFTs
                  currentTab={currentWideFilter}
                  showSyncModal={showSyncModal}
                  setShowSyncModal={(flag) => {
                    setShowSyncModal(flag);
                  }}
                  nftList={collectionNfts}
                />
              </DutchC.NFTManagementContentBodyInnerContainer>
            </DutchC.NFTManagementContentBodyInner>

            {/* sync_nft_table */}
          </DutchC.NFTManagementContentBody>
        </DutchC.NFTManagementContent>
      </DutchC.NFTManagementContentWrapper>

      <DutchC.GuideInfoIconWrapper onClick={toggleGuide}>
        <Icons.IInformationCircle
          variant="solid"
          size="large"
          color={theme === 'light' ? 'black' : 'white'}
        />
      </DutchC.GuideInfoIconWrapper>

      <Guide open={open} />
    </DutchC.NFTManagementWrapper>
  );
};

export default NFTManagement;
