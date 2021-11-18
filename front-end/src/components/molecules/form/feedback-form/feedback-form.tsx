import React from 'react';
import { Form, Button } from 'antd';
import styles from './feedback-form.module.css';
import { mainAxios } from 'config/axios';
import { config } from 'config/config';
import { msg } from 'util/message';

const FeedbackForm = ({ setVisible }: { setVisible: (isShow: boolean) => void }) => {
  const handleForm = ({ feedback }: { feedback: string }) => {
    mainAxios
      .post(`${config.api}/feedback`, { content: feedback })
      .then(() => setVisible(false))
      .catch(() => msg('Error', '다시 시도해주세요 ㅠㅠ'));
  };

  return (
    <Form onFinish={handleForm}>
      <Form.Item
        name="feedback"
        rules={[
          {
            required: true,
            message: '최소 8글자이상 적어주세요...!'
          }
        ]}>
        <textarea
          style={{ height: '200px', width: '350px', border: '1px solid darkgrey', outline: 'none' }}
          placeholder="(__) 감사합니다."></textarea>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" className={styles.btn}>
          제출
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FeedbackForm;
