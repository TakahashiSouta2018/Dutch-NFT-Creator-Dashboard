import React, { useEffect, useState } from 'react';

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
import { CreateNftManagementI } from '@/types';
import useNFTManagement, { NFTCountI } from '@/hooks/useNFTManagement';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';

enum TabNameEnum {
  ALL = 'ALL',
  LIST = 'LIST',
  COLLECTION = 'COLLECTION',
  ARCHIVE = 'ARCHIVE',
}

const tabItems = [
  [
    {
      slug: TabNameEnum.ALL,
      url: '/dashboard/nft-management',
    },
    {
      slug: TabNameEnum.LIST,
      url: '/dashboard/nft-management/list',
    },
    {
      slug: TabNameEnum.COLLECTION,
      url: '/dashboard/nft-management/collection',
    },
    {
      slug: TabNameEnum.ARCHIVE,
      url: '/dashboard/nft-management/archive',
    },
  ],
];

interface PropsI {
  tableListSwtich: number;
  setShowSyncModal?: (flag: boolean) => void;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
  setTableListSwtich: React.Dispatch<React.SetStateAction<number>>;
  setShowCreatListModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({
  setSearchText,
  setTableListSwtich,
  setShowCreatListModal,
  setShowSyncModal,
  tableListSwtich,
}: PropsI) => {
  const { getUserNftCount } = useNFTManagement();

  const { theme } = useTheme();
  const { pathname } = useRouter();

  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [nftCount, setNftCount] = useState<NFTCountI | null>(null);

  const { account } = useAppSelector((state) => {
    const { account } = state.webAppReducer;
    return { account };
  }, shallowEqual);

  const isActive = (url: string) => pathname === url;

  const isAll = pathname === tabItems[0][0].url;
  const isList = pathname === tabItems[0][1].url;
  const isCollection = pathname === tabItems[0][2].url;
  const isArchive = pathname === tabItems[0][3].url;

  const isUrlListOrAll = isList || isAll;
  const isUrlArchiveOrAll = isArchive || isAll;

  useEffect(() => {
    (async () => {
      const data = await getUserNftCount(account);
      if (data) {
        setNftCount(data);
      }
    })();
  }, [account]);

  const getLabel = (label: TabNameEnum) => {
    if (label === TabNameEnum.ALL) {
      return `All(${nftCount?.all})`;
    } else if (label === TabNameEnum.ARCHIVE) {
      return `Archives(${nftCount?.archive})`;
    } else if (label === TabNameEnum.COLLECTION) {
      return `Collections(${nftCount?.collection})`;
    } else {
      return `Lists(${nftCount?.list})`;
    }
  };

  const searchPlaceHolder = () => {
    if (isList) return 'List name';
    else if (isCollection) return 'Collection name';
    else return 'NFT name or id';
  };

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
                          slug={tab.slug}
                        >
                          {getLabel(tab.slug)}
                        </Tab>
                      </Link>
                    ))}
                  </TabGroup>
                ))}
              </TabContainer>

              {isAll && (
                <OutlineButton
                  leftIcon="arrow-down-on-square"
                  color="black"
                  onClick={(e) => setShowSyncModal?.(true)}
                >
                  Sync NFTs
                </OutlineButton>
              )}
            </div>

            <div className="flex space-x-2 items-start w-full">
              <SideFilter
                openFilter={showFilterModal}
                onFilter={() => setShowFilterModal((prevState) => !prevState)}
              />

              <div className="flex flex-col w-full gap-4">
                <div className="flex justify-between py-4">
                  <div className="flex gap-2 self-stretch items-center">
                    {!showFilterModal && isAll && (
                      <IconButton
                        icon="funnel"
                        rounded
                        onClick={() => setShowFilterModal(true)}
                      />
                    )}

                    <SearchInput
                      onChange={(e) => setSearchText?.(e.target.value)}
                      placeholder={searchPlaceHolder()}
                    />
                    <SortSelect />

                    {isUrlListOrAll && (
                      <Switch
                        leftIcon="squares2X2"
                        rightIcon="bars3"
                        currentSwitch={tableListSwtich}
                        onSwitch={setTableListSwtich}
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

                    {isArchive && (
                      <Button
                        className="bg-black/90 text-opacity-100 text-bold"
                        disabled={false}
                        leftIcon={undefined}
                        onClick={() => {
                          // setShowCreatListModal(true);
                        }}
                      >
                        Recover
                      </Button>
                    )}

                    {isAll && (
                      <Button
                        className="bg-black/90 text-opacity-100 text-bold"
                        disabled={false}
                        leftIcon={undefined}
                        onClick={() => {
                          // setShowCreatListModal(true);
                        }}
                      >
                        Add to List
                      </Button>
                    )}

                    {isList && (
                      <Button
                        className="bg-black/90 text-opacity-100 text-bold"
                        disabled={false}
                        leftIcon={'plus'}
                        onClick={() => {
                          setShowCreatListModal?.(true);
                        }}
                      >
                        Create a List
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
