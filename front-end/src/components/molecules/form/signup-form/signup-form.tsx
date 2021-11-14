import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Space } from 'antd';
import styles from './signup-form.module.css';
import { SignupValues } from 'stores/auth/model/auth-model';
import useAuth from 'hooks/useAuth';
import { msg } from 'util/message';
import inputValidator from 'util/input-validator';
import { MANDATORY_EMAIL, SUCCESSED_IN_SIGNUP } from 'common/string-template';

const SignupForm = () => {
  const auth = useAuth();
  const history = useHistory();
  const [form] = Form.useForm();
  const [openSendEmailBtn, setOpenSendEmailBtn] = useState(true);
  const [openEmailAuth, setOpenEmailAuth] = useState(false);

  const signup = (values: SignupValues) => {
    auth
      .signup(values)
      .then(() => {
        msg('Success', SUCCESSED_IN_SIGNUP);
        history.push('/');
      })
      .catch((err) => msg('Error', err.message));
  };

  const sendAuthCode = () => {
    if (form.getFieldValue('email') == null) {
      msg('Error', MANDATORY_EMAIL);
      return;
    }

    if (form.getFieldError('email').length > 0) {
      return;
    }

    auth
      .sendAuthCode(form.getFieldValue('email'))
      .then(() => {
        setOpenEmailAuth(true);
        setOpenSendEmailBtn(false);
      })
      .catch((err) => msg('Error', err.message));
  };

  const confirmAuthCode = () => {
    auth
      .confirmAuthCode(form.getFieldValue('email'), form.getFieldValue('email-auth-code'))
      .then(() => {
        setOpenEmailAuth(false);
      })
      .catch((err) => msg('Error', err.message));
  };

  return (
    <Form form={form} onFinish={signup}>
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
            <Input type="email" placeholder="이메일" disabled={!openSendEmailBtn} />
          </Form.Item>
          <Button onClick={sendAuthCode} disabled={!openSendEmailBtn}>
            인증
          </Button>
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
          <Button onClick={confirmAuthCode} disabled={!openEmailAuth}>
            {openEmailAuth ? '완료' : '확인'}
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
        <Button htmlType="submit" type="primary" className={styles.btn}>
          회원가입
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
