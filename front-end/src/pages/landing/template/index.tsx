import React, { ReactNode } from 'react';
import { CssKeyObject } from 'types/common';

const styles: CssKeyObject = {
  container: {
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

type Props = {
  header: ReactNode;
  createStudyBtn: ReactNode;
};

const LandingTemplate = ({ header, createStudyBtn }: Props) => (
  <>
    {header}
    <div style={styles.container}>{createStudyBtn}</div>
  </>
);

export default LandingTemplate;
