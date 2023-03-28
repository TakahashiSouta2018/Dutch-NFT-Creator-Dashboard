import { NextPage } from 'next';
import { AppLayout } from '@/components';
import ProfileHome from '@/components/profile';

const Profile: NextPage = (): JSX.Element => {
  return (
    <AppLayout>
      <ProfileHome />;
    </AppLayout>
  );
};

export default Profile;
