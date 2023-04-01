import React from 'react';
import { isMobile } from 'react-device-detect';

// components
import { AppLayout, DashboardSubNav, DashBoardHomeMobile } from '@/components';

export default function Dashboard() {
  if (isMobile) return <DashBoardHomeMobile />;
  return (
    <AppLayout>
      <DashboardSubNav />
    </AppLayout>
  );
}
