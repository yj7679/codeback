import React, { ReactNode } from 'react';
import styles from './index.module.css';

type Props = {
  header: ReactNode;
  signupForm: ReactNode;
};

const SignupTemplate = ({ header, signupForm }: Props) => (
  <div>
    <div>{header}</div>
    <h1 className={styles.title}>회원 가입</h1>
    <div className={styles.container}>{signupForm}</div>
  </div>
);

export default SignupTemplate;
