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
} from '@/common';
import { Guide } from '@/components/shared';
import * as DutchC from './styles';

// icons
import * as Icons from '@/common/Icons';
import SortSelect from '@/common/Input/SortSelect';
import { SideFilter } from '@/components/shared/nft-management';
import { SyncNFTs } from './nft-management-all';
import { NFTModal } from '@/components/shared/nft-management/nft-modal';

type WIDEFILTER = 'ALL' | 'LIST' | 'COLLECTION' | 'ARCHIVE' | 'BANK0X';

type WIDEFILTERTYPE = {
  label: string;
  slug: WIDEFILTER;
};

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
  const [isSyncModal, setSyncModal] = useState(false);
  const [bgWhite, setBgWhite] = useState(false);

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
          <DutchC.NFTManagementContentHeader>
            <Icons.IHome variant="solid" size="medium" color="dark-gray" />
            <DutchC.NFTManagementDot />
            <DutchC.NFTManagementContentHeaderLabel>
              NFT Management
            </DutchC.NFTManagementContentHeaderLabel>
          </DutchC.NFTManagementContentHeader>

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
            <DutchC.NFTManagementSubTool>
              {/* left */}
              <DutchC.NFTManagementSubToolLeft>
                <SideFilter
                  openFilter={openFilter}
                  onFilter={() => {
                    setOpenFilter(false);
                  }}
                />
                <DutchC.FlexCol className="w-full gap-4">
                  <DutchC.FlexRow className="justify-between">
                    <DutchC.FlexRow className="gap-2 self-stretch">
                      <IconButton
                        icon="funnel"
                        rounded
                        onClick={toggleFilter}
                      />
                      <SearchInput placeholder="NFT name or id" />
                      <SortSelect />
                    </DutchC.FlexRow>
                    <DutchC.FlexRow className="gap-2">
                      <div
                        className="p-2 border border-black/90 rounded-lg cursor-pointer hover:bg-black hover:text-white"
                        onMouseEnter={() => {
                          setBgWhite(true);
                        }}
                        onMouseLeave={() => {
                          setBgWhite(false);
                        }}
                      >
                        <Icons.IEllipsisHorizontal
                          color={bgWhite ? 'white' : 'black'}
                        />
                      </div>
                      <Button className="bg-black/90">Add to List</Button>
                    </DutchC.FlexRow>
                  </DutchC.FlexRow>
                  <SyncNFTs
                    onSyncNFTTable={() => {
                      setSyncModal(true);
                    }}
                  />
                </DutchC.FlexCol>
              </DutchC.NFTManagementSubToolLeft>

              {/* sync_nft_table */}
              {isSyncModal && (
                <NFTModal
                  onSyncModal={() => {
                    setSyncModal(false);
                  }}
                  syncModal={isSyncModal}
                />
              )}
            </DutchC.NFTManagementSubTool>
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
