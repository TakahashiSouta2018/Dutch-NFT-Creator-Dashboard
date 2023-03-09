import React, { useState } from 'react';
import { useTheme } from 'next-themes';

// components
import { MediaUpload, TextInput, TextArea, Button, Dropdown } from '@/common';
import { Guide } from '@/components/shared';
import * as DutchC from './styles';
import Breadcrumb from '../Breadcrumb';

// icons
import * as Icons from '@/common/Icons';

const CreateBulkMintHome: React.FC = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(true);

  const toggleGuide = () => {
    setOpen((open) => !open);
  };

  return (
    <DutchC.CreateWrapper>
      <DutchC.CreateBulkMintWrapper open={open ? 1 : 0}>
        <DutchC.CreateBulkMintContent>
          <Breadcrumb />

          <DutchC.CreateBulkMintContentBody>
            <DutchC.CreateBulkMintHeader>Bulk Mint</DutchC.CreateBulkMintHeader>

            {/* Collection Selector */}
            <DutchC.CreateBulkMintCollectionSelectWrapper>
              <Dropdown
                label="Collection"
                value="🍎🍌🍍The Fruit Salad Game🍆🥦🥕"
                options={['🍎🍌🍍The Fruit Salad Game🍆🥦🥕']}
                position="BL"
                onSelect={() => {}}
              />
            </DutchC.CreateBulkMintCollectionSelectWrapper>
          </DutchC.CreateBulkMintContentBody>
        </DutchC.CreateBulkMintContent>
      </DutchC.CreateBulkMintWrapper>

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

export default CreateBulkMintHome;
