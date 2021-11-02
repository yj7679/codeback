import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './logo-btn.module.css';

const LogoBtn = ({ color }: { color?: string }) => {
  const history = useHistory();
  const goToMain = () => {
    history.push('/');
  };

  return (
    <Button
      className={styles.logoBtn}
      style={color ? { color: color } : {}}
      type="link"
      size="large"
      onClick={goToMain}>
      코드백
    </Button>
  );
};

export default LogoBtn;
