import React from 'react';
import { Layout } from 'antd';
import { EditorMenu, LogoBtn } from 'components';
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

const StudyHeader = () => {
  return (
    <Header style={styles.header}>
      <LogoBtn />
      <EditorMenu />
    </Header>
  );
};

export default StudyHeader;
