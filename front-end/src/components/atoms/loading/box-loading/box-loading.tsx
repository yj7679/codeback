import React from 'react';
import { Spin } from 'antd';
import styles from './box-loading.module.css';

const BoxLoading = () => (
  <div className={styles.container}>
    <Spin size="large" />
  </div>
);

export default BoxLoading;
