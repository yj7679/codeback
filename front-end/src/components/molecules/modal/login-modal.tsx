import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Typography, Form, Input, Button } from 'antd';
import { CssKeyObject } from 'types/common';

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
    color: '#1890FF'
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

type LoginValues = {
  email: string;
  password: string;
};

const LoginModal = ({ visible, setVisible }: LoginModalProps) => {
  const history = useHistory();

  const onFinish = (values: LoginValues) => {
    console.log(values);
  };

  const goToSignUp = () => {
    setVisible(false);
    history.push('/signup');
  };

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
      <Form name="validate_other" onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true, message: '이메일을 입력해주세요.' }]}>
          <Input type="email" placeholder="이메일" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '비밀번호을 입력해주세요.' }]}>
          <Input type="password" placeholder="비밀번호" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={styles.btn}>
            로그인
          </Button>
          <Button type="default" onClick={goToSignUp} style={styles.btn}>
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
