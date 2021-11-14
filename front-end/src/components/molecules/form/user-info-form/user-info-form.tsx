import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Form, Input, Button, Popconfirm } from 'antd';
import styles from './user-info-form.module.css';
import { SignupValues } from 'stores/auth/model/auth-model';
import useAuth from 'hooks/useAuth';
import { msg } from 'util/message';
import inputValidator from 'util/input-validator';
import { SUCCESSED_IN_DELETE_ACCOUNT, SUCCESSED_IN_UPDATE_ACCOUNT } from 'common/string-template';

const UserInfoForm = observer(() => {
  const auth = useAuth();
  const history = useHistory();
  const [form] = Form.useForm();

  const update = (values: SignupValues) => {
    auth
      .update(values)
      .then(() => {
        msg('Success', SUCCESSED_IN_UPDATE_ACCOUNT);
        history.push('/');
      })
      .catch((err) => msg('Error', err.message));
  };

  const deleteAccount = () => {
    auth
      .deleteAccount()
      .then(() => {
        msg('Success', SUCCESSED_IN_DELETE_ACCOUNT);
        history.push('/');
      })
      .catch((err) => msg('Error', err.message));
  };

  const confirm = () => {
    deleteAccount();
  };

  const cancel = () => {};

  return (
    <Form
      form={form}
      onFinish={update}
      initialValues={{ email: auth.info?.email, nickname: auth.info?.nickname }}
      style={{ width: '20em' }}>
      <Form.Item name="email">
        <Input type="email" readOnly />
      </Form.Item>

      <Form.Item
        name="nickname"
        rules={[
          {
            validator: inputValidator.checkNickname
          }
        ]}>
        <Input type="text" placeholder={auth.info?.nickname} />
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
        <Button htmlType="submit" type="primary" className={styles.updateBtn}>
          수정
        </Button>

        <Popconfirm
          title="정말 탈퇴하시겠습니까?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="예"
          cancelText="아니오">
          <Button type="primary" className={styles.withdrawlBtn}>
            탈퇴
          </Button>
        </Popconfirm>
      </Form.Item>
    </Form>
  );
});

export default UserInfoForm;
