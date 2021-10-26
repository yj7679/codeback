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
  signupForm: ReactNode;
};

const SignupTemplate = ({ signupForm }: Props) => <div style={styles.container}>{signupForm}</div>;

export default SignupTemplate;
