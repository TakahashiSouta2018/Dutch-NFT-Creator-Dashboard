import React from 'react';

// components
import { AppLayout } from '@/components/layout';
import BulkMintPage from '@/components/create/BulkMintPage';

export default function CreateCollection() {
  return (
    <AppLayout>
      <BulkMintPage />
    </AppLayout>
  );
}
