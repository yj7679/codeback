import React from 'react';
import styles from './data-input.module.css';

const DataInput = () => {
  return (
    <div className={styles.container}>
      <span style={{ position: 'absolute', margin: '1em 0 0 1em', color: '#cecece' }}>입력 값</span>
      <textarea className={styles.textarea}></textarea>
    </div>
  );
};

export default DataInput;
