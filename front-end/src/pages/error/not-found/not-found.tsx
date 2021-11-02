import React from 'react';
import styles from './not-found.module.css';

import { MainHeader } from 'components';

const NotFound = () => (
  <div className={styles.container}>
    <MainHeader />
    <span className={styles.title}>페이지가 존재하지 않습니다!</span>
  </div>
);

export default NotFound;
