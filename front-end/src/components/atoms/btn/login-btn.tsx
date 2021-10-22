import React from 'react';
import { Button } from 'antd';

const LoginBtn = () => {
  const login = () => {
    console.log('login');
  };

  return (
    <Button type="link" onClick={login}>
      로그인
    </Button>
  );
};

export default LoginBtn;
