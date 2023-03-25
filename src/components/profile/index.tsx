import React from 'react';
import { Breadcrumb } from '../shared';
import ProfileContent from './ProfileContent';

const ProfileHome: React.FC = (): JSX.Element => {
  return (
    <div className="relative flex flex-col px-6  mt-16 overflow-x-hidden">
      <Breadcrumb />
      <ProfileContent />
    </div>
  );
};

export default ProfileHome;
