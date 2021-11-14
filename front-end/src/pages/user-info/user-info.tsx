import React from 'react';
import { LogoHeader, UserInfoForm } from 'components';
import UserInfoTemplate from './template';

const UserInfo = () => {
  return <UserInfoTemplate header={<LogoHeader />} userInfoForm={<UserInfoForm />} />;
};

export default UserInfo;
