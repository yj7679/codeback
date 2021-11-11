import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './data-input.module.css';
import useEditor from 'hooks/useEditor';

const DataInput = observer(() => {
  const editor = useEditor();

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    editor.input = e.target.value;
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>입력 값</span>
      <textarea className={styles.textarea} onChange={handleInput}></textarea>
    </div>
  );
});

export default DataInput;
