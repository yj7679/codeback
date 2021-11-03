import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './avatar-btn.module.css';
import useAuth from 'hooks/useAuth';
import { msg } from 'util/message';
import { SUCCESS_TO_LOGOUT } from 'common/string-template';

const AvatarBtn = () => {
  const auth = useAuth();
  const history = useHistory();

  const logout = () => {
    auth
      .logout()
      .then(() => {
        msg('Success', SUCCESS_TO_LOGOUT);
        history.push('/');
      })
      .catch((error) => msg('Error', error.message));
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button className={styles.menuBtn} type="text">
          회원정보
        </Button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Button className={styles.menuBtn} onClick={logout} type="text">
          로그아웃
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button className={styles.btn} shape="circle" icon={<UserOutlined />} />
    </Dropdown>
  );
};

export default AvatarBtn;
