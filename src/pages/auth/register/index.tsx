import RegisterHome from '@/components/auth/register';
import { AppLayout, CreateBulkMintHome } from '@/components';

export default function Register() {
  return (
    <AppLayout>
      <RegisterHome isOpen={false} />
    </AppLayout>
  );
}
