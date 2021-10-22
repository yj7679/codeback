import React from 'react';
import { CssKeyObject } from 'types/common';
import 'assets/css/color.css';

const styles: CssKeyObject = {
  container: {
    height: '90vh',
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
    <span style={styles.text}>페이지가 존재하지 않습니다!</span>
  </div>
);

export default NotFound;
