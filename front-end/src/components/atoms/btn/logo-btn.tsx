import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { CssKeyObject } from 'types/common';

const styles: CssKeyObject = {
  logoBtn: {
    fontFamily: 'logoFont',
    fontSize: '1.2rem'
  }
};

const LogoBtn = () => {
  const history = useHistory();
  const goToMain = () => {
    history.push('/');
  };

  return (
    <Button type="link" size="large" onClick={goToMain} style={styles.logoBtn}>
      코드백
    </Button>
  );
};

export default LogoBtn;
