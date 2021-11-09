import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './nickname-form.module.css';
import inputValidator from 'util/input-validator';

const NicknameForm = ({ setNickname }: { setNickname: (nickname: string) => void }) => {
  const handleForm = ({ nickname: newNickname }: { nickname: string }) => {
    setNickname(newNickname);
  };

  return (
    <Form onFinish={handleForm}>
      <Form.Item
        name="nickname"
        rules={[
          {
            validator: inputValidator.checkNicknameForm
          }
        ]}>
        <Input placeholder="닉네임" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" className={styles.btn}>
          입장
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NicknameForm;
