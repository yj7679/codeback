import React from 'react';
import { Layout } from 'antd';
import { LoginBtn, LogoBtn } from 'components';
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
  return (
    <Header style={styles.header}>
      <LogoBtn />
      <LoginBtn />
    </Header>
  );
};

export default Headers;
