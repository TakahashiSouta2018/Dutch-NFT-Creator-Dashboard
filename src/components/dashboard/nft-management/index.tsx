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
} from '@/common';
import { Guide } from '@/components/shared';
import * as DutchC from './styles';

// icons
import * as Icons from '@/common/Icons';
import SortSelect from '@/common/Input/SortSelect';

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
  const [mounted, setMounted] = useState(false);
  const [currentWideFilter, setCurrentWideFilter] = useState<WIDEFILTER>('ALL');
  const [isSync, setSync] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const toggleGuide = () => {
    setOpen((open) => !open);
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
                <IconButton icon="funnel" rounded />
                <SearchInput placeholder="NFT name or id" />
                <SortSelect />
              </DutchC.NFTManagementSubToolLeft>

              {/* right */}
              <DutchC.NFTManagementSubToolRight></DutchC.NFTManagementSubToolRight>
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
