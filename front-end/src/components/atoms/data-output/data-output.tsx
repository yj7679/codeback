import React from 'react';
import styles from './data-output.module.css';

const DataOutput = () => {
  return (
    <div className={styles.container}>
      <span style={{ position: 'absolute', margin: '1em 0 0 1em', color: '#cecece' }}>출력 값</span>
      <textarea className={styles.textarea} readOnly></textarea>
    </div>
  );
};

export default DataOutput;
