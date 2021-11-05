import React, { useEffect } from 'react';
import SignupTemplate from './template';
import { LogoHeader, SignupForm } from 'components';
import useAuth from 'hooks/useAuth';
import { msg } from 'util/message';

const Signup = () => {
  const auth = useAuth();
  useEffect(() => {
    auth
      .getSignupStartCookie()
      .then()
      .catch((err) => msg('Error', err.message));
  }, [auth]);

  return <SignupTemplate header={<LogoHeader />} signupForm={<SignupForm />} />;
};

export default Signup;
