import MobileDashboardPage from '@/components/dashboardPage/MobileDashboardPage';
import DesktopDashboardPage from '@/components/dashboardPage/DesktopDashboardPage';
import { isMobile } from 'react-device-detect';

export default function Dashboard() {
  if (isMobile) return <MobileDashboardPage />;
  else return <DesktopDashboardPage />;
}
