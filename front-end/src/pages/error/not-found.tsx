import React from 'react';
import { CssKeyObject } from 'types/common';
import 'assets/css/color.css';
import { MainHeader } from 'components';

const styles: CssKeyObject = {
  container: {
    height: '100vh',
    lineHeight: '90vh',
    textAlign: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontFamily: 'titleFont',
    fontSize: '2em',
    color: 'var(--error-title)'
  }
};

const NotFound = () => (
  <div style={styles.container}>
    <MainHeader />
    <span style={styles.text}>페이지가 존재하지 않습니다!</span>
  </div>
);

export default NotFound;
