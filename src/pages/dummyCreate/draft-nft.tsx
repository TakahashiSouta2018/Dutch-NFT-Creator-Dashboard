import React from 'react';

// components
import DraftNFTPage from '@/components/create/DraftNFTPage';
import { AppLayout } from '@/components/layout';

export default function CreateCollection() {
  return (
    <AppLayout>
      <DraftNFTPage />
    </AppLayout>
  );
}
