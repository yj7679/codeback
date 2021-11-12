import React, { useEffect, useState } from 'react';
import { EditorMenu, LogoBtn } from 'components';
import styles from './study-header.module.css';
import SocketClient from 'config/socket';

const StudyHeader = () => {
  const [roomDeleted, setRoomDeleted] = useState(false);
  useEffect(() => {
    if (SocketClient.io == null) return;
    SocketClient.io.on('roomDeleted', () => {
      setRoomDeleted(true);
    });
  }, []);

  return (
    <>
      <header className={styles.header}>
        <LogoBtn color="#b24592" />
        {roomDeleted && (
          <span className={styles.msg}>호스트가 나가 더 이상 이용할 수 없는 방입니다.</span>
        )}
        <EditorMenu />
      </header>
      <div className={styles.divider}></div>
    </>
  );
};

export default StudyHeader;
