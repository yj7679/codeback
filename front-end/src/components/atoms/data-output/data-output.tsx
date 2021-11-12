import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './data-output.module.css';
import SocketClient from 'config/socket';
import useEditor from 'hooks/useEditor';
import { BoxLoading } from 'components';

const DataOutput = observer(() => {
  const editor = useEditor();

  useEffect(() => {
    SocketClient.io.on('compile', (message: any) => {
      editor.compileState = 'Done';
      editor.output = message.output;
    });

    SocketClient.io.on('compilePending', () => {
      editor.compileState = 'Pending';
    });
  }, [editor]);

  if (editor.compileState === 'Pending') {
    return <BoxLoading />;
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>출력 값</span>
      <textarea className={styles.textarea} value={editor.output} readOnly></textarea>
    </div>
  );
});

export default DataOutput;
