import React, { ReactNode } from 'react';
import styles from './index.module.css';

type Props = {
  header: ReactNode;
  userInfoForm: ReactNode;
};

const UserInfoTemplate = ({ header, userInfoForm }: Props) => (
  <div>
    <div>{header}</div>
    <h1 className={styles.title}>회원 정보</h1>
    <div className={styles.container}>{userInfoForm}</div>
  </div>
);

export default UserInfoTemplate;
