import React from 'react';
import { Spin } from 'antd';
import { CssKeyObject } from 'types/common';

const styles: CssKeyObject = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.2)'
  }
};

const PageLoading = () => (
  <div style={styles.container}>
    <Spin size="large" />
  </div>
);

export default PageLoading;
