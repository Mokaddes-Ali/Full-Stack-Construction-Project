import React from 'react';
import Topbar from '../Components/Topbar';

const Profile = () => {
  return (
    <div>
      <Topbar onSearch={() => {}} />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Profile Page</h1>
        <p>Profile details and settings will be here.</p>
      </div>
    </div>
  );
};

export default Profile;
