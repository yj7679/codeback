import React from 'react';
import { EditorMenu, LogoBtn } from 'components';
import styles from './study-header.module.css';

const StudyHeader = () => {
  return (
    <header className={styles.header}>
      <LogoBtn color="#b24592" />
      <EditorMenu />
    </header>
  );
};

export default StudyHeader;
