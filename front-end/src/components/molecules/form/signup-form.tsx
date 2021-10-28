import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { CssKeyObject } from 'types/common';
import inputValidator from 'util/input-validator';

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

type LoginValues = {
  email: string;
  password: string;
};

const SignupForm = () => {
  const [form] = Form.useForm();

  const [openEmailAuth, setOpenEmailAuth] = useState(false);

  const onFinish = (values: LoginValues) => {
    console.log(values);
  };

  const sendAuthCode = () => {
    if (form.getFieldError('email').length > 0) {
      return;
    }
    setOpenEmailAuth(true);
  };

  const checkAuthCode = () => {
    // 이메일 인증 코드 비교
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item>
        <Space>
          <Form.Item
            name="email"
            noStyle
            rules={[
              {
                validator: inputValidator.checkEmail
              }
            ]}>
            <Input placeholder="이메일" />
          </Form.Item>
          <Button onClick={sendAuthCode}>인증</Button>
        </Space>
      </Form.Item>

      <Form.Item>
        <Space>
          <Form.Item
            name="email-auth-code"
            noStyle
            rules={[
              {
                required: true,
                message: '인증 번호를 입력해주세요.'
              }
            ]}>
            <Input placeholder="인증 번호" disabled={!openEmailAuth} />
          </Form.Item>
          <Button onClick={checkAuthCode} disabled={!openEmailAuth}>
            확인
          </Button>
        </Space>
      </Form.Item>

      <Form.Item
        name="nickname"
        rules={[
          {
            validator: inputValidator.checkNickname
          }
        ]}>
        <Input placeholder="닉네임" />
      </Form.Item>

      <Form.Item name="password" rules={[{ validator: inputValidator.checkPassword }]}>
        <Input type="password" placeholder="비밀번호" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        rules={[
          { required: true, message: '비밀번호을 입력해주세요.' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
            }
          })
        ]}>
        <Input type="password" placeholder="비밀번호 확인" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" style={styles.btn}>
          회원가입
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
