import React from 'react';

// components
import { AppLayout, DashboardSubNav, NFTManagement } from '@/components';

export default function DashboardNFTManagement() {
  return (
    <AppLayout>
      <DashboardSubNav />
      <NFTManagement />
    </AppLayout>
  );
}
