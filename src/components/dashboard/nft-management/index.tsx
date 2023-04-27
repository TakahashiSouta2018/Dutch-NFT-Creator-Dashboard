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
import {
  ShortcutContextMenu,
  ShortcutContextMenuItem,
} from '@/components/shared/shortcut-context-menu';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { ContentLayout } from '@/components/layout';
import { Tooltip } from '@/common/Tooltip';

type WIDEFILTER = 'ALL' | 'LIST' | 'COLLECTION' | 'ARCHIVE';

type WIDEFILTERTYPE = {
  label: string;
  slug: WIDEFILTER;
};

const nftList = [
  {
    sr: '001',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 1000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    selected: true,
    img: '/images/rice.webp',
  },
  {
    sr: '002',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 100,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b9',
    selected: true,
    img: '/images/rice.webp',
  },
  {
    sr: '003',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 1000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c010',
    selected: true,
    img: '/images/rice.webp',
  },
  {
    sr: '004',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 10000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c011',
    selected: false,
    img: '/images/rice.webp',
  },
  {
    sr: '005',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 100,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c012',
    selected: false,
    img: '/images/rice.webp',
  },
];

const wideFilters: WIDEFILTERTYPE[][] = [
  [
    {
      label: 'All (5)',
      slug: 'ALL',
    },
    {
      label: 'Lists (5)',
      slug: 'LIST',
    },
    {
      label: 'Collections (2)',
      slug: 'COLLECTION',
    },
    {
      label: 'Archives (2)',
      slug: 'ARCHIVE',
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
  const [isSynced, setIsSynced] = useState(false);
  const { isConnected } = useAppSelector((state) => state.webAppReducer);

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

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <ContentLayout>
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
                      setCurrentWideFilter(slug as WIDEFILTER);
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
          <Tooltip
            action={() => {
              setShowSyncModal(true);
            }}
          />
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
                {!openFilter && (
                  // <IconButton icon="funnel" rounded onClick={toggleFilter} />
                  <div
                    onClick={toggleFilter}
                    className="cursor-pointer p-2 border border-black/10 dark:border-white/10 rounded-lg"
                  >
                    <Icons.IFunnel
                      variant="outline"
                      color={theme === 'light' ? 'black' : 'white'}
                    />
                  </div>
                )}
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
                  currentWideFilter === 'ARCHIVE') &&
                  !isSynced && (
                    <ShortcutContextMenu position="BR">
                      <ShortcutContextMenuItem
                        text="Find Holders"
                        onClick={() => {
                          console.log('234567890');
                        }}
                      />
                      <ShortcutContextMenuItem
                        text="Show Sales"
                        onClick={() => {
                          console.log('234567890');
                        }}
                      />
                      <ShortcutContextMenuItem
                        text="Move to Achieves"
                        onClick={() => {
                          console.log('234567890');
                        }}
                      />
                    </ShortcutContextMenu>
                  )}

                {(currentWideFilter === 'ALL' ||
                  currentWideFilter === 'LIST' ||
                  currentWideFilter === 'ARCHIVE') && (
                  <Button
                    className=""
                    disabled={isSynced ? false : true}
                    leftIcon={currentWideFilter === 'LIST' ? 'plus' : undefined}
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
            {!isSynced && (
              <SyncNFTs
                currentTab={currentWideFilter}
                showSyncModal={showSyncModal}
                setShowSyncModal={(flag) => {
                  setShowSyncModal(flag);
                }}
                setIsSynced={() => {
                  setIsSynced(true);
                }}
                nftList={collectionNfts}
              />
            )}
          </DutchC.NFTManagementContentBodyInnerContainer>
        </DutchC.NFTManagementContentBodyInner>

        {/* sync_nft_table */}
      </DutchC.NFTManagementContentBody>
    </ContentLayout>
  );
};

export default NFTManagement;
