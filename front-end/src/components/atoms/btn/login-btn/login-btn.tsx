import React from 'react';
import { Button } from 'antd';
import styles from './login-btn.module.css';

const LoginBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button className={styles.loginBtn} type="link" size="large" onClick={onClick}>
      로그인
    </Button>
  );
};

export default LoginBtn;
