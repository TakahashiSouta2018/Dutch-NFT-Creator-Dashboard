import MobileDashboardPage from '@/components/dashboardPage/dashboard/MobileDashboardPage';
import DesktopDashboardPage from '@/components/dashboardPage/dashboard/DesktopDashboardPage';
import { isMobile } from 'react-device-detect';

export default function Dashboard() {
  if (isMobile) return <MobileDashboardPage />;
  else return <DesktopDashboardPage />;
}
