import React from 'react';
import { Button } from 'antd';
import styles from './feedback-btn.module.css';

const FeedbackBtn = ({ onClick, style }: { onClick: () => void; style?: React.CSSProperties }) => (
  <Button className={styles.btn} onClick={onClick} style={{ ...style }}>
    한 줌의 관심
  </Button>
);

export default FeedbackBtn;
