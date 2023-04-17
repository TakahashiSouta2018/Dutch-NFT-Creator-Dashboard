import React from 'react';

// components
import CreateCollectionPage from '@/components/create/CreateCollectionPage';
import { AppLayout } from '@/components/layout';

export default function CreateCollection() {
  return (
    <AppLayout>
      <CreateCollectionPage />
    </AppLayout>
  );
}
