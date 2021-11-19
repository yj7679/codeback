import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './main-header.module.css';
import { AvatarBtn, FeedbackModal, LoginBtn, LoginModal, LogoBtn } from 'components';
import useAuth from 'hooks/useAuth';
import { Button } from 'antd';

const MainHeader = observer(() => {
  const [visible, setVisible] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const auth = useAuth();

  return (
    <header className={styles.header}>
      <LogoBtn />
      <Button
        onClick={() => setShowFeedbackModal(true)}
        style={{ backgroundColor: 'transparent', color: 'whitesmoke', marginRight: '3.5em' }}>
        한 줌의 관심
      </Button>
      {auth.authenticated ? <AvatarBtn /> : <LoginBtn onClick={() => setVisible(true)} />}
      <FeedbackModal visible={showFeedbackModal} setVisible={setShowFeedbackModal} />
      <LoginModal visible={visible} setVisible={setVisible} />
    </header>
  );
});

export default MainHeader;
