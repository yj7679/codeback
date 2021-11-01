import React from 'react';
import styles from './logo-title.module.css';

const LogoTitle = () => {
  return (
    <svg className={styles.logoTitleSvg} height="80" width="585">
      <text className={styles.ab} x="0" y="79%">
        &lt;
      </text>
      <text x="50" y="85%">
        C
      </text>
      <text x="105" y="85%">
        O
      </text>
      <text x="160" y="85%">
        D
      </text>
      <text x="215" y="85%">
        E
      </text>
      <text x="270" y="85%">
        B
      </text>
      <text x="325" y="85%">
        A
      </text>
      <text x="380" y="85%">
        C
      </text>
      <text x="435" y="85%">
        K
      </text>
      <text x="500" y="85%">
        &#47;
      </text>
      <text className={styles.ab} x="530" y="79%">
        &gt;
      </text>
    </svg>
  );
};

export default LogoTitle;
