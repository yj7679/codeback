import React from 'react';
import styles from './logo-header.module.css';
import { LogoBtn } from 'components';

const LogoHeader = () => {
  return (
    <header className={styles.header}>
      <LogoBtn color="#e05880" />
    </header>
  );
};

export default LogoHeader;
