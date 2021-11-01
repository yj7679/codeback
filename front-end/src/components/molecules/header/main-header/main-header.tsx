import React, { useState } from 'react';
import { LoginBtn, LoginModal, LogoBtn } from 'components';
import styles from './main-header.module.css';

const MainHeader = () => {
  const [visible, setVisible] = useState(false);

  return (
    <header className={styles.header}>
      <LogoBtn />
      <LoginBtn onClick={() => setVisible(true)} />
      <LoginModal visible={visible} setVisible={setVisible} />
    </header>
  );
};

export default MainHeader;
