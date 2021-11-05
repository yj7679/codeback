import React from 'react';
import { Spin } from 'antd';
import styles from './page-loading.module.css';

const PageLoading = () => (
  <div className={styles.container}>
    <Spin size="large" />
  </div>
);

export default PageLoading;
