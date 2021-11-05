import React from 'react';
import { Modal, Typography } from 'antd';
import { CssKeyObject } from 'types/common';
import { LoginForm } from 'components';

const { Title } = Typography;

const styles: CssKeyObject = {
  loginModal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  modalTitle: {
    marginTop: '.4em',
    fontFamily: 'titleFont',
    color: '#e05880'
  },
  btn: {
    width: '100%',
    marginBottom: '.3em'
  }
};

type LoginModalProps = {
  visible: boolean;
  setVisible: (isShow: boolean) => void;
};

const LoginModal = ({ visible, setVisible }: LoginModalProps) => {
  return (
    <Modal
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width={500}
      bodyStyle={styles.loginModal}
      footer={null}>
      <Title style={styles.modalTitle}>코드백</Title>
      <LoginForm setVisible={setVisible} />
    </Modal>
  );
};

export default LoginModal;
