import React from 'react';
import { Button } from 'antd';

const LoginBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button type="link" onClick={onClick}>
      로그인
    </Button>
  );
};

export default LoginBtn;
