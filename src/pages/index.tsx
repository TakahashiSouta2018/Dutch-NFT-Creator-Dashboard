import MobileDashboardPage from '@/components/dashboard/dashboardPage/MobileDashboardPage';
import DesktopDashboardPage from '@/components/dashboard/dashboardPage/DesktopDashboardPage';
import { isMobile } from 'react-device-detect';

export default function Dashboard() {
  if (isMobile) return <MobileDashboardPage />;
  else return <DesktopDashboardPage />;
}
