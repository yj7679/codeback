import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import useAuth from 'hooks/useAuth';
import inputValidator from 'util/input-validator';
import { msg } from 'util/message';
import { LoginValues } from 'stores/auth/model/auth-model';
import styles from './login-form.module.css';
import { SUCCESS_TO_LOGIN } from 'common/string-template';

const LoginForm = ({ setVisible }: { setVisible: (isShow: boolean) => void }) => {
  const auth = useAuth();
  const history = useHistory();
  const [form] = Form.useForm();

  const login = (values: LoginValues) => {
    auth
      .login(values)
      .then(() => {
        setVisible(false);
        msg('Success', SUCCESS_TO_LOGIN);
        history.push('/');
      })
      .catch((error) => msg('Error', error.message));
    form.resetFields();
  };

  const goToSignUp = () => {
    setVisible(false);
    history.push('/signup');
  };

  return (
    <Form form={form} onFinish={login}>
      <Form.Item
        name="email"
        rules={[
          {
            validator: inputValidator.checkEmail
          }
        ]}>
        <Input type="email" placeholder="이메일" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력하세요.'
          }
        ]}>
        <Input type="password" placeholder="비밀번호" />
      </Form.Item>
      <Form.Item className={styles.btnGroup}>
        <Button className={styles.btn} type="primary" htmlType="submit">
          로그인
        </Button>
        <Button className={styles.btn} type="default" onClick={goToSignUp}>
          회원가입
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
