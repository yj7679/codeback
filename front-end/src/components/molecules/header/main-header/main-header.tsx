import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './main-header.module.css';
import { AvatarBtn, LoginBtn, LoginModal, LogoBtn } from 'components';
import useAuth from 'hooks/useAuth';

const MainHeader = observer(() => {
  const [visible, setVisible] = useState(false);
  const auth = useAuth();

  return (
    <header className={styles.header}>
      <LogoBtn />
      {auth.authenticated ? <AvatarBtn /> : <LoginBtn onClick={() => setVisible(true)} />}
      <LoginModal visible={visible} setVisible={setVisible} />
    </header>
  );
});

export default MainHeader;
