import React from 'react';

// components
import { Breadcrumb, Guide } from '@/components/shared';
import {
  Button,
  IconButton,
  OutlineButton,
  SearchInput,
  Switch,
  Tab,
  TabContainer,
  TabGroup,
} from '@/common';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SortSelect from '@/common/Input/SortSelect';
import {
  ShortcutContextMenu,
  ShortcutContextMenuItem,
} from '@/components/shared/shortcut-context-menu';
import { useTheme } from 'next-themes';
import * as Icons from '@/common/Icons';
import SideFilter from './SideFilter';

enum TabNameEnum {
  ALL = 'ALL',
  LIST = 'LIST',
  COLLECTION = 'COLLECTION',
  ARCHIVE = 'ARCHIVE',
}

const tabItems = [
  [
    {
      label: 'All(5)',
      slug: TabNameEnum.ALL,
      url: '/dummy/nft-management',
    },
    {
      label: 'Lists(5)',
      slug: TabNameEnum.LIST,
      url: '/dummy/nft-management/list',
    },
    {
      label: 'Collections(2)',
      slug: TabNameEnum.COLLECTION,
      url: '/dummy/nft-management/collection',
    },
    {
      label: 'Archives(2)',
      slug: TabNameEnum.ARCHIVE,
      url: '/dummy/nft-management/archive',
    },
  ],
];

const Header = () => {
  const { theme } = useTheme();
  const { pathname } = useRouter();

  const isActive = (url: string) => pathname === url;

  const isAll = pathname === tabItems[0][0].url;
  const isList = pathname === tabItems[0][1].url;
  const isArchive = pathname === tabItems[0][3].url;

  const isUrlListOrAll = isList || isAll;
  const isUrlArchiveOrAll = isArchive || isAll;
  const isUrlArchiveOrAllOrList = isArchive || isAll || isList;

  return (
    <div className="relative flex px-6 overflow-hidden">
      <div className="flex flex-col w-full grow">
        <div className="flex flex-col w-full">
          <Breadcrumb />

          <div className="flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
              <TabContainer>
                {tabItems.map((item, index) => (
                  <TabGroup key={index}>
                    {item.map((tab, index) => (
                      <Link key={index} href={tab.url}>
                        <Tab
                          key={tab.slug}
                          active={isActive(tab.url)}
                          // onClick={(slug) => {
                          //   setCurrentWideFilter(slug as WIDEFILTER);
                          //   setTableListSwitch(0);
                          //   setShowSyncModal(false);
                          // }}
                          slug={tab.slug}
                        >
                          {tab.label}
                        </Tab>
                      </Link>
                    ))}
                  </TabGroup>
                ))}
              </TabContainer>

              <OutlineButton leftIcon="arrow-down-on-square" color="black">
                Sync NFTs
              </OutlineButton>
            </div>

            <div className="flex space-x-2 items-start w-full">
              <SideFilter openFilter={true} onFilter={() => {}} />

              <div className="flex flex-col w-full gap-4">
                <div className="flex justify-between py-4">
                  <div className="flex gap-2 self-stretch items-center">
                    {false && (
                      <IconButton
                        icon="funnel"
                        rounded
                        onClick={() => console.log('he')}
                      />
                    )}

                    <SearchInput placeholder="NFT name or id" />
                    <SortSelect />

                    {isUrlListOrAll && (
                      <Switch
                        leftIcon="squares2X2"
                        rightIcon="bars3"
                        currentSwitch={0}
                        onSwitch={(status: number) => {
                          // setTableListSwitch(status);
                        }}
                      />
                    )}
                  </div>

                  <div className="flex gap-2 items-center">
                    {isUrlArchiveOrAll && (
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

                    {isUrlArchiveOrAllOrList && (
                      <Button
                        className="bg-black/90 text-opacity-100 text-bold"
                        disabled={false}
                        leftIcon={isList ? 'plus' : undefined}
                        onClick={() => {
                          // setShowCreatListModal(true);
                        }}
                      >
                        {isArchive
                          ? 'Recover'
                          : isList
                          ? 'Create a List'
                          : 'Add to List'}
                      </Button>
                    )}
                  </div>
                </div>

                {/* {currentWideFilter === 'LIST' && (
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
                  {!isConnected && (
                    <SyncNFTs
                      currentTab={currentWideFilter}
                      showSyncModal={showSyncModal}
                      setShowSyncModal={(flag) => {
                        setShowSyncModal(flag);
                      }}
                      nftList={collectionNfts}
                    />
                  )} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute right-6 top-4 "
        // onClick={toggleGuide}
      >
        <Icons.IInformationCircle
          variant="solid"
          size="large"
          color={theme === 'light' ? 'black' : 'white'}
        />
      </div>

      <Guide open={false} />
    </div>
  );
};

export default Header;
