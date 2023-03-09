import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

// components
import { Dropdown, Button } from '@/common';
import { Guide } from '@/components/shared';
import * as DutchC from './styles';
import Breadcrumb from './Breadcrumb';

// icons
import * as Icons from '@/common/Icons';

const options = ['Option A', 'Option B', 'Option C'];

const CreateHome: React.FC = () => {
  const { theme } = useTheme();
  const [collection, setCollection] = useState(options[0]);
  const [open, setOpen] = useState(true);

  const onCollectionSelect = (value: string) => {
    setCollection(value);
  };

  const toggleGuide = () => {
    setOpen((open) => !open);
  };

  return (
    <DutchC.CreateWrapper>
      <DutchC.CreateContentWrapper open={open ? 1 : 0}>
        <DutchC.CreateContent>
          <Breadcrumb />
          <DutchC.CreateContentHeader>
            <DutchC.CreateContentLeft>
              <DutchC.CreateContentTitle>
                Drafted NFTs
              </DutchC.CreateContentTitle>
              <DutchC.CreateContentSubTitle>
                NFTs that you have uploaded in DUTCH0x but not minted yet will
                show here.
              </DutchC.CreateContentSubTitle>
              <DutchC.CreateContentCollection>
                <Dropdown
                  value={collection}
                  onSelect={onCollectionSelect}
                  options={options}
                  position="TL"
                  label="Collection"
                />
              </DutchC.CreateContentCollection>
            </DutchC.CreateContentLeft>

            <DutchC.CreateContentHeaderActions>
              <Button>
                <Link href="/create/create-collection">Create Collection</Link>
              </Button>
              <Button>
                <Link href="/create/draft-nft">Draft NFT</Link>
              </Button>
              <Button>
                <Link href="/create/bulk-mint">Bulk NFT</Link>
              </Button>
            </DutchC.CreateContentHeaderActions>
          </DutchC.CreateContentHeader>

          <DutchC.CreateContentBody>
            {/* No items */}
            <span className="dark:text-white/50">No items to show here.</span>
          </DutchC.CreateContentBody>
        </DutchC.CreateContent>
      </DutchC.CreateContentWrapper>

      {/* toggle guide */}
      <DutchC.GuideInfoIconWrapper onClick={toggleGuide}>
        <Icons.IInformationCircle
          variant="solid"
          size="large"
          color={theme === 'light' ? 'black' : 'white'}
        />
      </DutchC.GuideInfoIconWrapper>
      <Guide open={open} />
    </DutchC.CreateWrapper>
  );
};

export default CreateHome;
