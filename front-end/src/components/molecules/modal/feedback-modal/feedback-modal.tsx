import React from 'react';
import { Modal, Typography } from 'antd';
import { CssKeyObject } from 'types/common';
import { FeedbackForm } from 'components';

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

type ModalProps = {
  visible: boolean;
  setVisible: (isShow: boolean) => void;
};

const FeedbackModal = ({ visible, setVisible }: ModalProps) => {
  return (
    <Modal
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width={500}
      bodyStyle={styles.loginModal}
      footer={null}>
      <Title style={styles.modalTitle}>서비스 이용 후기</Title>
      <FeedbackForm setVisible={setVisible} />
    </Modal>
  );
};

export default FeedbackModal;
