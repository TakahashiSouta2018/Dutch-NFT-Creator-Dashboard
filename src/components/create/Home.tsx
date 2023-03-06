import React from 'react';

// components
import { Guide } from '@/components/shared';
import * as DutchC from './styles';
import Breadcrumb from './Breadcrumb';

const CreateHome: React.FC = () => {
  return (
    <DutchC.CreateWrapper>
      <DutchC.CreateContentWrapper>
        <DutchC.CreateContent>
          <Breadcrumb />
        </DutchC.CreateContent>
      </DutchC.CreateContentWrapper>

      <Guide />
    </DutchC.CreateWrapper>
  );
};

export default CreateHome;
