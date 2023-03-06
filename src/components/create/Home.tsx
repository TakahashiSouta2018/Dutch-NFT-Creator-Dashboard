import React, { useState } from 'react';

// components
import { Dropdown, Button } from '@/common';
import { Guide } from '@/components/shared';
import * as DutchC from './styles';
import Breadcrumb from './Breadcrumb';

const options = ['Option A', 'Option B', 'Option C'];

const CreateHome: React.FC = () => {
  const [collection, setCollection] = useState(options[0]);
  const onCollectionSelect = (value: string) => {
    setCollection(value);
  };

  return (
    <DutchC.CreateWrapper>
      <DutchC.CreateContentWrapper>
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
              <Button variant="solid">Create Collection</Button>
              <Button variant="solid">Draft NFT</Button>
              <Button variant="solid">Bulk NFT</Button>
            </DutchC.CreateContentHeaderActions>
          </DutchC.CreateContentHeader>

          <DutchC.CreateContentBody>
            {/* No items */}
            <span>No items to show here.</span>
          </DutchC.CreateContentBody>
        </DutchC.CreateContent>
      </DutchC.CreateContentWrapper>

      <Guide />
    </DutchC.CreateWrapper>
  );
};

export default CreateHome;
