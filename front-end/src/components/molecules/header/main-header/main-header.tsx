import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './main-header.module.css';
import { AvatarBtn, FeedbackBtn, FeedbackModal, LoginBtn, LoginModal, LogoBtn } from 'components';
import useAuth from 'hooks/useAuth';

const MainHeader = observer(() => {
  const [visible, setVisible] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const auth = useAuth();

  return (
    <header className={styles.header}>
      <LogoBtn />
      <FeedbackBtn onClick={() => setShowFeedbackModal(true)} style={{ marginRight: '3.5em' }} />
      {auth.authenticated ? <AvatarBtn /> : <LoginBtn onClick={() => setVisible(true)} />}
      <FeedbackModal visible={showFeedbackModal} setVisible={setShowFeedbackModal} />
      <LoginModal visible={visible} setVisible={setVisible} />
    </header>
  );
});

export default MainHeader;
