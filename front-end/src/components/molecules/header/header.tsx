import React, { useState } from 'react';
import { Layout } from 'antd';
import { LoginBtn, LoginModal, LogoBtn } from 'components';
import { CssKeyObject } from 'types/common';
import 'assets/css/color.css';

const { Header } = Layout;

const styles: CssKeyObject = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--header-background)',
    padding: '1em'
  }
};

const Headers = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Header style={styles.header}>
      <LogoBtn />
      <LoginBtn onClick={() => setVisible(true)} />
      <LoginModal visible={visible} setVisible={setVisible} />
    </Header>
  );
};

export default Headers;
