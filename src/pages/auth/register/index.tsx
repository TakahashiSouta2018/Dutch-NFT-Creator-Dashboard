import RegisterHome from '@/components/auth/register';
import { AppLayout } from '@/components';

export default function Register() {
  return (
    <AppLayout>
      <RegisterHome isRegister={false} />
    </AppLayout>
  );
}
