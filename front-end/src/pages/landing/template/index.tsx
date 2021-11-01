import React, { ReactNode } from 'react';
import styles from './index.module.css';

type Props = {
  header: ReactNode;
  logoTitle: ReactNode;
  createStudyBtn: ReactNode;
};

const LandingTemplate = ({ header, logoTitle, createStudyBtn }: Props) => (
  <>
    {header}
    <div className={styles.container}>
      <div className={styles.logoTitleContainer}>{logoTitle}</div>
      <div>{createStudyBtn}</div>
    </div>
  </>
);

export default LandingTemplate;
